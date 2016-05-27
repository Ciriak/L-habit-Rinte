function genMaze(width,height){
  var generating = true;
  var x = 0;
  var y = 0;
  var cellIndex = 0;
  var to = 0;
  var cells = [];
  var visitHistory = [];
  for (var h = 0; h < height; h++) {
    for (var w = 0; w < width; w++) {
      var c = {
        down:false,
        right:false,
        visited:false,
        x : w+1,
        y : h+1
      };
      cells.push(c);
    }
  }

  //the first cell is connected


  while (generating) {
    visitHistory.push(cellIndex);
    cells[cellIndex].visited = true;

    console.log("Current cell : "+cellIndex);

    // find the visited neightborhood
    var unVisitedBro = findUnvisitedBro(cells,cellIndex);

    if(unVisitedBro.length == 0){
      //all bro are visited, return to prec cell
      cellIndex = visitHistory[visitHistory.indexOf(cellIndex)-1];

      //stop the process if last row
      if(visitHistory.indexOf(cellIndex) == 0){
        console.log("All cases has been visited, done !");
        console.log(visitHistory);
        generating = false;
      }

      console.log("Go back to "+cellIndex);
    }
    //if no 'brother'  unvisited, select a random unvisited bro and set it as the current cell
    else{

      var nextBro = unVisitedBro[Math.floor(Math.random() * unVisitedBro.length)];
      if(nextBro.side == "down" || nextBro.side == "right"){
        cells[cellIndex][nextBro.side] = true;  //define the open side
      }
      if(nextBro.side == "left"){
        cells[nextBro.index].right = true;
        cells[nextBro.index].visited = true;
      }

      if(nextBro.side == "top"){
        cells[nextBro.index].down = true;
        cells[nextBro.index].visited = true;
      }

      cellIndex = nextBro.index;


    }
  }

  for (var i = 0; i < cells.length; i++) {
    delete cells[i].x;
    delete cells[i].y;
    delete cells[i].visited;
  }

  var r = {
    width : width,
    height : height,
    cells : cells,
    history: visitHistory
  };
  return r;
}

function findUnvisitedBro(cells,cellIndex){
  var unVisitedBro = [];
  var currentCell = cells[cellIndex];

  //top bro
  var r = _.findIndex(cells, { 'x': currentCell.x, 'y': currentCell.y-1, 'visited':false });
  if(r > -1){
    var bro = {
      index : r,
      side : "top"
    }
    unVisitedBro.push(bro);
  }

  //right bro
  var r = _.findIndex(cells, { 'x': currentCell.x+1, 'y': currentCell.y, 'visited':false });
  if(r > -1){
    var bro = {
      index : r,
      side : "right"
    }
    unVisitedBro.push(bro);
  }

  //bottom bro
  var r = _.findIndex(cells, { 'x': currentCell.x, 'y': currentCell.y+1, 'visited':false });
  if(r > -1){
    var bro = {
      index : r,
      side : "down"
    }
    unVisitedBro.push(bro);
  }

  //left bro
  var r = _.findIndex(cells, { 'x': currentCell.x-1, 'y': currentCell.y, 'visited':false });
  if(r > -1){
    var bro = {
      index : r,
      side : "left"
    }
    unVisitedBro.push(bro);
  }

  return unVisitedBro;
}


function findVisitableBro(cells,cellIndex){

  var availableBro = [];

  var currentCell = cells[cellIndex];

  //if we can go right AND the right bro is not visited , right is available
  if(currentCell.right){
    var rightBro = _.findIndex(cells, { 'x': currentCell.x+1, 'y': currentCell.y, 'visited':false });
    if(rightBro > -1){
      console.log(cellIndex+" can go right");
      availableBro.push(rightBro);
    }
  }

  //if we can go down AND the down bro is not visited , down is available
  if(currentCell.down){
    var downBro = _.findIndex(cells, { 'x': currentCell.x, 'y': currentCell.y+1, 'visited':false });
    if(downBro > -1){
      console.log(cellIndex+" can go down");
      availableBro.push(downBro);
    }
  }

  //we check the top bro, if he can go down... so the current cell can go up
  var upBro = _.findIndex(cells, { 'x': currentCell.x, 'y': currentCell.y-1, 'visited':false });
  if(upBro > -1){
    if(cells[upBro].down){
      console.log(cellIndex+" can go up");
      availableBro.push(upBro);
    }
  }

  //we check the left bro, if he can go right... so the current cell can go left
  var leftBro = _.findIndex(cells, { 'x': currentCell.x-1, 'y': currentCell.y, 'visited':false });
  if(leftBro > -1){
    if(cells[leftBro].right){
      console.log(cellIndex+" can go left");
      availableBro.push(leftBro);
    }
  }

  return availableBro;

}

function writeMaze(maze){
  console.log("Generating ...");
  console.log(maze);
  var table = $("#maze").find("table").html("");
  var cCount = 0;
  for (var h = 0; h < maze.height; h++) {
    table.append("<tr></tr>");
    for (var w = 0; w < maze.width; w++) {
      table.find("tr:last").append("<td class='maze-cell' id='maze-cell-"+cCount+"'></td>");
      var cellIndex = $("#maze-cell-"+cCount);
      //cellIndex.html(cCount);
      if(maze.cells[cCount].right){
        cellIndex.addClass("right");
      }
      if(maze.cells[cCount].down){
        cellIndex.addClass("down");
      }
      if(maze.cells[cCount].connected){
        cellIndex.addClass("connected");
      }
      if(maze.cells[cCount].visited){
        cellIndex.addClass("visited");
      }
      if(cCount == 0){
        cellIndex.addClass("start");
      }
      if(cCount == maze.cells.length-1){
        cellIndex.addClass("end");
      }

      cCount++;
    }
  }

  if(maze.history){
    //console.log(maze.history);
    for (var i = 0; i < maze.history.length; i++) {
      animateCase(maze.history[i],i);
    }
  }


}

function writeMazePath(path){
  $(".maze-cell").removeClass("path");
  for (var i = 0; i < path.length; i++) {
    $("#maze-cell-"+path[i]).addClass("path");

  }
}

var to = [];
function animateCase(value,index) {
  toc = to.length;
  to[toc] = setTimeout(function() {
    $("#maze-cell-"+value).addClass("visited");
    $("#maze-cell-"+value).addClass("light");
  }, 10*(index+1));
}

function clearAllTimeOut(){
  for (var i = 0; i < to.length; i++) {
    clearTimeout(to[i]);
  }
  $(".maze-cell").removeClass("visited");
}

function solveMaze(maze){
  var solving = true;
  var cellIndex = 0;
  var to = 0;
  var visitHistory = [];

  var tempCells = [];
  var finalCell = maze.cells.length-1;

  for (var h = 0; h < maze.height; h++) {
    for (var w = 0; w < maze.width; w++) {
      var c = {
        x : w+1,
        y : h+1
      };
      tempCells.push(c);
    }
  }

  for (var i = 0; i < maze.cells.length; i++) {
    maze.cells[i].visited = false;
    maze.cells[i].x = tempCells[i].x;
    maze.cells[i].y = tempCells[i].y;
  }


  while (solving) {

    if(cellIndex == finalCell){
      console.log("Success");
      solving = false;
      console.log(visitHistory);
      return visitHistory;
    }

    console.log("Current cell : "+cellIndex);
    visitHistory.push(cellIndex);
    maze.cells[cellIndex].visited = true;

    // find the connected (and unvisited) neightborhood
    var visitableBro = findVisitableBro(maze.cells,cellIndex);
    if(visitableBro.length == 0){
      //all bro are visited, return to prec cell

      console.log("Go back to "+cellIndex);
      var io = visitHistory.indexOf(cellIndex);
      cellIndex = visitHistory[io-1];

      // remove the bad path (everything after the last good cell)
      for (var i = 0; i < visitHistory.length; i++) {
        var t = visitHistory.indexOf(visitHistory[i]);
        if(t >= io){
          //maze.cells[visitHistory[t]].visited = false;
          delete visitHistory[t];
        }

      }

      //stop the process if last row
      if(visitHistory.indexOf(cellIndex) == 0){
        console.log("This maze IS FUCKING IMPOSSIBLE !");
        console.log(visitHistory);
        solving = false;
        return false;
      }
    }
    //Select the next cell, must be a bro, unvisited AND available
    else{

      var nextBro = visitableBro[Math.floor(Math.random() * visitableBro.length)];
      console.log("Next cell : "+nextBro);
      cellIndex = nextBro;
    }
  }
}

$("#generateMazeButton").click(function(e){
  var t = $("#mazePattern").val();
  if(t == ""){
    var dim = parseInt($("#mazeDim").val());
    var maze = genMaze(dim,dim);
    writeMaze(maze);
    $("#mazePattern").val(JSON.stringify(maze));
  }
  else{
    clearAllTimeOut();
    writeMaze(JSON.parse(t));
  }

});

$("#newMazeButton").click(function(){
  var dim = parseInt($("#mazeDim").val());
  var maze = genMaze(dim,dim);
  $("#mazePattern").val(JSON.stringify(maze));
  writeMaze(maze);
});

$("#resolveMazeButton").click(function(e){
  var t = $("#mazePattern").val();
  if(t == ""){
    return false;
  }
  else{
    var s = solveMaze(JSON.parse(t));
    if(s){
      clearAllTimeOut();
      writeMazePath(s);
    }
    else{
      alert("Nope");
    }
  }

});

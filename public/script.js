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
        generating = false;
      }

      console.log("Go back to "+cellIndex);

      if(cellIndex <= -1){
        console.log("All cases has been visited, done !");
        console.log(visitHistory);
        generating = false;
      }
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
      cellIndex.html(cCount);
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
    for (var i = 0; i < maze.history.length; i++) {
      animateCase(maze.history[i]);
    }
  }


}

function animateCase(index) {
  setTimeout(function() {
    $("#maze-cell-"+index).addClass("light");
  }, 100*(index+1));
}

function solveMaze(maze){

}

$("#generateMazeButton").click(function(e){
  var maze = genMaze(20,20);
  var t = $("#mazePattern").val();
  if(t == ""){
    writeMaze(maze);
    $("#mazePattern").val(JSON.stringify(maze));
  }
  else{
    writeMaze(JSON.parse(t));
  }

});

function genMaze(width,height){
  var x = 0;
  var y = 0;
  var caseIndex = 0;
  var cases = [];
  for (var h = 0; h < height; h++) {
    for (var w = 0; w < width; w++) {
      var c = {
        down:false,
        right:false,
        connected:false,
        x : w+1,
        y : h+1
      };
      cases.push(c);
    }
  }

  for (var i = 0; i < cases.length; i++) {
    var broConnect = false;
    // check if ONE of the neighboohood is connected
    if(cases[i].x != width){  //if not last case

      if(cases[i+1].connected){
        broConnect = true;
      }

      if(cases[i].y != height && !broConnect){
        //find the coord of the bottom bro
      }
    }

    //gen random border
    var t = Math.floor(Math.random() * 2) + 1;
    if(t == 1){
      cases[i].down = true;
    }
    var t = Math.floor(Math.random() * 2) + 1;
    if(t == 1){
      cases[i].right = true;
    }
  }

  var r = {
    width : width,
    height : height,
    cases : cases
  };
  return r;
}

function writeMaze(maze){
  console.log("Generating ...");
  console.log(maze);
  var table = $("#maze").find("table");
  var cCount = 0;
  for (var h = 0; h < maze.height; h++) {
    table.append("<tr></tr>");
    for (var w = 0; w < maze.width; w++) {
      table.find("tr:last").append("<td class='maze-case' id='maze-case-"+cCount+"'></td>");
      var currentCase = $("#maze-case-"+cCount);
      if(maze.cases[cCount].right){
        currentCase.addClass("right");
      }
      if(maze.cases[cCount].down){
        currentCase.addClass("down");
      }

      cCount++;
    }
  }

}

writeMaze(genMaze(10,10));

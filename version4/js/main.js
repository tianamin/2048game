
var storage= new LocalStorageManager();

var game=new Grid(4);


EventUtil.addHandler(window,"load",function(e){
 
    console.log(storage.getGameOver());

     if (storage.getGameOver()) {

        game.newGame();
        myScore.updateScore(0);

     }else{
        console.log("continue");

        console.log(storage.getScore());
  
        myScore.updateScore(storage.getScore());

        game.board=storage.getGameState();  
        console.log(game.board);  
        game.updateBoardView();
     }

     myScore.updateBestScore(storage.getBestScore());

})

EventUtil.addHandler(window,"beforeunload",function(e){
     if (!game.isGameOver()) {

         storage.setGameState(game.board);
         storage.setScore(myScore.score);
         storage.setGameOver(false);

     }else{
        storage.setGameOver(true);
     }
});
EventUtil.addHandler(document,"keydown",function(event){
    switch (event.keyCode) {
        case 37://left
            if(game.moveLeft()){               
                setTimeout(game.generateOneNumber.bind(game),210);
                setTimeout("game.isGameOver()",300);
               
            }
            break;
        case 38://up
            if(game.moveUp()){
                setTimeout(game.generateOneNumber.bind(game),210);
                setTimeout("game.isGameOver()",300);               
            }
            break;
        case 39://right
            if(game.moveRight()){
                setTimeout(game.generateOneNumber.bind(game),210);
                setTimeout("game.isGameOver()",300);
               
            }
            break;
        case 40://down

            if(game.moveDown()){
                setTimeout(game.generateOneNumber.bind(game),210);
                setTimeout("game.isGameOver()",300);
               
            }
            break;

    }
});
EventUtil.addHandler(document.getElementById('newgamebtn'),"click",function(event){
         
      game.newGame();
      var ele= document.getElementById('game-message');
      ele.style.display="none";

      myScore.updateScore(0)
});






var board = new Array();
var score = 0;


var scoreEle=document.getElementById('score');
var bestScoreEle=document.getElementById('best-score');

var addScoreEle=document.getElementById('score-addition');
// var scoreContainer=document.getElementById('score-container');

var storage= new LocalStorageManager();


EventUtil.addHandler(window,"load",function(e){

     console.log(storage.getGameOver());

     if (storage.getGameOver()) {

        newgame();
        console.log("new");

     }else{
        console.log("continue");

        newgame();
        score= storage.getScore();
        scoreEle.innerHTML   =score; 

        board=storage.getGameState();    
        updateBoardView();
     }

     bestScoreEle.innerHTML=storage.getBestScore();
})

EventUtil.addHandler(window,"beforeunload",function(e){
     if (!isgameover()) {

         storage.setGameState(board);
         storage.setScore(score);

         storage.setGameOver(false);

         // console.log(storage.setScore);
     }else{
        storage.setGameOver(true);
     }
});
EventUtil.addHandler(document,"keydown",function(event){
    switch (event.keyCode) {
        case 37://left
            if(moveLeft()){
                //setTimeout("generateOneNumber()",210);
                setTimeout(generateOneNumber,210);
                 setTimeout(isgameover,300);
               
            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
                //generateOneNumber();//每次新增一个数字就可能出现游戏结束
                // isgameover();
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
                //generateOneNumber();//每次新增一个数字就可能出现游戏结束
                // isgameover();
            }
            break;
        case 40://down

            if(moveDown()){
                setTimeout(generateOneNumber,210);
                setTimeout(isgameover,300);
                //generateOneNumber();//每次新增一个数字就可能出现游戏结束
                // isgameover();
            }
            break;

    }
})


// function addScore(score){

//   var addEle=document.createElement("div");

//     addEle.id="score-addition";
//     addEle.innerHTML="+"+score;
//     scoreContainer.appendChild(addEle);
   
// }




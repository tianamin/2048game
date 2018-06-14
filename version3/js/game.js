function newgame(){
    //初始化棋盘格
    init();
    //在随机两个各自声称的数字
    generateOneNumber();
    // generateOneNumber();

    var ele= document.getElementById('game-message');
    ele.style.display="none";

}

function init(){
    
    for(var i = 0; i<4;i++){
        board[i] = new Array();
        for(var j = 0;j<4;j++){
            board[i][j] = 0;
        }
    }

    score=0;
    updateScore(score);  
    updateBoardView();//通知前端对board二位数组进行设定。

}


function isgameover(){

     if(nospace(board)&&nomove(board))
     {
         gameover();
         return true;
     }else{
        return false;
     }

}
 
function gameover(){
    alert("gameover");

    var ele= document.getElementById('game-message');
    ele.style.display="block";

    updateBestScore(score);

      
}
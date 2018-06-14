var board = new Array();
var score = 0;
var top = 240;

var scoreEle=document.getElementById('score');
var bestScoreEle=document.getElementById('best-score');
var addScoreEle=document.getElementById('score-addition');
// var scoreContainer=document.getElementById('score-container');

var storage= new LocalStorageManager();


$(document).ready(function(e){

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

    

      // newgame();
      
     // score= storage.getScore();
     // scoreEle.innerHTML   =score; 
      
     //     board=storage.getGameState();  
     //     console.log(board);  
     //    updateBoardView();
        
    
});


window.onbeforeunload=function () {
    

     if (!isgameover()) {

         storage.setGameState(board);
         storage.setScore(score);

         storage.setGameOver(false);

         // console.log(storage.setScore);
     }else{
        storage.setGameOver(true);
     }

}


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
    for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));            //绝对定位
            gridCell.css("left",getPosLeft(i,j));
        }
    }
    
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

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //NumberCell覆盖
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//返回背景色
                theNumberCell.css('color',getNumberColor(board[i][j]));//返回前景色
                theNumberCell.text(board[i][j]);
            }
        }
    }

}
function updateBestScore(score){
   
    bestScore=bestScoreEle.innerHTML;
    console.log(bestScore);

    if (score>bestScore) {
        bestScore=score;
        // localStorage.setItem("best-score",bestScore);
        storage.setBestScore(bestScore);
    }

    console.log(storage.setBestScore(bestScore));

}
function updateScore(score){
    scoreEle.innerHTML=score;
    console.log(score);
}

function generateOneNumber(){
    if (nospace(board)) 
        return false;
    
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (board[randx][randy] == 0) 
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字
    // var randNumber = Math.random()<0.5 ?2 : 4;
     var randNumber = 2;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

//事件响应循环
$(document).keydown(function(event){
    switch (event.keyCode) {
    case 37://left
        if(moveLeft()){
            //setTimeout("generateOneNumber()",210);
            setTimeout(generateOneNumber,210);
             setTimeout(isgameover,300);

            // generateOneNumber();//每次新增一个数字就可能出现游戏结束          
            // isgameover();//300毫秒
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
});

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


function moveLeft(){//更多地细节信息
    //判断格子是否能够向左移动
    if( !canMoveLeft(board))
        return false;
    
    //真正的moveLeft函数//标准
    for(var i = 0;i<4;i++)
        for(var j = 1;j<4;j++){//第一列的数字不可能向左移动
            if(board[i][j] !=0){
                //(i,j)左侧的元素
                for(var k = 0;k<j;k++){                   
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i , k, j, board)){
                        //move
                       
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                       
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score+=board[i][k];                      
                        updateScore(score); 

                        break;                       
                      
                    }
                }
            }
        }
    // setTimeout("updateBoardView()",200);
     setTimeout(updateBoardView,200);
    return true;
}
function moveRight(){//更多地细节信息
    //判断格子是否能够向右移动
    if( !canMoveRight(board))
        return false;
    
    //真正的moveLeft函数//标准
    for(var i = 0;i<4;i++)
        for(var j = 2; j>=0;j-- ){ //第四列的数字不可能向右移动
            if(board[i][j] !=0){
                //(i,j)右侧的元素
                for(var k = 3;k>j;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);               
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                     
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);                      
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score+=board[i][k];                    
                        updateScore(score); 
                                             
                       break;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveUp(){//更多地细节信息
    //判断格子是否能够向上移动

    if( !canMoveUp(board))
        return false;    

    //真正的moveLeft函数//标准
    for (var j = 0; j < 4; j++) {
       for (var i = 1; i < 4; i++) {
           if (board[i][j]!=0) {
            for (var k = 0; k < i; k++) {
                if (board[k][j]==0 && noBlockVertical(j,k,i,board)) {

                    showMoveAnimation(i, j,k,j);
                    board[k][j]=board[i][j];
                    board[i][j]=0;
                    break;

                }else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board)){
                   
                    showMoveAnimation(i, j,k,j);

                    board[k][j]+=board[i][j];
                    board[i][j]=0;

                    score+=board[k][j];  
                    updateScore(score);            
                   
                    break;
                }
            }
           }
       }
    }

    setTimeout(updateBoardView,200);
    return true;
   
}
function moveDown(){//更多地细节信息
    //判断格子是否能够向下移动
    
    if( !canMoveDown(board))
        return false;
     
    //真正的moveDown函数//标准
    for(var j = 0;j<4;j++)
        for(var i = 2;i>=0;i--){       

            if(board[i][j] !=0){
                //(i,j)下侧的元素
                for(var k = 3;k>i;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                     if(board[k][j] == 0 && noBlockVertical(j , i, k, board)){
                        //move

                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        
                     break;
                     }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score+=board[k][j];
                        // addScore(board[k][j]);
                       updateScore(score);                                                           
                        break;                       
                    }
                }
               
            }
        }

     setTimeout("updateBoardView()",200);
     return true;
}

// function addScore(score){

//   var addEle=document.createElement("div");

//     addEle.id="score-addition";
//     addEle.innerHTML="+"+score;
//     scoreContainer.appendChild(addEle);
   
// }




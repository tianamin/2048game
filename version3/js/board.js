
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

function getPosTop(i, j) {
    return 20 + i * 120;
}

function getPosLeft(i, j) {
    return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
    switch (number) {
    case 2:
        return "#eee4da";
        break;
    case 4:
        return "#eee4da";
        break;
    case 8:
        return "#f26179";
        break;
    case 16:
        return "#f59563";
        break;
    case 32:
        return "#f67c5f";
        break;
    case 64:
        return "#f65e36";
        break;
    case 128:
        return "#edcf72";
        break;
    case 256:
        return "#edcc61";
        break;
    case 512:
        return "#9c0";
        break;
    case 1024:
        return "#3365a5";
        break;
    case 2048:
        return "#09c";
        break;
    case 4096:
        return "#a6bc";
        break;
    case 8192:
        return "#93c";
        break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}

//在随机生成数字的时候判断16宫格中是否还有空间
function nospace(board) {
    for ( var i = 0; i < 4; i++) 
        for ( var j = 0; j < 4; j++) 
            if (board[i][j] == 0)
                return false;
    return true;
}

//判断水平方向是否有障碍物

function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1 + 1; i<col2; i++)
        if(board[row][i]!=0)
            return false;
    return true;
}

function noBlockVertical(col,row1,row2,board) {
    for (var i = row1+1; i < row2; i++) {
          if (board[i][col]!=0) {
            return false;
          }
         
    }
     return true;  
}

//最后收尾
function nomove(board){
    if(canMoveLeft(board)|| canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
        return false;
    return true;
}


//实现功能判断

function canMoveLeft( board ){
    for(var i = 0;i<4;i++)
        for(var j = 1;j<4;j++)
            if( board[i][j] !=0 )
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                    return true;
                    
    return false;
}

function canMoveRight( board ){ 
    for(var i = 0;i<4;i++)
        for(var j = 2;j>=0;j--)
            if( board[i][j] !=0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
                    
    return false;


}

function canMoveUp( board ){
    for(var j = 0;j<4;j++)
        for(var i = 1;i<4;i++)
            if( board[i][j] !=0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
                    
    return false;

}
function canMoveDown( board ){
   
     for(var j = 0;j<4;j++)
        for(var i = 2;i>=0;i--)
            if( board[i][j] !=0 )

                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
                    
     return false;
}



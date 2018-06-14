function Grid(size){
    this.size=size;
    this.board=[];
}

Grid.prototype.moveLeft = function() {
    if( !this.canMoveLeft(this.board))
        return false;
    
    //真正的moveLeft函数//标准
    for(var i = 0;i<4;i++)
        for(var j = 1;j<4;j++){//第一列的数字不可能向左移动
            if(this.board[i][j] !=0){
                //(i,j)左侧的元素
                for(var k = 0;k<j;k++){                   
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(this.board[i][k] == 0 && this.noBlockHorizontal(i , k, j, this.board)){
                        //move
                       
                        showMoveAnimation(i, j,i,k);
                        this.board[i][k] = this.board[i][j];
                        this.board[i][j] = 0;                      
                        break;
                    } else if(this.board[i][k] == this.board[i][j] && this.noBlockHorizontal(i , k, j, this.board)){
             
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        this.board[i][k] += this.board[i][j];
                        this.board[i][j] = 0;

                        // score+=this.board[i][k];                      
                        myScore.addScore(this.board[i][k]);

                        break;                       
                      
                    }
                }
            }
        }
    setTimeout(this.updateBoardView.bind(this),200);
     // setTimeout(updateBoardView,200);
    return true;
};
Grid.prototype.moveRight = function() {
      //判断格子是否能够向右移动
     if( !this.canMoveRight(this.board))
        return false;
    
     //真正的moveLeft函数//标准
     for(var i = 0;i<4;i++)
        for(var j = 2; j>=0;j-- ){ //第四列的数字不可能向右移动
            if(this.board[i][j] !=0){
                //(i,j)右侧的元素
                for(var k = 3;k>j;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(this.board[i][k] == 0 && this.noBlockHorizontal(i , j, k, this.board)){
                        //move
                        showMoveAnimation(i, j,i,k);               
                        this.board[i][k] = this.board[i][j];
                        this.board[i][j] = 0;
                     
                        break;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(this.board[i][k] == this.board[i][j] && this.noBlockHorizontal(i , j, k, this.board)){
                        //move
                        showMoveAnimation(i, j,i,k);                      
                        //add
                        this.board[i][k] += this.board[i][j];
                        this.board[i][j] = 0;

                        myScore.addScore(this.board[i][k]);
                                                                  
                       break;
                    }
                }
            }
        }
     setTimeout(this.updateBoardView.bind(this),200);
     return true;
};
Grid.prototype.moveUp = function() {
    
    if( !this.canMoveUp(this.board))
        return false;    

    //真正的moveLeft函数//标准
    for (var j = 0; j < 4; j++) {
       for (var i = 1; i < 4; i++) {
           if (this.board[i][j]!=0) {
            for (var k = 0; k < i; k++) {
                if (this.board[k][j]==0 && this.noBlockVertical(j,k,i,this.board)) {

                    showMoveAnimation(i, j,k,j);
                    this.board[k][j]=this.board[i][j];
                    this.board[i][j]=0;
                    break;

                }else if(this.board[k][j]==this.board[i][j] && this.noBlockVertical(j,k,i,this.board)){
                   
                    showMoveAnimation(i, j,k,j);

                    this.board[k][j]+=this.board[i][j];
                    this.board[i][j]=0;

                    myScore.addScore(this.board[k][j]);
                                               
                    break;
                }
            }
           }
       }
    }

    setTimeout(this.updateBoardView.bind(this),200);
    return true;
};
Grid.prototype.moveDown = function() {
     
    if( !this.canMoveDown(this.board))
        return false;
     
    //真正的moveDown函数//标准
    for(var j = 0;j<4;j++)
        for(var i = 2;i>=0;i--){       

            if(this.board[i][j] !=0){
                //(i,j)下侧的元素
                for(var k = 3;k>i;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                     if(this.board[k][j] == 0 && this.noBlockVertical(j , i, k, this.board)){
                        //move

                        showMoveAnimation(i, j,k,j);
                        this.board[k][j] = this.board[i][j];
                        this.board[i][j] = 0;
                        
                     break;
                     }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(this.board[k][j] == this.board[i][j] && this.noBlockVertical(j , i, k, this.board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        this.board[k][j] += this.board[i][j];
                        this.board[i][j] = 0;

                        myScore.addScore(this.board[k][j]);
                                                                               
                        break;                       
                    }
                }
               
            }
        }

     setTimeout(this.updateBoardView.bind(this),200);
     return true;
};
Grid.prototype.updateBoardView = function() {

     $(".number-cell").remove();
     for(var i = 0;i<4;i++){
        for ( var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(this.board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',this.getPosTop(i,j));
                theNumberCell.css('left',this.getPosLeft(i,j));
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('hegiht','100px');
                theNumberCell.css('top',this.getPosTop(i,j));
                theNumberCell.css('left',this.getPosLeft(i,j));
                //NumberCell覆盖
                theNumberCell.css('background-color',this.getNumberBackgroundColor(this.board[i][j]));//返回背景色
                theNumberCell.css('color',this.getNumberColor(this.board[i][j]));//返回前景色
                theNumberCell.text(this.board[i][j]);
            }
         }
     }
};
Grid.prototype.generateOneNumber = function() {
     if (this.nospace(this.board)) 
        return false;
    
     //随机一个位置
     var randx = parseInt(Math.floor(Math.random()*4));
     var randy = parseInt(Math.floor(Math.random()*4));
     while(true){
        if (this.board[randx][randy] == 0) 
            break;
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
     }
     //随机一个数字
     // var randNumber = Math.random()<0.5 ?2 : 4;
     var randNumber = 2;
     //在随机位置显示随机数字
     this.board[randx][randy] = randNumber;
     showNumberWithAnimation(randx,randy,randNumber);
     return true;
};

Grid.prototype.getPosTop = function(i,j) {
     return 20 + i * 120;
};

Grid.prototype.getPosLeft = function(i,j) {
    return 20 + j * 120;
};
Grid.prototype.nospace = function() {
    for ( var i = 0; i < 4; i++) 
        for ( var j = 0; j < 4; j++) 
            if (this.board[i][j] == 0)
                return false;
    return true;
};

Grid.prototype.noBlockHorizontal = function(row, col1, col2) {
     for(var i = col1 + 1; i<col2; i++)
        if(this.board[row][i]!=0)
            return false;
    return true;
};
Grid.prototype.noBlockVertical = function(col,row1,row2) {
     for (var i = row1+1; i < row2; i++) {
          if (this.board[i][col]!=0) {
            return false;
          }
         
     }
     return true; 
};
Grid.prototype.nomove = function() {
     if(this.canMoveLeft(this.board)|| this.canMoveRight(this.board) || this.canMoveUp(this.board) || this.canMoveDown(this.board))
        return false;
     return true;
};
Grid.prototype.canMoveLeft = function() {
     for(var i = 0;i<4;i++)
        for(var j = 1;j<4;j++)
            if( this.board[i][j] !=0 )
                if( this.board[i][j-1] == 0 || this.board[i][j-1] == this.board[i][j])
                    return true;
                    
     return false;
};

Grid.prototype.canMoveRight = function() {
     for(var i = 0;i<4;i++)
        for(var j = 2;j>=0;j--)
            if( this.board[i][j] !=0 )
                if( this.board[i][j+1] == 0 || this.board[i][j+1] == this.board[i][j])
                    return true;
                    
     return false;
};
Grid.prototype.canMoveUp = function() {
    for(var j = 0;j<4;j++)
        for(var i = 1;i<4;i++)
            if( this.board[i][j] !=0 )
                if( this.board[i-1][j] == 0 || this.board[i-1][j] == this.board[i][j])
                    return true;
                    
    return false;
};
Grid.prototype.canMoveDown = function() {
      for(var j = 0;j<4;j++)
        for(var i = 2;i>=0;i--)
            if( this.board[i][j] !=0 )

                if( this.board[i+1][j] == 0 || this.board[i+1][j] == this.board[i][j])
                    return true;
                    
     return false;
}
Grid.prototype.getNumberColor= function(number) {
     if (number <= 4){
        return "#776e65";
     }
     return "white";
};
Grid.prototype.getNumberBackgroundColor = function(number) {
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
};
Grid.prototype.init = function() {
     
    for(var i = 0; i<4;i++){
        this.board[i] = new Array();
        for(var j = 0;j<4;j++){
            this.board[i][j] = 0;
        }
    }

};
Grid.prototype.newGame = function() {
    this.init();
    //在随机两个各自声称的数字
    this. generateOneNumber();
    this. generateOneNumber();
    // generateOneNumber();
    this.updateBoardView()
};
Grid.prototype.isGameOver = function() {
     if(this.nospace(this.board)&&this.nomove(this.board))
     {
         this.gameover();
         return true;
     }else{
        return false;
     }
};
Grid.prototype.gameover = function() {
   
     // alert("gameover");

    var ele= document.getElementById('game-message');
    ele.style.display="block";

    myScore.changeBestScore(score);
};

window.Grid=Grid;



function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.css("background-color", game.getNumberBackgroundColor(randNumber));
    numberCell.css("color", game.getNumberColor(randNumber));
    numberCell.text(randNumber);
    
    numberCell.animate({
        width : "100px",
        height : "100px",
        top : game.getPosTop(i, j),
        left : game.getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromx, fromy, tox, toy){
    
    var numberCell = $('#number-cell-'+fromx +'-'+fromy);
   
    numberCell.animate({
        top:game.getPosTop(tox,toy),
        left:game.getPosLeft(tox,toy)

    },200);
     

}
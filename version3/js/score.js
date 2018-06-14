function updateBestScore(score){
   
    bestScore=bestScoreEle.innerHTML;
    console.log(bestScore);

    if (score>bestScore) {
        bestScore=score;
        storage.setBestScore(bestScore);
    }

    console.log(storage.setBestScore(bestScore));

}
function updateScore(score){
    scoreEle.innerHTML=score;
    console.log(score);
}

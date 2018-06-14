var myScore={
	score:0,
	bestScore:0,
	scoreEle:document.getElementById('score'),
	bestScoreEle:document.getElementById('best-score'),

	updateScore:function (score) {
		 this.score=score;
		 this.scoreEle.innerHTML=score;      
	},
	updateBestScore:function (score) {
		this.bestScore=score;
		this.bestScoreEle.innerHTML=score;
	},
	changeBestScore:function () {
    	if (this.score>this.bestScore) {
       		this.bestScore=this.score;
        	storage.setBestScore(this.bestScore);
    	}
   		console.log(storage.setBestScore(this.bestScore));
	},
	addScore:function(number) {
		console.log(number);

		this.score+=number;
		this.scoreEle.innerHTML=this.score;

		console.log(this.score);		
		console.log();

	}
	
}

window.myScore=myScore;

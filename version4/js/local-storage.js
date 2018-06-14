window.fakeStorage={                       //假存储，实际上并没有存储状态和值。
	_data:{},
	setItem:function (key,val) {
		return  this._data[key]=String(val);
	},
	getItem:function (key) {		
		return this._data.hasOwnProperty(key)?this._data[key]:undefined;

	},
	removeItem:function (key) {
        return delete this._data[key];
		
	},
	clear:function () {
		return this._data={};
	}
}

function LocalStorageManager() {
	this.bestScoreKey="bestScore";
	this.gameStateKey="gameState";
	this.scoreKey="score";
	this.gameOverKey="isGameOver";

	var supported=this.localStorageSupported;
	this.storage=supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function() {
	// body...
	var testKey="test";
	try{
		var storage=window.localStorage;
		storage.setItem(testKey,"test");
		storage.removeItem(testKey);
		return true;

	}catch(error){
		return false;
	}

};

LocalStorageManager.prototype.getBestScore = function() {

	// var stateJSON=this.storage.getItem(this.bestScoreKey);
	// return stateJSON?JSON.parse(stateJSON):0;
	
	 return this.storage.getItem(this.bestScoreKey)||0;
};

LocalStorageManager.prototype.setBestScore = function(score) {
	return this.storage.setItem(this.bestScoreKey,score);
};


LocalStorageManager.prototype.getGameState = function() {          //localStorage存储的是字符串

	var stateJSON=this.storage.getItem(this.gameStateKey);
	return stateJSON?JSON.parse(stateJSON):null;
};

LocalStorageManager.prototype.setGameState = function(gameState) {
	this.storage.setItem(this.gameStateKey,JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function() {
	this.storage.removeItem(this.gameStateKey);
};

LocalStorageManager.prototype.getScore = function() {

	 var scoreJSON=this.storage.getItem(this.scoreKey);
	 return scoreJSON?JSON.parse(scoreJSON):0;

	 // return this.storage.getItem(this.scoreKey)||0;
	
};
LocalStorageManager.prototype.setScore=function (score) {

	 this.storage.setItem(this.scoreKey,JSON.stringify(score));

};

LocalStorageManager.prototype.removeScore = function() {
	
	this.storage.removeItem(this.scoreKey);
};


LocalStorageManager.prototype.getGameOver = function() {
	var isoverJSON=this.storage.getItem(this.gameOverKey);
	return  isoverJSON?JSON.parse(isoverJSON):true;
};

LocalStorageManager.prototype.setGameOver = function(isover) {

	return this.storage.setItem(this.gameOverKey,JSON.stringify(isover));
};







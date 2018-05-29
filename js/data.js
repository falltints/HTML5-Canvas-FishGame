function Data() {
    this.fruitNum = 0;
    this.double = 1;
    this.score = 0;
    this.gameOver = false;
    this.alpha = 0
}

Data.prototype.init = function () {
    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';
};

Data.prototype.reset =  function () {
    this.fruitNum = 0;
    this.double = 1;
};

Data.prototype.draw = function () {
    ctx1.save();
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = 'white';
    ctx1.fillStyle = 'white';
    ctx1.fillText('SCORE: ' + this.score, canWidth * 0.5, canHeight - 20);
    if (this.gameOver) {
        this.alpha += deltaTime * 0.0001;
        if (this.alpha > 1) {
            this.alpha = 1;
        }
        ctx1.fillStyle = 'rgba(255, 255, 255, ' + this.alpha + ')';
        ctx1.fillText('GAME OVER', canWidth * 0.5, canHeight * 0.5);
    }
    ctx1.restore();
};

Data.prototype.addScore = function () {
    this.score += this.fruitNum * 100 * this.double;
    this.reset();
};
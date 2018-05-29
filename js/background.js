function Background() {
    this.bgPic = new Image();
}

Background.prototype.init = function () {
    this.bgPic.src = './images/background.jpg';
};

Background.prototype.draw = function () {
    ctx2.drawImage(this.bgPic, 0, 0, canWidth, canHeight);
};
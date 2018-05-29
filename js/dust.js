function Dust() {
    this.x = [];
    this.y = [];
    this.pic = [];
    this.size = [];
    this.dust = [];
    this.amplitude = [];
}

Dust.prototype.num = 70;

Dust.prototype.init = function () {
    for (var i = 0; i < 7; i++) {
        this.pic[i] = new Image();
        this.pic[i].src = './images/dust' + i + '.png';
    }
    for(var z = 0; z < this.num; z++) {
        this.x[z] = Math.random() * (canWidth + 200) - 100;  // [-100, canWidth + 100)
        this.y[z] = Math.random() * canHeight; // [0, canHeight)
        this.size[z] = Math.random() * 10 + 5; // [5, 15)
        this.dust[z] = this.pic[Math.floor(Math.random() * 7)];
        this.amplitude[z] = Math.random() * 50 + 50;  // [50, 100)
    }
};

Dust.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        ctx2.drawImage(this.dust[i], this.x[i] + ane.direction * this.amplitude[i], this.y[i], this.size[i], this.size[i]);
    }
};


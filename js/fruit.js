var Fruit = function () {
    this.alive = [];
    this.x = [];
    this.y = [];
    this.size = [];  // 果实的大小
    this.speed = [];
    this.fruitType = [];
    this.orange = new Image();
    this.blue = new Image();
    this.aneIndex = [];
};

Fruit.prototype.num = 30;

Fruit.prototype.init = function () {
    for (var i = 0; i < this.num; i++){
        this.alive[i] = false;
        this.speed[i] = Math.random() * 0.017 + 0.003; // [0.003, 0.02)
        this.fruitType[i] = '';
        this.aneIndex[i] = 0;
    }

    this.orange.src = './images/fruit.png';
    this.blue.src = './images/blue.png';
};

Fruit.prototype.draw = function () {
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            var pic;
            if (this.fruitType[i] === 'blue') {
                pic = this.blue;
            }else {
                pic = this.orange;
            }
            if (this.size[i] <= 14) {
                this.size[i] += this.speed[i] * deltaTime;  // 随时间的增长改变果实的大小
                this.x[i] = ane.headX[this.aneIndex[i]];
                this.y[i] = ane.headY[this.aneIndex[i]];
            }else {
                this.y[i] -= this.speed[i] * 7 * deltaTime;  // 果实一旦成熟，改变它在画布中的位置
            }
            ctx2.drawImage(pic, this.x[i] - this.size[i] * 0.5, this.y[i] - this.size[i] * 0.5, this.size[i], this.size[i]);
            if (this.y[i] < -10) {
                this.alive[i] = false;
            }
        }
    }
};

Fruit.prototype.born = function (i) {
    this.aneIndex[i] = Math.floor(Math.random() * ane.num); // [0, ane.num)
    this.size[i] = 0;
    this.alive[i] = true;
    if ( Math.random() < 0.2) {
        this.fruitType[i] = 'blue';
    }else {
        this.fruitType[i] = 'orange';
    }
};

Fruit.prototype.dead = function (i) {
    this.alive[i] = false;
};

var fruitMonitor = function () { // 监测屏幕上的果实数量，只要小于15，就出生一颗果实
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) {
            num++;
        }
    }
    if (num < 15) {
        sendFruit();
    }
};

var sendFruit = function () { // 每次只出生一个果实
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {  // 如果果实处于闲置状态
            fruit.born(i);
            return;
        }
    }
};

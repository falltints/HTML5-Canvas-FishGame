var Mother = function () {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.firstBlue = true;
    this.bodyColor = 'orange';

    this.bigTail = [];
    this.bigEye = [];
    this.bigBody = [];

    this.bigTailTimer = 0;
    this.bigTailCount = 0;

    this.bigEyeTimer = 0;
    this.bigEyeCount = 0;
    this.bigEyeInterval = 1000;

    this.bigBodyCount = 0;

    this.bigBodyOrange = [];
    this.bigBodyBlue = [];
};

Mother.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;

    for (var i = 0; i < 8; i++) {
        this.bigTail[i] = new Image();
        this.bigTail[i].src = './images/bigTail' + i + '.png';
    }
    for (var z = 0; z < 2; z++) {
        this.bigEye[z] = new Image();
        this.bigEye[z].src = './images/babyEye' + z + '.png';
    }
    for (var y = 0; y < 8; y++) {
        this.bigBodyOrange[y] = new Image();
        this.bigBodyBlue[y] = new Image();
        this.bigBodyOrange[y].src = './images/bigSwim' + y + '.png';
        this.bigBodyBlue[y].src = './images/bigSwimBlue' + y + '.png';
    }
};

Mother.prototype.draw = function () {
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.98);
    var deltaY = this.y - my;
    var deltaX = this.x - mx;
    var beta = Math.atan2(deltaY, deltaX);
    // (-PI, PI) 返回的是两点之间的弧度，整圆的弧度为2 * PI
    // 以x轴为基准，向下转动为正，向上转动为负
    this.angle = lerpAngle(beta, this.angle, 0.6);

    this.bigTailTimer += deltaTime;
    if (this.bigTailTimer > 50) {
        this.bigTailCount = (this.bigTailCount + 1) % 8; // [0,7]
        this.bigTailTimer = 0;
    }

    this.bigEyeTimer += deltaTime;
    if (this.bigEyeTimer > this.bigEyeInterval) {
        this.bigEyeCount = (this.bigEyeCount + 1) % 2; // [0,1]
        this.bigEyeTimer = 0;
        if (this.bigEyeCount === 0) {
            this.bigEyeInterval = Math.random() * 1500 + 2000; // [2000, 3500)
        }else {
            this.bigEyeInterval = 200;
        }
    }

    if (this.bodyColor === 'orange') {
        this.bigBody = this.bigBodyOrange;
    }else {
        this.bigBody = this.bigBodyBlue;
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);  // 改变原点的位置（原来的原点是在画布的左上角，现在在画布的中央）
    ctx1.rotate(this.angle);  // rotate方法转动画布
    ctx1.drawImage(this.bigTail[this.bigTailCount], -this.bigTail[this.bigTailCount].width * 0.5 + 30, -this.bigTail[this.bigTailCount].height * 0.5);
    ctx1.drawImage(this.bigBody[this.bigBodyCount], -this.bigBody[this.bigBodyCount].width * 0.5, -this.bigBody[this.bigBodyCount].height * 0.5);
    ctx1.drawImage(this.bigEye[this.bigEyeCount], -this.bigEye[this.bigEyeCount].width * 0.5, -this.bigEye[this.bigEyeCount].height * 0.5);
    ctx1.restore();
};
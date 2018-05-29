function Baby() {
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.babyTail = [];
    this.babyEye = [];
    this.babyBody = [];
    this.babyTailTimer = 0;
    this.babyTailCount = 0;
    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;
    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}

Baby.prototype.init = function () {
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;

    for (var i = 0; i < 8; i++) {
        this.babyTail[i] = new Image();
        this.babyTail[i].src = './images/babyTail' + i + '.png';
    }
    for (var z = 0; z < 2; z++) {
        this.babyEye[z] = new Image();
        this.babyEye[z].src = './images/babyEye' + z + '.png';
    }
    for (var y = 0; y < 20; y++) {
        this.babyBody[y] = new Image();
        this.babyBody[y].src = './images/babyFade' + y + '.png';
    }
};

Baby.prototype.draw = function () {
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);

    var deltaX = this.x - mom.x;
    var deltaY = this.y - mom.y;
    var beta = Math.atan2(deltaY, deltaX);

    this.angle = lerpAngle(beta, this.angle, 0.6);

    this.babyTailTimer += deltaTime;
    if (this.babyTailTimer > 50) {
        this.babyTailCount = (this.babyTailCount + 1) % 8; // [0,7]
        this.babyTailTimer = 0;
    }

    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval) {
        this.babyEyeCount = (this.babyEyeCount + 1) % 2; // [0,1]
        this.babyEyeTimer = 0;
        if (this.babyEyeCount === 0) {
            this.babyEyeInterval = Math.random() * 1500 + 2000; // [2000, 3500)
        }else {
            this.babyEyeInterval = 200;
        }
    }

    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300) {
        this.babyBodyCount++;
        this.babyBodyTimer = 0;
        if (this.babyBodyCount > 19) {
            this.babyBodyCount = 19;
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);  // 注意画上去的先后距离，先画上去的被后画上去遮盖
    ctx1.drawImage(this.babyTail[this.babyTailCount], -this.babyTail[this.babyTailCount].width * 0.5 + 23, -this.babyTail[this.babyTailCount].height * 0.5);
    ctx1.drawImage(this.babyBody[this.babyBodyCount], -this.babyBody[this.babyBodyCount].width * 0.5, -this.babyBody[this.babyBodyCount].height * 0.5);
    ctx1.drawImage(this.babyEye[this.babyEyeCount], -this.babyEye[this.babyEyeCount].width * 0.5, -this.babyEye[this.babyEyeCount].height * 0.5);
    ctx1.restore();
};
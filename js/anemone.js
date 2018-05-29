var Anemone = function () {
    this.rootX = [];
    this.headX = [];
    this.headY = [];
    this.amplitude = [];  // 振幅
    this.angle = 0;
    this.direction = 0;
};

Anemone.prototype.num = 55;

Anemone.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.rootX[i] = i * 17 + Math.random() * 26 - 50; // [-50, 850)
        this.headX[i] = this.rootX[i];
        this.headY[i] = canHeight - 250 + Math.random() * 50; // [200, 250)
        this.amplitude[i] = Math.random() * 50 + 50;  // [50, 100)
    }
};

Anemone.prototype.draw = function () {
    this.angle += deltaTime * 0.0008;  // this.angle无限增大
    this.direction = Math.sin(this.angle); // [0, 1, 0, -1, 0]
    ctx2.save();
    ctx2.globalAlpha = 0.6;  // 画笔的透明度
    ctx2.strokeStyle = '#3b154e';
    ctx2.lineWidth = 20;
    ctx2.lineCap = 'round'; // 线条顶端的收笔方式
    for (var i = 0; i < this.num; i++) {
        this.headX[i] = this.rootX[i] + this.direction * this.amplitude[i];
        ctx2.beginPath();  // beginPath() 方法开始一条新路径，或重置当前的路径。
        ctx2.moveTo(this.rootX[i], canHeight); // 从底端开始绘制
        ctx2.quadraticCurveTo(this.rootX[i], canHeight - 100, this.headX[i], this.headY[i]);
        // 前两个参数表示控制点的坐标，后两个参数是曲线尾端点的坐标
        ctx2.stroke();  // stroke方法真正把线条画上画布
    }
    ctx2.restore();
    // 关于画布画笔样式的定义只在save()和restore()之间起作用, 否则会影响到画布上的其他元素
};
var can1, can2, ctx1, ctx2, lastTime, deltaTime, canWidth,
    canHeight, ane, fruit, mom, mx, my, baby, data, wave, halo, dust, background;
// delta time : 时间增量

document.body.onload = function () {
    init();
    lastTime = Date.now();  // 等同于new Date().getTime()
    deltaTime = 0;  // 每一帧间隔的时间
    gameLoop();
};

function init() {
    can1 = document.getElementById('canvas1');  // 在上面的canvas
    can2 = document.getElementById('canvas2');  // 在下面的canvas
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');
    canWidth = can1.width;  // 这里的width和height都是直接定义在HTML标签上的，所以可以直接引用，不需要加style
    canHeight = can1.height;
    mx = 0;
    my = 0;

    background = new Background();
    background.init();

    ane = new Anemone();
    ane.init();

    fruit = new Fruit();
    fruit.init();

    mom = new Mother();
    mom.init();

    baby = new Baby();
    baby.init();

    data = new Data();
    data.init();

    wave = new Wave();
    wave.init();

    halo = new Halo();
    halo.init();

    dust = new Dust();
    dust.init();

    can1.onmousemove = function (e) {
        if (!data.gameOver) {
            // 注： e.clientX和e.clientY是相对于document的偏移量
            if (e.offsetX || e.layerX) {
                mx = e.offsetX || e.layerX;
                my = e.offsetY || e.layerY;
            }
        }
    };
}

function gameLoop() {
    window.requestAnimaFrame(gameLoop);  // 时间间隔是动态的
    var now = Date.now();
    deltaTime =  now - lastTime;
    lastTime = now;
    if (deltaTime > 40) {
        // 因为浏览器如果切换标签页，那么该标签页将不再进行此循环，
        // 当切换回来时deltaTime会变得非常地大
        deltaTime = 40;
    }
    // 画布2上drawBackground()间接起到了清除画布的作用
    background.draw();
    dust.draw();
    ane.draw();
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0 ,0, canWidth, canHeight); // 清除画布
    mom.draw();
    motherEatFruit();
    wave.draw();
    baby.draw();
    momBabyCollision();
    halo.draw();
    data.draw();
}
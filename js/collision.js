function motherEatFruit() {
    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                var distance = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);  // 大鱼和果实距离的平方
                if (distance < 30 * 30) {
                    fruit.dead(i);
                    data.fruitNum++;
                    if (fruit.fruitType[i] === 'orange') {
                        if (mom.bodyColor === 'orange') {
                            mom.bigBodyCount++;
                        }
                    }else {
                        if (mom.firstBlue) {
                            mom.bodyColor = 'blue';
                            mom.bigBodyCount = 0;
                            data.double = 2;
                            mom.firstBlue = false;
                        }else {
                            mom.bigBodyCount++;
                        }
                    }
                    if (mom.bigBodyCount > 7) {
                        mom.bigBodyCount = 7;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

function momBabyCollision() {
    if (data.fruitNum > 0 && !data.gameOver) {
        var distance = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (distance < 30 * 30) {
            baby.babyBodyCount = 0;
            mom.bigBodyCount = 0;
            mom.firstBlue = true;
            mom.bodyColor = 'orange';
            data.addScore();
            halo.born(baby.x, baby.y);
        }
    }
}

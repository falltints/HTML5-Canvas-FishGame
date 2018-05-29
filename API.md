关于canvas的API:
canvas.getContext('2d' or '3d'); // 获得画布
context.drawImage(Image对象, x, y, width, height) // 第二个和第三个参数是图片（左上角）在画布中的位置
context.beginPath()
context.moveTo(x, y)
context.lineTo(x, y)
context.stroke()
context.translate(x, y) // 改变原点的位置
context.rotate(degree)  // 旋转的弧度 [-PI, PI]


关于context的属性：
context.globalAlpha : 画笔透明度 [0（完全透明）, 1（完全不透明）]
context.strokeStyle : '#color' 画笔颜色
context.lineWidth : 画笔宽度
context.lineCap : 线条尾端收笔方
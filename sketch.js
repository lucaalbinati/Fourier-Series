const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

let ctx;
let t;

let sinFunctions = [];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    ctx = document.getElementById("defaultCanvas0").getContext("2d");
    frameRate(1 / FRAME_REFRESH_PERIOD);

    for (var i = 0; i <= 3; ++i) {
        n = 2 * i + 1;
        sinFunctions.push(new SinFunction(4 / (n * Math.PI), n));
    }

    t = 0;
}

function draw() {
    t += DT;

    background(230);
    ctx.translate(150, 150);

    for (var i = 0; i < sinFunctions.length; ++i) {
        ctx.translate(0, 5 * sinFunctions[i].getAmplitude() * Math.min(i, 1));
        sinFunctions[i].drawFunction(t);
    }

    ctx.translate(0, 200);
    drawSum();
}

function drawSum() {
    ctx.save();
    ctx.translate(HORIZONTAL_OFFSET, 0);

    ctx.beginPath();
    for (var i = 0; i < canvasWidth; ++i) {
        ctx.lineTo(3 * i, computeVerticalSumPosition(i));
    }
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
}

function computeVerticalSumPosition(i) {
    var sum = 0;
    sinFunctions.forEach(f => sum += f.getVerticalBallYPositionAt(i));
    return 2 * sum / sinFunctions.length;
}

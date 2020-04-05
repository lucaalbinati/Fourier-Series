const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const dt = 0.03;
let ctx;

var periodScenes = [];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    ctx = document.getElementById("defaultCanvas0").getContext("2d");
    frameRate(1/dt);

    let pathOriginX = PATH_RADIUS;
    let pathOriginY = PATH_RADIUS;
    periodScenes.push(new PeriodScene(1, pathOriginX, pathOriginY, PATH_RADIUS, BALL_RADIUS));
    periodScenes.push(new PeriodScene(2, pathOriginX, pathOriginY, PATH_RADIUS, BALL_RADIUS));
    periodScenes.push(new PeriodScene(3, pathOriginX, pathOriginY, PATH_RADIUS, BALL_RADIUS));
    periodScenes.push(new PeriodScene(5, pathOriginX, pathOriginY, PATH_RADIUS, BALL_RADIUS));
}

function draw() {
    background(230);
    ctx.translate(20, 20);

    for (var i = 0; i < periodScenes.length; ++i) {
        if (i > 0) {
            ctx.translate(0, PERIOD_SCENES_OFFSET_Y);
        }
        periodScenes[i].updateState();
        periodScenes[i].drawPeriodScene();
    }

    drawSum();
}

function drawSum() {
    ctx.save();
    ctx.translate(periodScenes[0].getVerticalAxisOriginX(), 50 + 2 * PERIOD_SCENES_OFFSET_Y);

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
    periodScenes.forEach(p => sum += p.getVerticalBallPositionAt(i));
    return 3 * sum / periodScenes.length;
}

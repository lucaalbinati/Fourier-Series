const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

let ctx;
let t;

let series;
let nbFourierTerms = 4;
let combine;

window.onload = function() {
    setupCanvas();
    initialize();
    setInterval(draw, 1000 / FRAME_RATE);
};

function setupCanvas() {
    ctx = document.createElement("canvas");
    document.body.append(ctx);
    ctx.id = "mainCanvas";
    ctx.width = CANVAS_WIDTH - 20;
    ctx.height = CANVAS_HEIGHT - 100;
    ctx = ctx.getContext("2d");
}

function initialize() {
    t = 0;

    series = FourierSeries.createSawToothFourierSeries(nbFourierTerms);
    //series = FourierSeries.createStepFourierSeries(nbFourierTerms);

    combine = [];
    for (let i = 0; i < nbFourierTerms - 1; ++i) {
        combine.push(true);
    }
    combine = [false, true, false];
}

function draw() {
    // update
    t += DT;
    series.updateFourierSeries(t);

    // draw
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    series.drawFourierSeries(combine);
}

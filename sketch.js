const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

let ctx;
let t;

let series;
let nbFourierTerms = 5;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx = document.getElementById("defaultCanvas0").getContext("2d");
    frameRate(1 / FRAME_REFRESH_PERIOD);

    // initialize
    t = 0;
    series = FourierSeries.createSawToothFourierSeries(nbFourierTerms);
}

function draw() {
    // update
    t += DT;
    series.updateState(t);

    // draw
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.translate(100, 150);
    series.drawFourierSeries();
}

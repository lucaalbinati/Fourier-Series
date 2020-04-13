const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

let ctx;
let t;

let play;

let series;
let nbFourierTerms = 4;
let combine;

window.onload = function() {
    setupPauseButton();
    setupNbFourierTermsButtons();
    setupCanvas();
    initialize();
    setInterval(draw, 1000 / FRAME_RATE);
};

function setupPauseButton() {
    let pauseButton = document.createElement("button");
    document.body.append(pauseButton);
    pauseButton.textContent = "Pause";
    pauseButton.style.width = pauseButton.offsetWidth + "px";
    pauseButton.onclick = function(event) {
        if (play) {
            pauseButton.textContent = "Play";
        } else {
            pauseButton.textContent = "Pause";
        }
        play = !play;
    };
    play = true;
}

function setupNbFourierTermsButtons() {
    let decreaseButton = document.createElement("button");
    document.body.append(decreaseButton);
    decreaseButton.textContent = "-";
    decreaseButton.onclick = function (event) {
        if (event.shiftKey) {
            nbFourierTerms -= 10;
        } else {
            nbFourierTerms -= 1;
        }
        nbFourierTerms = Math.max(nbFourierTerms, 1);
        nbFourierTermsText.textContent = nbFourierTerms.toString(10);
        initialize();
    };

    let nbFourierTermsText = document.createElement("text");
    document.body.append(nbFourierTermsText);
    nbFourierTermsText.textContent = nbFourierTerms.toString(10);

    let increaseButton = document.createElement("button");
    document.body.append(increaseButton);
    increaseButton.textContent = "+";
    increaseButton.onclick = function (event) {
        if (event.shiftKey) {
            nbFourierTerms += 10;
        } else {
            nbFourierTerms += 1;
        }
        nbFourierTermsText.textContent = nbFourierTerms.toString(10);
        initialize();
    };
}

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
    //combine = [false, true, false];
}

function draw() {
    if (!play) {
        return;
    }

    // update
    t += DT;
    series.updateFourierSeries(t);

    // draw
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    series.drawFourierSeries(combine);
}

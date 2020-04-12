class FourierSeries {
    constructor(outsideFunc, insideFunc, limit) {
        if (limit < 1) {
            throw "Limit must be greater or equal than 1";
        }
        this.sinFunctions = [];

        for (let i = 0; i < limit; ++i) {
            let amplitude = outsideFunc(i);
            let period = insideFunc(i);
            this.sinFunctions.push(new SinFunction(amplitude, period));
        }
    }

    updateFourierSeries(t) {
        this.sinFunctions.forEach(f => f.updateState(t));
    }

    drawFourierSeries() {
        ctx.save();

        let centerX = VERTICAL_OFFSET + this.sinFunctions[0].getAmplitude();
        let centerY = VERTICAL_OFFSET + this.sinFunctions[0].getAmplitude();
        ctx.translate(centerX, centerY);

        let currRelativeX;
        let currRelativeY;
        let nextRelativeX = 0;
        let nextRelativeY = 0;
        for (let i = 0; i < this.sinFunctions.length; ++i) {
            currRelativeX = nextRelativeX;
            currRelativeY = nextRelativeY;
            nextRelativeX += this.sinFunctions[i].getBallX();
            nextRelativeY += this.sinFunctions[i].getBallY();

            this.sinFunctions[i].drawConnectBalls(0,    0, currRelativeX, currRelativeY, nextRelativeX, nextRelativeY);
            this.sinFunctions[i].drawCircle(currRelativeX, currRelativeY);
            this.sinFunctions[i].drawBall(currRelativeX, currRelativeY);
        }

        this.sinFunctions[0].drawConnectBalls(0, 0, nextRelativeX, nextRelativeY, HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), nextRelativeY);
        this.sinFunctions[0].drawVerticalAxis(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), 0, this.computeCombinedAmplitude());
        this.drawSum(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), 0);
        this.sinFunctions[0].drawBallOnVerticalAxis(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), nextRelativeY);
    }

    drawSum(centerX, centerY) {
        ctx.save();
        ctx.translate(centerX, centerY);

        ctx.beginPath();
        for (var i = 0; i < CANVAS_WIDTH; ++i) {
            ctx.lineTo(3 * i, this.computeVerticalSumPosition(i));
        }
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    computeVerticalSumPosition(i) {
        let sum = 0;
        this.sinFunctions.forEach(f => sum += f.getVerticalBallYPositionAt(i));
        return sum;
    }

    computeCombinedAmplitude() {
        let combinedAmplitude = 0;
        this.sinFunctions.forEach(f => combinedAmplitude += f.getAmplitude());
        return combinedAmplitude;
    }

    static createStepFourierSeries(nbFourierTerms) {
        return new FourierSeries(i => 4 / (Math.PI * (2 * i + 1)), i => 2 * i + 1, nbFourierTerms);
    }

    static createSawToothFourierSeries(nbFourierTerms) {
        return new FourierSeries(i => 2 / (Math.PI * (i + 1)), i => i + 1, nbFourierTerms);
    }
}
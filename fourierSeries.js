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

    drawFourierSeries(combineTable) {
        if (combineTable.length !== this.sinFunctions.length - 1) {
            throw "'combine' table must be of size one less than the number of sin functions";
        }

        if (combineTable.length === 1) {
            combineTable[0] = true
        }

        ctx.save();
        let centerX = VERTICAL_OFFSET + this.sinFunctions[0].getAmplitude();
        let centerY = 1.5 * VERTICAL_OFFSET + this.sinFunctions[0].getAmplitude();
        ctx.translate(centerX, centerY);

        // draw the summed function in the beginning (unless all values are 'true' in which case it will be drawn anyway)
        if (!combineTable.every(c => c)) {
            this.sinFunctions[0].drawVerticalAxis(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), 0, this.computeCombinedAmplitude());
            this.drawSum(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), 0);
            this.sinFunctions[0].drawBallOnVerticalAxis(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), this.computeVerticalSumPosition(0));
            ctx.translate(0, 2 * this.computeCombinedAmplitude());
        }

        for (let i = 0; i < combineTable.length; ++i) {
            let beginIdx = i;

            if (combineTable[i]) {
                while (combineTable[i]) {
                    i++;
                }
            }

            let endIdx = i;

            this.drawFourierSeriesWithIndices(beginIdx, endIdx);

            if (!combineTable[i]) {
                ctx.translate(0, 2 * VERTICAL_OFFSET + this.computeCombinedAmplitude(beginIdx, endIdx));
            }
        }

        // make sure the last element gets drawed, in the case the last value of 'combine' is false
        if (!combineTable[combineTable.length - 1]) {
            let lastIdx = this.sinFunctions.length - 1;
            this.drawFourierSeriesWithIndices(lastIdx, lastIdx);
        }

        ctx.restore();
    }

    drawFourierSeriesWithIndices(beginIdx, endIdx) {
        ctx.save();

        let currRelativeX;
        let currRelativeY;
        let nextRelativeX = 0;
        let nextRelativeY = 0;
        for (let i = beginIdx; i <= endIdx; ++i) {
            currRelativeX = nextRelativeX;
            currRelativeY = nextRelativeY;
            nextRelativeX += this.sinFunctions[i].getBallX();
            nextRelativeY += this.sinFunctions[i].getBallY();

            this.sinFunctions[i].drawConnectBalls(0, 0, currRelativeX, currRelativeY, nextRelativeX, nextRelativeY);
            this.sinFunctions[i].drawCircle(currRelativeX, currRelativeY);
            this.sinFunctions[i].drawBall(currRelativeX, currRelativeY);
        }

        this.sinFunctions[beginIdx].drawConnectBalls(0, 0, nextRelativeX, nextRelativeY, HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), nextRelativeY);
        this.sinFunctions[beginIdx].drawVerticalAxis(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), 0, this.computeCombinedAmplitude(beginIdx, endIdx));
        this.drawSum(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), 0, beginIdx, endIdx);
        this.sinFunctions[beginIdx].drawBallOnVerticalAxis(HORIZONTAL_OFFSET + this.computeCombinedAmplitude(), nextRelativeY);

        ctx.restore();
    }

    drawSum(centerX, centerY, beginIdx, endIdx) {
        ctx.save();
        ctx.translate(centerX, centerY);

        ctx.beginPath();
        for (let i = 0; i < CANVAS_WIDTH; ++i) {
            ctx.lineTo(3 * i, this.computeVerticalSumPosition(i, beginIdx, endIdx));
        }
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    computeVerticalSumPosition(i, beginIdx = 0, endIdx = this.sinFunctions.length - 1) {
        let sum = 0;
        for (let j = beginIdx; j <= endIdx; ++j) {
            sum += this.sinFunctions[j].getVerticalBallYPositionAt(i);
        }
        return sum;
    }

    computeCombinedAmplitude(beginIdx = 0, endIdx = this.sinFunctions.length - 1) {
        let combinedAmplitude = 0;
        for (let j = beginIdx; j <= endIdx; ++j) {
            combinedAmplitude += this.sinFunctions[j].getAmplitude();
        }
        return combinedAmplitude;
    }

    static createStepFourierSeries(nbFourierTerms) {
        return new FourierSeries(i => 4 / (Math.PI * (2 * i + 1)), i => 2 * i + 1, nbFourierTerms);
    }

    static createSawToothFourierSeries(nbFourierTerms) {
        return new FourierSeries(i => 2 / (Math.PI * (i + 1)), i => i + 1, nbFourierTerms);
    }
}
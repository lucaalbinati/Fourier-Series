class FourierSeries {
    constructor(constantTerm, outsideFunc, insideFunc, limit) {
        if (limit < 1) {
            throw "Limit must be greater or equal than 1";
        }
        this.sinFunctions = [];

        for (let i = 0; i < limit; ++i) {
            let amplitude = constantTerm * outsideFunc(i);
            let period = insideFunc(i);
            this.sinFunctions.push(new SinFunction(amplitude, period));
        }
    }

    updateFourierSeries(t) {
        this.sinFunctions.forEach(f => f.updateState(t));
    }

    drawFourierSeries() {
        ctx.save();
        ctx.translate(1.5 * this.sinFunctions[0].getAmplitude(), VERTICAL_OFFSET + this.sinFunctions[0].getAmplitude());
        this.drawSum();
        ctx.translate(0, VERTICAL_OFFSET + 2 * this.sinFunctions[0].getAmplitude());

        for (var i = 0; i < this.sinFunctions.length; ++i) {
            if (i > 0) {
                let offset = this.sinFunctions[i-1].getAmplitude() + this.sinFunctions[i].getAmplitude() + VERTICAL_OFFSET;
                ctx.translate(0, offset);
            }
            this.sinFunctions[i].drawFunction(t);
        }
        ctx.restore();
    }

    drawSum() {
        ctx.save();
        ctx.translate(HORIZONTAL_OFFSET, 0);

        ctx.beginPath();
        for (var i = 0; i < CANVAS_WIDTH; ++i) {
            ctx.lineTo(3 * i, this.computeVerticalSumPosition(i));
        }
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    computeVerticalSumPosition(i) {
        let maxSum = 0
        this.sinFunctions.forEach(f => maxSum += f.getAmplitude());
        let sum = 0;
        this.sinFunctions.forEach(f => sum += f.getVerticalBallYPositionAt(i));
        return 2 * this.sinFunctions[0].getAmplitude() * sum / maxSum;
    }

    static createStepFourierSeries(nbFourierTerms) {
        return new FourierSeries(4 / Math.PI, i => 1 / (2 * i + 1), i => 2 * i + 1, nbFourierTerms);
    }

    static createSawToothFourierSeries(nbFourierTerms) {
        return new FourierSeries(2 / Math.PI, i => 1 / (i + 1), i => i + 1, nbFourierTerms);
    }
}
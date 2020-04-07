class FourierSeries {
    constructor(constantTerm, outsideFunc, insideFunc, limit) {
        this.sinFunctions = [];

        for (let i = 0; i < limit; ++i) {
            let amplitude = constantTerm * outsideFunc(i);
            let period = insideFunc(i);
            this.sinFunctions.push(new SinFunction(amplitude, period));
        }
    }

    updateState(t) {
        this.sinFunctions.forEach(f => f.updateState(t));
    }

    drawFourierSeries() {
        this.drawSum();
        ctx.translate(0, 250);

        for (var i = 0; i < this.sinFunctions.length; ++i) {
            if (i > 0) {
                let offset = this.sinFunctions[i-1].getAmplitude() + this.sinFunctions[i].getAmplitude() + VERTICAL_OFFSET;
                ctx.translate(0, offset);
            }
            this.sinFunctions[i].drawFunction(t);
        }
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
        let sum = 0;
        this.sinFunctions.forEach(f => sum += f.getVerticalBallYPositionAt(i));
        return sum;
    }

    static createStepFourierSeries(nbFourierTerms) {
        return new FourierSeries(4 / Math.PI, i => 1 / (2 * i + 1), i => 2 * i + 1, nbFourierTerms);
    }

    static createSawToothFourierSeries(nbFourierTerms) {
        return new FourierSeries(2 / Math.PI, i => 1 / (i + 1), i => i + 1, nbFourierTerms);
    }
}
class SinFunction {
    constructor(amplitude, period) {
        this.amplitude = 100 * amplitude;
        this.period = period;
        this.circleRadius = this.amplitude;
        this.ballRadius = this.amplitude / 10;
        if (this.ballRadius < 1) {
            this.ballRadius = 1;
        }
        this.verticalBallYPositions = [];
    }

    drawFunction(t) {
        ctx.save();

        let ft = this.computeFt(t);
        let y = ft;
        let x = this.computeX(t, y);
        let ballY = y * this.amplitude;
        let ballX = x * this.amplitude;

        this.verticalBallYPositions.unshift(ballY);

        this.drawConnectBalls(ballX, ballY);

        this.drawCircle();
        this.drawBall(ballX, ballY);

        ctx.translate(HORIZONTAL_OFFSET, 0);
        this.drawVerticalAxis();
        this.drawBallOnVerticalAxis(ballY);

        this.drawBallLine();

        ctx.restore();
    }

    drawCircle() {
        ctx.save();

        ctx.beginPath();
        ctx.arc(0, 0, this.circleRadius, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    drawConnectBalls(ballX, ballY) {
        ctx.save();
        ctx.translate(ballX, ballY);
        ctx.beginPath();
        ctx.lineTo(0,0);
        ctx.lineTo(- ballX + HORIZONTAL_OFFSET, 0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawBall(ballX, ballY) {
        ctx.save();
        ctx.translate(ballX, ballY);
        ctx.beginPath();
        ctx.arc(0, 0, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    computeFt(t) {
        return - Math.sin(this.period * t);
    }

    computeX(t, y) {
        let val = Math.sqrt(1 - y * y);

        let piPeriod = (2 * Math.PI / this.period);
        let periodMod = t % piPeriod;

        if (piPeriod / 4 <= periodMod && periodMod <= 3 * piPeriod / 4) {
            return - val;
        } else {
            return val;
        }
    }

    drawVerticalAxis() {
        ctx.save();
        ctx.beginPath();
        ctx.lineTo(0, - this.circleRadius);
        ctx.lineTo(0, this.circleRadius);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawBallOnVerticalAxis(ballY) {
        ctx.save();
        ctx.translate(0, ballY);
        this.drawBall(0, 0);
        ctx.restore();
    }

    drawBallLine() {
        ctx.save();
        ctx.beginPath();
        for (var i = 0; i < this.verticalBallYPositions.length; ++i) {
            ctx.lineTo(3 * i, this.verticalBallYPositions[i]);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    getAmplitude() {
        return this.amplitude;
    }

    getVerticalBallYPositionAt(i) {
        return this.verticalBallYPositions[i];
    }

}
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
        this.x = 0;
        this.y = 0;
        this.ballX = 0;
        this.ballY = 0;
    }

    updateState(t) {
        this.y = this.computeFt(t);
        this.x = this.computeX(t);
        this.ballY = this.y * this.amplitude;
        this.ballX = this.x * this.amplitude;

        this.verticalBallYPositions.unshift(this.ballY);
    }

    drawCircle(centerX, centerY) {
        ctx.save();
        ctx.translate(centerX, centerY);

        ctx.beginPath();
        ctx.arc(0, 0, this.circleRadius, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    drawConnectBalls(centerX, centerY, ballX1, ballY1, ballX2, ballY2) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.beginPath();
        ctx.lineTo(ballX1, ballY1);
        ctx.lineTo(ballX2, ballY2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawBall(centerX, centerY) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.translate(this.ballX, this.ballY);
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

    computeX(t) {
        let val = Math.sqrt(1 - this.y * this.y);

        let piPeriod = (2 * Math.PI / this.period);
        let periodMod = t % piPeriod;

        if (piPeriod / 4 <= periodMod && periodMod <= 3 * piPeriod / 4) {
            return - val;
        } else {
            return val;
        }
    }

    drawVerticalAxis(centerX, centerY, height) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.beginPath();
        ctx.lineTo(0, - height);
        ctx.lineTo(0, height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    drawBallOnVerticalAxis(centerX, centerY) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.beginPath();
        ctx.arc(0, 0, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    getAmplitude() {
        return this.amplitude;
    }

    getVerticalBallYPositionAt(i) {
        return this.verticalBallYPositions[i];
    }

    getBallX() {
        return this.ballX;
    }

    getBallY() {
        return this.ballY;
    }

}
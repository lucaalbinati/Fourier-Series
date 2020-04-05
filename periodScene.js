class PeriodScene {
    constructor(period, pathOriginX, pathOriginY, pathRadius, ballRadius) {
        this.period = period;
        this.pathOriginX = pathOriginX;
        this.pathOriginY = pathOriginY;
        this.verticalAxisOriginX = pathOriginX + 2 * pathRadius;
        this.verticalAxisOriginY = pathOriginY;
        this.pathRadius = pathRadius;
        this.ballRadius = ballRadius;
        this.ballAngle = 0;
        this.ballAngleDt = period * BALL_ANGLE_DT;
        this.verticalBallPositions = [];
    }

    getVerticalBallPositionAt(i) {
        return this.verticalBallPositions[i];
    }

    getVerticalAxisOriginX() {
        return this.verticalAxisOriginX;
    }

    updateState() {
        this.ballAngle += this.ballAngleDt;

        this.verticalBallPositions.unshift(this.computeBallOffsetY());
        if (this.verticalBallPositions.length > canvasWidth) {
            this.verticalBallPositions.pop();
        }
    }

    drawPeriodScene() {
        this.drawPath();
        this.drawVerticalAxis();
        this.drawConnectBalls();
        this.drawBallLine();
        this.drawBallOnPath();
        this.drawBallOnVerticalAxis();
    }

    drawPath() {
        ctx.save();
        ctx.translate(this.pathOriginX, this.pathOriginY);

        ctx.beginPath();
        ctx.arc(0, 0, this.pathRadius, 0, 2 * Math.PI);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    drawVerticalAxis() {
        ctx.save();
        ctx.translate(this.verticalAxisOriginX, this.verticalAxisOriginY);

        ctx.beginPath();
        ctx.lineTo(0, - this.pathRadius);
        ctx.lineTo(0, this.pathRadius);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    drawBallOnPath() {
        ctx.save()
        ctx.translate(this.pathOriginX, this.pathOriginY);
        ctx.translate(this.computeBallOffsetX(), this.computeBallOffsetY());
        this.drawBall();
        ctx.restore();
    }

    drawBallOnVerticalAxis() {
        ctx.save();
        ctx.translate(this.verticalAxisOriginX, this.verticalAxisOriginY);
        ctx.translate(0, this.computeBallOffsetY());
        this.drawBall();
        ctx.restore();
    }

    drawBall() {
        ctx.beginPath();
        ctx.arc(0, 0, this.ballRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    computeBallOffsetX() {
        return this.pathRadius * Math.sin(this.ballAngle);
    }

    computeBallOffsetY() {
        return - this.pathRadius * Math.cos(this.ballAngle);
    }

    drawBallLine() {
        ctx.save();
        ctx.translate(this.verticalAxisOriginX, this.verticalAxisOriginY);

        ctx.beginPath();
        for (var i = 0; i < this.verticalBallPositions.length; ++i) {
            ctx.lineTo(3 * i, this.verticalBallPositions[i]);
        }
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }

    drawConnectBalls() {
        ctx.save();
        ctx.beginPath();
        ctx.lineTo(this.pathOriginX + this.computeBallOffsetX(), this.pathOriginY + this.computeBallOffsetY());
        ctx.lineTo(this.verticalAxisOriginX, this.verticalAxisOriginY + this.computeBallOffsetY());
        ctx.stroke();
        ctx.closePath();

        ctx.restore();
    }
}

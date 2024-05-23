import Ball from "../ball";

const checkCollisions = (balls: Ball[]) => {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[i].x - balls[j].x;
            const dy = balls[i].y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < balls[i].radius + balls[j].radius) {
                const newRadius = Math.sqrt(balls[i].radius * balls[i].radius + balls[j].radius * balls[j].radius);
                const newX = (balls[i].x + balls[j].x) / 2;
                const newY = (balls[i].y + balls[j].y) / 2;
                balls.splice(j, 1);
                balls[i] = new Ball(newX, newY, newRadius, 0, 0);
                break;
            }
        }
    }
}

export default checkCollisions

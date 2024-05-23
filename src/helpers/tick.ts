import Ball, { canvas, ctx } from "../ball";
import checkCollisions from "./checkCollisions";

const tick = (balls: Ball[], currentTime: number, lastTime: number) => {
    const deltaTime = currentTime - lastTime;

        ctx?.clearRect(0, 0, canvas.width, canvas.height);

        balls.forEach(ball => {
            ball.update(deltaTime);
            ball.draw(ctx!);
        });

        checkCollisions(balls);

        lastTime = currentTime;
        requestAnimationFrame(() => tick(balls, currentTime, lastTime));
}

export default tick

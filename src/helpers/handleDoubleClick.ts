import Ball, { canvas } from "../ball";

const handleDoubleClick = (event: MouseEvent, balls: Ball[]) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedBallIndex = balls.findIndex(ball => ball.isClicked(x, y));
    if (clickedBallIndex !== -1) {
        balls.splice(clickedBallIndex, 1);
    }
}

export default handleDoubleClick

import Ball, { canvas, ctx } from "../ball";

const addClearBallsFeature = (balls: Ball[]) => {
    document.addEventListener('DOMContentLoaded', function() {
        const clearBallsButton = document.getElementById('clearBallsButton');
    
        clearBallsButton?.addEventListener('click', function() {
            balls.length = 0;
    
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        });
    });
}

export default addClearBallsFeature

import Ball, { canvas, ctx } from "./ball";
import addClearBallsFeature from "./helpers/addClearBallsFeature";
import handleDoubleClick from "./helpers/handleDoubleClick";
import handleSingleClick from "./helpers/handleSingleClick";
import startMusic from "./helpers/startMusic";
import tick from "./helpers/tick";
import './styles.css';

canvas.addEventListener('click', startMusic);

if (ctx) {
    const balls: Ball[] = [];

    addClearBallsFeature(balls);
    canvas.addEventListener('click', (event) => handleSingleClick(event, balls));
    canvas.addEventListener('dblclick', (event) => handleDoubleClick(event, balls));

    let lastTime = 0;
    requestAnimationFrame((currentTime) => tick(balls, currentTime, lastTime));
} else {
    console.error('Failed to get the canvas context!');
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx?.clearRect(0, 0, canvas.width, canvas.height); 
});


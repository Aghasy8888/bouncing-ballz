import Ball, { canvas } from "../ball";

const spawnSound = document.getElementById('spawnSound') as HTMLAudioElement;

const handleSingleClick = (event: MouseEvent, balls: Ball[]) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    balls.push(new Ball(x, y, 20, 0, 0)); 
    const clone = spawnSound.cloneNode(true) as HTMLAudioElement;
    clone.play();
}

export default handleSingleClick

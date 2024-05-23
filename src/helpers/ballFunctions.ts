import Ball from "../ball";

export function draw(ball: any, ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < ball.tail.length; i++) {
        const tailAlpha = 1 - i / ball.tail.length; 
        ctx.beginPath();
        ctx.arc(ball.tail[i].x, ball.tail[i].y, ball.radius, 0, Math.PI * 2);

        const tailGradient = ctx.createRadialGradient(ball.tail[i].x, ball.tail[i].y, ball.radius / 2, ball.tail[i].x, ball.tail[i].y, ball.radius);
        tailGradient.addColorStop(0, 'rgba(255, 200, 255,' + tailAlpha + ')');
        tailGradient.addColorStop(1, 'rgba(200, 255, 200, 0)');

        ctx.fillStyle = tailGradient;
        ctx.fill();
        ctx.closePath();
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(ball.x, ball.y, ball.radius / 2, ball.x, ball.y, ball.radius);
    gradient.addColorStop(0, ball.backgroundColor);
    gradient.addColorStop(1, ball.color);

    ctx.fillStyle = gradient; 
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.strokeStyle = ball.border; 
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

export function isClicked(ballX: number, ballY: number, radius: number, mouseX: number, mouseY: number): boolean {
    const dx = ballX - mouseX;
    const dy = ballY - mouseY;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
}


interface IBallTail {
    x: number;
    y: number;
};

interface IBallData {
    tail: IBallTail[];
    color: string;
    border: string;
    backgroundColor: string;
    tailLength: number;
    getRandomColor: () => string;
}

export function update(ball: Ball, canvas: HTMLCanvasElement, gravitySlider: HTMLInputElement, bounceSound: HTMLAudioElement, ballData: IBallData): void {
    const gravity = parseFloat(gravitySlider.value); 
    const dampening = 1; 
    const friction = 0.99; 
    const minVelocityY = 1;
    
    ball.velocityY += gravity;   

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    ballData.tail.push({ x: ball.x, y: ball.y });
    
    if (ballData.tail.length > ballData.tailLength) {
        ballData.tail.shift(); 
    }
    
    if (ball.y + ball.radius >= canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.velocityY = -ball.velocityY * dampening;

        if (Math.abs(ball.velocityY) > minVelocityY) {
            const clone = bounceSound.cloneNode(true) as HTMLAudioElement;
            clone.play();
            ballData.color = ballData.getRandomColor();
            ballData.border = ballData.getRandomColor();
            ballData.backgroundColor = ballData.getRandomColor();
        }

        ball.velocityX *= friction;
        
        if (Math.abs(ball.velocityY) < 0.1) {
            ball.velocityY = 0;
        }
        
        ball.velocityY *= friction;
    }
    
    ball.velocityX *= friction;
    ball.velocityY *= friction;
    
    if (Math.abs(ball.velocityX) < 0.1) {
        ball.velocityX = 0;
    }
    if (Math.abs(ball.velocityY) < 0.1) {
        ball.velocityY = 0;
    }
}



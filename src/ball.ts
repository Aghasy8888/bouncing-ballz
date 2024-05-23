import colors from "./data/colors";
import { draw, isClicked } from "./helpers/ballFunctions";

export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

const gravitySlider = document.getElementById('gravitySlider') as HTMLInputElement;
const bounceSound = document.getElementById('bounceSound') as HTMLAudioElement;

export default class Ball {
    private color: string;
    private border: string;
    private backgroundColor: string;
    private tailLength: number = 2; 
    private tail: { x: number; y: number }[] = [];

    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public velocityY: number = 0,
        public velocityX: number = 0
    ) {
        this.color = this.getRandomColor();
        this.border = this.getRandomColor();
        this.backgroundColor = this.getRandomColor();
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
        return isClicked(this.x, this.y, this.radius, mouseX, mouseY);
    }

    private getRandomColor(): string {                 
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(deltaTime: number): void {
        const gravity = parseFloat(gravitySlider.value); 
        const dampening = 1; 
        const friction = 0.99; 
        const minVelocityY = 1;
        
        this.velocityY += gravity;   

        this.x += this.velocityX;
        this.y += this.velocityY;
        
        this.tail.push({ x: this.x, y: this.y });
        
        if (this.tail.length > this.tailLength) {
            this.tail.shift(); 
        }
        
        if (this.y + this.radius >= canvas.height) {
            this.y = canvas.height - this.radius;
            this.velocityY = -this.velocityY * dampening;

            if (Math.abs(this.velocityY) > minVelocityY) {
                const clone = bounceSound.cloneNode(true) as HTMLAudioElement;
                clone.play();
                this.color = this.getRandomColor();
                this.border = this.getRandomColor();
                this.backgroundColor = this.getRandomColor();
            }

            this.velocityX *= friction;
            
            if (Math.abs(this.velocityY) < 0.1) {
                this.velocityY = 0;
            }
            
            this.velocityY *= friction;
        }
        
        this.velocityX *= friction;
        this.velocityY *= friction;
        
        if (Math.abs(this.velocityX) < 0.1) {
            this.velocityX = 0;
        }
        if (Math.abs(this.velocityY) < 0.1) {
            this.velocityY = 0;
        }
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        draw(this, ctx);
    } 
}


import colors from "./data/colors";
import { draw, isClicked, updateBall } from "./helpers/ballFunctions";

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

    update(): void {
        updateBall(
            this,
            canvas,
            gravitySlider,
            bounceSound,
            this.getRandomColor.bind(this)  
        );
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        draw(this, ctx);
    } 

     public getTail(): { x: number; y: number }[] {
        return this.tail;
    }

    public getTailLength(): number {
        return this.tailLength;
    }

    public setTail(tail: { x: number; y: number }[]): void {
        this.tail = tail;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public setBorder(border: string): void {
        this.border = border;
    }

    public setBackgroundColor(backgroundColor: string): void {
        this.backgroundColor = backgroundColor;
    }
}


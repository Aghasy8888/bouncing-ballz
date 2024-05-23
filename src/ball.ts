import colors from "./data/colors";
import { draw, isClicked, update } from "./helpers/ballFunctions";

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

    public update(): void {
        const ballData = {
        tail: this.tail ,
        color: this.color,
        border: this.border,
        backgroundColor: this.backgroundColor,
        tailLength: this.tailLength,
        getRandomColor: this.getRandomColor,
        }

        update(this, canvas, gravitySlider, bounceSound, ballData);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        draw(this, ctx);
    } 
}


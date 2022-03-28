import {canvas, ctx} from "./canvas.js";
import {gameFrame} from "./index.js";

const playerLeft = new Image();
playerLeft.src = '../assets/images/playerLeft.png';
const playerRight = new Image();
playerRight.src = '../assets/images/playerRight.png';

export class Player {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.isSwimming = false;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 498;
        this.spriteHeight = 327;
        this.spriteRows = 3;
        this.spriteColumns = 4;
        this.sprites = this.spriteColumns * this.spriteRows
    }
    changeSprite(){
        if (this.frame % this.spriteColumns === 0 && this.frame !== this.sprites) {
            this.frameY++;
            this.frameX = 0;
            return;
        } else if (this.frame >= this.sprites) {
            this.frame = 0;
            this.frameX = 0;
            this.frameY = 0;
            return;
        }
        this.frameX++;
    }
    update(mouse) {
        this.isSwimming = true;
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const theta = Math.atan2(dy, dx);
        if (dx <= 15 && dy <= 15) {
            this.isSwimming = false;
        }
        this.angle = theta;
        if (mouse.x !== this.x) {
            this.x -= dx/30;
        }
        if (mouse.y !== this.y) {
            this.y -= dy/30;
        }
        if (gameFrame % 5 === 0) {
            this.frame++;
            this.changeSprite();
        }
    }
    draw(mouse) {
        if (mouse.click) {
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        this.x >= mouse.x ? ctx.drawImage(playerLeft,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0 - 55,
            0 - 40,
            this.spriteWidth / 4,
            this.spriteHeight / 4) : ctx.drawImage(playerRight,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0 - 55,
            0 - 40,
            this.spriteWidth / 4,
            this.spriteHeight / 4)
        ctx.restore();
    }
}
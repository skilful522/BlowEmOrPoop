import {canvas, ctx} from "../canvas.js";
import {player, gameFrame} from '../index.js';

const bubbleImage = new Image();
bubbleImage.src = '../assets/images/bubble.png';

export class Bubble {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 25;
        this.spriteWidth = 394;
        this.spriteHeight = 512;
        this.frame = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.speed = Math.random() * 6;
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        this.spriteRows = 2;
        this.spriteColumns = 4;
        this.isCollision = false;
        this.sprites = this.spriteColumns * this.spriteRows
        this.distance;
    }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        if (gameFrame % 20 === 0) {
            this.frame++;
            this.isCollision && this.changeSprite();
        }
    }
    changeSprite(){
        if (this.frame % this.spriteColumns === 0 && this.frame !== this.sprites) {
            this.frameY++;
            this.frameX = 1;
            return;
        } else if (this.frame >= this.sprites) {
            this.frame = 0;
            this.frameX = 1;
            this.frameY = 0;
            return;
        }
        this.frameX++;
    }
    draw() {
        ctx.drawImage(bubbleImage,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x - 40,
            this.y - 40,
            this.radius * 3,
            this.radius * 3)
    }
}

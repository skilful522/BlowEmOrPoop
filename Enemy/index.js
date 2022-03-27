import {canvas, ctx} from "../canvas.js";
import {player} from "../index.js";

const BASE_ENEMY_PATH = '../assets/images/enemies/';

const getEnemyImg = (enemy) => BASE_ENEMY_PATH + `enemy${enemy}.png`;

export class Enemy {
    constructor() {
        this.x = canvas.width + 500;
        this.y = Math.random() * canvas.height ;
        this.radius = 50;
        this.speed = Math.random() * 5;
        this.enemy = Math.floor(Math.random() * 4) + 1;
        this.img = new Image();
    }
    update() {
        this.x -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw() {
        this.img.src = getEnemyImg(this.enemy)
        ctx.drawImage(this.img,
            0,
            0,
            this.img.width,
            this.img.height,
            this.x - 50,
            this.y - 50,
            this.radius * 2,
            this.radius * 2)
    }
}
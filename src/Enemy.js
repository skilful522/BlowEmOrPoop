import {canvas, ctx} from "./canvas.js";
import {player} from "./index.js";
import enemy1 from './assets/images/enemies/enemy1.png'
import enemy2 from './assets/images/enemies/enemy2.png'
import enemy3 from './assets/images/enemies/enemy3.png'
import enemy4 from './assets/images/enemies/enemy4.png'

const enemiesMap = {
    1: enemy1,
    2: enemy2,
    3: enemy3,
    4: enemy4,
}

const getEnemyImg = (enemy) => enemiesMap[enemy];

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
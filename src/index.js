import {canvas, ctx} from './canvas.js';
import { Bubble } from './Bubble.js';
import { Player } from './Player.js';
import {handleBackground} from "./handleBackground.js";
import {Enemy} from './Enemy.js';
import {isCollisionOccurred} from "./utils/isCollisionOccurred.js";
import './styles.css';
import gameOver from './assets/sounds/gameOver.mp3';
import fishPassBy from './assets/sounds/fishPassBy.mp3';
import environment from './assets/sounds/environment.mp3';
import plop from './assets/sounds/Plop.ogg';
import bubblesSingle from './assets/sounds/bubbles-single2.wav';

export let gameFrame = 0;
export let gameSpeed = 1;
export let isGameOver = false;
let score = 0;

const gameOverSound = new Audio(gameOver);
const fishPassBySound = new Audio(fishPassBy);
const environmentSound = new Audio(environment);

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: 'false',
}

let canvasPosition = canvas.getBoundingClientRect();

canvas.addEventListener('mousedown', (event) => {
    mouse.click = true
    fishPassBySound.play();
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
})

canvas.addEventListener('mouseup', (event) => {
    mouse.click = false;
})

export const player = new Player();
const bubbles = [...Array(10).keys()].map(() => new Bubble())
const enemies = [...Array(0).keys()].map(() => new Enemy());

const audio1 = document.createElement('audio');
audio1.src = plop;
const audio2 = document.createElement('audio');

audio2.src = bubblesSingle;

const handleBubble = () => {
    if (gameFrame % 50 === 0) {
        bubbles.push(new Bubble());
    }
    
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        if (bubble.y < 0 - bubble.radius * 2) {
            bubbles.splice(i, 1);
            i--;
        }
        if (isCollisionOccurred(bubble, player)) {
            if (!bubble.isCollision) {
                bubble.sound === 'sound1' ? audio1.play() : audio2.play();
                score++;
                bubble.isCollision = true;
            }
        }
        bubble.update();
        bubble.draw();
        
    }
}

const handleEnemies = () => {
    if (gameFrame % 200 === 0) {
        enemies.push(new Enemy());
    }

    enemies.forEach(enemy => {
        if (isCollisionOccurred(enemy, player)) {
            isGameOver = true;
        }
        enemy.update();
        enemy.draw();
    })
}

const animate = () => {
    if (isGameOver) {
        environmentSound.pause();
        setInterval(() => {
            gameOverSound.play();
            ctx.fillStyle = 'black';
            ctx.fillRect(Math.floor(Math.random() * canvas.width),Math.floor(Math.random() * canvas.height),20,20)
            ctx.fillStyle = 'brown';
            ctx.font = "48px sans-serif";
            ctx.fillText(`Вляпался ☹`, canvas.width / 2 - 150, canvas.height / 2);
            ctx.font = "24px sans-serif";
            ctx.fillText(`Попробуй ещё раз f5`, canvas.width / 2 - 150, (canvas.height + 100) / 2);
        })

    }

    if(!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBubble();
    handleEnemies();
    player.update(mouse);
    !player.isSwimming && fishPassBySound.pause();
    player.draw(mouse);
    ctx.font = "24px sans-serif";
    ctx.fillStyle = 'black';
    ctx.fillText(`Счёт: ${score}`, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
    }
}

animate();
environmentSound.play();

window.addEventListener('resize', () => {
    canvasPosition = canvas.getBoundingClientRect();
})
import {canvas, ctx} from "./canvas.js";
import {gameSpeed} from "./index.js";
import backgroundImg from './assets/images/background1.png';

const backgroundImage = new Image();
backgroundImage.src = backgroundImg;

const background = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,
}

export const handleBackground = () => {
    background.x1 -= gameSpeed;
    if (background.x1 < -background.width) {
        background.x1 = background.width;
    }
    background.x2 -= gameSpeed;
    if (background.x2 < -background.width) {
        background.x2 = background.width;
    }
    ctx.drawImage(backgroundImage, background.x1, background.y, background.width, background.height);
    ctx.drawImage(backgroundImage, background.x2, background.y, background.width, background.height);
}
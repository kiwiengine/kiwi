import { autoDetectRenderer } from "pixi.js";
import GameObject from "./GameObject.js";
export default class GameScreen {
    container;
    width;
    height;
    renderer;
    rootObject;
    animationInterval;
    targetFPS;
    actualFPS;
    constructor(container, width, height, ...objects) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.rootObject = new GameObject(width / 2, height / 2, ...objects);
        this.createRenderer();
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
            eventMode: "none",
        });
        this.renderer.canvas.style.display = "block";
        this.renderer.canvas.style.touchAction = "auto";
        this.container.appendChild(this.renderer.canvas);
        this.animationInterval = requestAnimationFrame(this.animate);
    }
    update(deltaTime) {
        this.rootObject._systemUpdate(deltaTime);
        this.renderer?.render(this.rootObject.pixiObject);
    }
    lastFrameTime = 0;
    accumulatedTime = 0;
    animate = (currentTime) => {
        const elapsedTime = (currentTime - this.lastFrameTime) / 1000;
        if (elapsedTime > 0) {
            if (this.actualFPS !== undefined && this.actualFPS > 0) {
                this.accumulatedTime += elapsedTime;
                const frameDuration = 1 / this.actualFPS;
                if (this.accumulatedTime >= frameDuration) {
                    this.update(frameDuration);
                    this.accumulatedTime -= frameDuration;
                }
            }
            else {
                this.update(elapsedTime);
            }
            this.lastFrameTime = currentTime;
        }
        this.animationInterval = requestAnimationFrame(this.animate);
    };
    add(...objects) {
        this.rootObject.add(...objects);
    }
    remove() {
        if (this.renderer) {
            this.renderer.destroy();
            this.renderer = undefined;
        }
        if (this.animationInterval) {
            cancelAnimationFrame(this.animationInterval);
            this.animationInterval = undefined;
        }
    }
}
//# sourceMappingURL=GameScreen.js.map
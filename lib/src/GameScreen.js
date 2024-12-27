import { autoDetectRenderer } from "pixi.js";
import GameObject from "./GameObject.js";
export default class GameScreen {
    canvasContainer;
    width;
    height;
    renderer;
    rootObject;
    constructor(canvasContainer, width, height, ...children) {
        this.canvasContainer = canvasContainer;
        this.width = width;
        this.height = height;
        this.rootObject = new GameObject(width / 2, height / 2, ...children);
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
        this.canvasContainer.appendChild(this.renderer.canvas);
        this.renderer.render(this.rootObject.pixiObject);
    }
    add(...children) {
        this.rootObject.add(...children);
    }
}
//# sourceMappingURL=GameScreen.js.map
import { autoDetectRenderer } from "pixi.js";
import GameObject from "./GameObject.js";
export default class GameScreen {
    container;
    width;
    height;
    renderer;
    rootObject;
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
        this.renderer.render(this.rootObject.pixiObject);
    }
    add(...objects) {
        this.rootObject.add(...objects);
    }
}
//# sourceMappingURL=GameScreen.js.map
import { autoDetectRenderer, Renderer } from "pixi.js";
import GameObject, { GameObjectChild } from "./GameObject.js";

export default class GameCanvas {
  private renderer: Renderer | undefined;
  private rootObject: GameObject;

  constructor(
    private canvasContainer: HTMLElement,
    private width: number,
    private height: number,
    ...children: GameObjectChild[]
  ) {
    this.rootObject = new GameObject(width / 2, height / 2, ...children);
    this.createRenderer();
  }

  private async createRenderer() {
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
}

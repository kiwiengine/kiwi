import { autoDetectRenderer, Renderer } from "pixi.js";
import GameObject, { GameObjectChild } from "./GameObject.js";

export default class GameScreen {
  private renderer: Renderer | undefined;
  private rootObject: GameObject;

  constructor(
    private container: HTMLElement,
    private width: number,
    private height: number,
    ...objects: GameObjectChild[]
  ) {
    this.rootObject = new GameObject(width / 2, height / 2, ...objects);
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
    this.container.appendChild(this.renderer.canvas);
    this.renderer.render(this.rootObject.pixiObject);
  }

  public add(...objects: GameObjectChild[]): void {
    this.rootObject.add(...objects);
  }
}

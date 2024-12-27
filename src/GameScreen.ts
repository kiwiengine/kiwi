import { autoDetectRenderer, Renderer } from "pixi.js";
import GameObject, { GameObjectChild } from "./GameObject.js";

export default class GameScreen {
  private renderer: Renderer | undefined;
  private rootObject: GameObject;

  private animationInterval: number | undefined;
  private targetFPS: number | undefined;
  private actualFPS: number | undefined;

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
    this.animationInterval = requestAnimationFrame(this.animate);
  }

  private update(deltaTime: number) {
    this.rootObject._systemUpdate(deltaTime);
    this.renderer?.render(this.rootObject.pixiObject);
  }

  private lastFrameTime = 0;
  private accumulatedTime = 0;

  private animate = (currentTime: number) => {
    const elapsedTime = (currentTime - this.lastFrameTime) / 1000;

    if (elapsedTime > 0) {
      if (this.actualFPS !== undefined && this.actualFPS > 0) {
        this.accumulatedTime += elapsedTime;

        const frameDuration = 1 / this.actualFPS;
        if (this.accumulatedTime >= frameDuration) {
          this.update(frameDuration);
          this.accumulatedTime -= frameDuration;
        }
      } else {
        this.update(elapsedTime);
      }
      this.lastFrameTime = currentTime;
    }

    this.animationInterval = requestAnimationFrame(this.animate);
  };

  public add(...objects: GameObjectChild[]): void {
    this.rootObject.add(...objects);
  }

  public remove(): void {
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

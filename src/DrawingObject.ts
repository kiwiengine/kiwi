import { Container } from "pixi.js";
import GameObject from "./GameObject.js";

export default abstract class DrawingObject<C extends Container = Container> {
  public parent: GameObject | undefined;

  constructor(public pixiObject: C) {}

  public get x(): number {
    return this.pixiObject.x;
  }

  public set x(x: number) {
    this.pixiObject.x = x;
  }

  public get y(): number {
    return this.pixiObject.y;
  }

  public set y(y: number) {
    this.pixiObject.y = y;
  }

  public get drawingOrder(): number {
    return this.pixiObject.zIndex;
  }

  public set drawingOrder(drawingOrder: number) {
    this.pixiObject.zIndex = drawingOrder;
  }

  public get scaleX(): number {
    return this.pixiObject.scale.x;
  }

  public set scaleX(scaleX: number) {
    this.pixiObject.scale.x = scaleX;
  }

  public get scaleY(): number {
    return this.pixiObject.scale.y;
  }

  public set scaleY(scaleY: number) {
    this.pixiObject.scale.y = scaleY;
  }

  public set scale(scale: number) {
    this.pixiObject.scale = scale;
  }

  public get scale() {
    return this.pixiObject.scale.x;
  }

  public get pivotX(): number {
    return this.pixiObject.pivot.x;
  }

  public set pivotX(pivotX: number) {
    this.pixiObject.pivot.x = pivotX;
  }

  public get pivotY(): number {
    return this.pixiObject.pivot.y;
  }

  public set pivotY(pivotY: number) {
    this.pixiObject.pivot.y = pivotY;
  }

  public get rotation(): number {
    return this.pixiObject.rotation;
  }

  public set rotation(rotation: number) {
    this.pixiObject.rotation = rotation;
  }

  public get alpha(): number {
    return this.pixiObject.alpha;
  }

  public set alpha(alpha: number) {
    this.pixiObject.alpha = alpha;
  }

  public _systemUpdate(deltaTime: number): void {}

  public remove(): void {
    this.pixiObject.destroy();
  }
}

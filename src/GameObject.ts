import { Container } from "pixi.js";
import SpineAnimation from "./SpineAnimation.js";
import Sprite from "./Sprite.js";
import SpriteAnimation from "./SpriteAnimation.js";

export type GameObjectChild =
  | GameObject
  | Sprite
  | SpriteAnimation
  | SpineAnimation;

export default class GameObject<
  Child extends GameObjectChild = GameObjectChild,
> {
  public pixiObject: Container;
  public parent: GameObject | undefined;
  public children: Child[] = [];
  public globalTransform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  constructor(x: number, y: number, ...children: Child[]) {
    this.pixiObject = new Container({ x, y });
    this.add(...children);
  }

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

  public get zIndex(): number {
    return this.pixiObject.zIndex;
  }

  public set zIndex(zIndex: number) {
    this.pixiObject.zIndex = zIndex;
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

  public add(...children: Child[]): void {
    for (const child of children) {
      if (child.parent) {
        child.parent.children.splice(child.parent.children.indexOf(child), 1);
      }

      this.children.push(child);
      child.parent = this;
      this.pixiObject.addChild(child.pixiObject);
    }
  }

  public update(deltaTime: number): void {}

  public _systemUpdate(deltaTime: number): void {
    this.update(deltaTime);

    if (this.parent) {
      const pt = this.parent.globalTransform;
      const rx = this.x * pt.scaleX;
      const ry = this.y * pt.scaleY;
      const pCos = Math.cos(pt.rotation);
      const pSin = Math.sin(pt.rotation);

      this.globalTransform.scaleX = pt.scaleX * this.scaleX;
      this.globalTransform.scaleY = pt.scaleY * this.scaleY;

      const pivotX = this.pivotX * this.globalTransform.scaleX;
      const pivotY = this.pivotY * this.globalTransform.scaleY;
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);

      this.globalTransform.x = pt.x +
        (rx * pCos - ry * pSin) -
        (pivotX * cos - pivotY * sin);
      this.globalTransform.y = pt.y +
        (rx * pSin + ry * pCos) -
        (pivotX * sin + pivotY * cos);

      this.globalTransform.rotation = pt.rotation + this.rotation;
      this.globalTransform.alpha = pt.alpha * this.alpha;
    }

    for (const child of this.children) {
      child._systemUpdate(deltaTime);
    }
  }

  public remove(): void {
    this.pixiObject.destroy();
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
  }
}

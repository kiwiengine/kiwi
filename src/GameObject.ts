import { Container, Graphics } from "pixi.js";
import CollisionUtils from "./CollisionUtils.js";
import DrawingObject from "./DrawingObject.js";
import SpineAnimation from "./SpineAnimation.js";
import Sprite from "./Sprite.js";
import SpriteAnimation from "./SpriteAnimation.js";

export type GameObjectChild =
  | GameObject
  | Sprite
  | SpriteAnimation
  | SpineAnimation;

interface RectangleCollider {
  type: "rectangle";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EllipseCollider {
  type: "ellipse";
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PolygonCollider {
  type: "polygon";
  x: number;
  y: number;
  points: { x: number; y: number }[];
}

export default class GameObject<
  Child extends GameObjectChild = GameObjectChild,
> extends DrawingObject<Container> {
  public children: Child[] = [];
  public globalTransform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  private colliders: (RectangleCollider | EllipseCollider | PolygonCollider)[] =
    [];
  private graphics: Graphics[] = [];

  constructor(x: number, y: number, ...children: Child[]) {
    super(new Container({ x, y }));
    this.add(...children);
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

  public addCollider(
    ...colliders: (RectangleCollider | EllipseCollider | PolygonCollider)[]
  ): this {
    this.colliders.push(...colliders);
    return this;
  }

  public checkCollisionWith(other: GameObject): boolean {
    for (const subjectCollider of this.colliders) {
      for (const obstacleCollider of other.colliders) {
        if (
          CollisionUtils.checkCollision(
            subjectCollider,
            this.globalTransform,
            obstacleCollider,
            other.globalTransform,
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  public checkCollisionWithPoint(x: number, y: number): boolean {
    for (const collider of this.colliders) {
      if (
        CollisionUtils.checkPointInCollider(
          x,
          y,
          collider,
          this.globalTransform,
        )
      ) {
        return true;
      }
    }
    return false;
  }

  public drawColliders(color: number): void {
    for (const graphics of this.graphics) {
      this.pixiObject.removeChild(graphics);
    }
    for (const collider of this.colliders) {
      const graphics = new Graphics();
      if (collider.type === "rectangle") {
        graphics.rect(
          collider.x - collider.width / 2,
          collider.y - collider.height / 2,
          collider.width,
          collider.height,
        );
      } else if (collider.type === "ellipse") {
        graphics.ellipse(
          collider.x,
          collider.y,
          collider.width / 2,
          collider.height / 2,
        );
      } else if (collider.type === "polygon") {
        graphics.poly(collider.points);
      }
      graphics.stroke({ color, width: 1 });
      this.graphics.push(graphics);
      this.pixiObject.addChild(graphics);
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
    super.remove();
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
  }
}

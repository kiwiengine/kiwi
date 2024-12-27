import { Container } from "pixi.js";
import DrawingObject from "./DrawingObject.js";
import SpineAnimation from "./SpineAnimation.js";
import Sprite from "./Sprite.js";
import SpriteAnimation from "./SpriteAnimation.js";
export type GameObjectChild = GameObject | Sprite | SpriteAnimation | SpineAnimation;
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
    points: {
        x: number;
        y: number;
    }[];
}
export default class GameObject<Child extends GameObjectChild = GameObjectChild> extends DrawingObject<Container> {
    children: Child[];
    globalTransform: {
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        alpha: number;
    };
    private colliders;
    private graphics;
    constructor(x: number, y: number, ...children: Child[]);
    add(...children: Child[]): void;
    addCollider(...colliders: (RectangleCollider | EllipseCollider | PolygonCollider)[]): this;
    checkCollisionWith(other: GameObject): boolean;
    checkCollisionWithPoint(x: number, y: number): boolean;
    drawColliders(color: number): void;
    update(deltaTime: number): void;
    _systemUpdate(deltaTime: number): void;
    remove(): void;
}
export {};
//# sourceMappingURL=GameObject.d.ts.map
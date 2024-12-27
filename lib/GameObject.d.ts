import { Container } from "pixi.js";
import DrawingObject from "./DrawingObject.js";
import SpineAnimation from "./SpineAnimation.js";
import Sprite from "./Sprite.js";
import SpriteAnimation from "./SpriteAnimation.js";
export type GameObjectChild = GameObject | Sprite | SpriteAnimation | SpineAnimation;
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
    constructor(x: number, y: number, ...children: Child[]);
    add(...children: Child[]): void;
    update(deltaTime: number): void;
    _systemUpdate(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=GameObject.d.ts.map
import { Container } from "pixi.js";
import SpineAnimation from "./SpineAnimation.js";
import Sprite from "./Sprite.js";
export default class GameObject {
    private container;
    parent: GameObject | undefined;
    children: (GameObject | Sprite | SpineAnimation)[];
    globalTransform: {
        x: number;
        y: number;
        scaleX: number;
        scaleY: number;
        rotation: number;
        alpha: number;
    };
    constructor(container: Container);
    get x(): number;
    set x(x: number);
    get y(): number;
    set y(y: number);
    get zIndex(): number;
    set zIndex(zIndex: number);
    get scaleX(): number;
    set scaleX(scaleX: number);
    get scaleY(): number;
    set scaleY(scaleY: number);
    get pivotX(): number;
    set pivotX(pivotX: number);
    get pivotY(): number;
    set pivotY(pivotY: number);
    get rotation(): number;
    set rotation(rotation: number);
    get alpha(): number;
    set alpha(alpha: number);
    add(...children: GameObject[]): void;
    update(deltaTime: number): void;
    _systemUpdate(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=GameObject.d.ts.map
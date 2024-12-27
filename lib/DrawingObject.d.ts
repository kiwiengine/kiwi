import { Container } from "pixi.js";
import GameObject from "./GameObject.js";
export default abstract class DrawingObject<C extends Container = Container> {
    pixiObject: C;
    parent: GameObject | undefined;
    constructor(pixiObject: C);
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
    set scale(scale: number);
    get scale(): number;
    get pivotX(): number;
    set pivotX(pivotX: number);
    get pivotY(): number;
    set pivotY(pivotY: number);
    get rotation(): number;
    set rotation(rotation: number);
    get alpha(): number;
    set alpha(alpha: number);
    _systemUpdate(deltaTime: number): void;
    remove(): void;
}
//# sourceMappingURL=DrawingObject.d.ts.map
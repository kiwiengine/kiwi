import { AnimatedSprite as PixiAnimatedSprite } from "pixi.js";
import GameObject from "./GameObject.js";
export default class SpriteAnimation {
    pixiObject: PixiAnimatedSprite;
    parent: GameObject | undefined;
    constructor(x: number, y: number, assetId: string, animation: string, fps: number);
    _systemUpdate(): void;
    remove(): void;
}
//# sourceMappingURL=SpriteAnimation.d.ts.map
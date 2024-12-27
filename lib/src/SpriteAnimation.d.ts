import { AnimatedSprite as PixiAnimatedSprite } from "pixi.js";
import DrawingObject from "./DrawingObject.js";
export default class SpriteAnimation extends DrawingObject<PixiAnimatedSprite> {
    constructor(x: number, y: number, assetId: string, animation: string, fps: number);
}
//# sourceMappingURL=SpriteAnimation.d.ts.map
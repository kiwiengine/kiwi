import { Sprite as PixiSprite } from "pixi.js";
import GameObject from "./GameObject.js";
export default class Sprite {
    pixiObject: PixiSprite;
    parent: GameObject | undefined;
    constructor(x: number, y: number, assetId: string, frame?: string);
    _systemUpdate(): void;
    remove(): void;
}
//# sourceMappingURL=Sprite.d.ts.map
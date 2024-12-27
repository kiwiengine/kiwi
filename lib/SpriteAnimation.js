import { AnimatedSprite as PixiAnimatedSprite, Spritesheet } from "pixi.js";
import AssetManager from "./AssetManager.js";
export default class SpriteAnimation {
    pixiObject;
    parent;
    constructor(x, y, assetId, animation, fps) {
        const asset = AssetManager.get(assetId);
        if (asset instanceof Spritesheet) {
            this.pixiObject = new PixiAnimatedSprite(asset.animations[animation]);
            this.pixiObject.position.set(x, y);
            this.pixiObject.anchor.set(0.5, 0.5);
            this.pixiObject.animationSpeed = fps / 60;
            this.pixiObject.play();
        }
        else {
            throw new Error(`Invalid asset type: ${assetId}`);
        }
    }
    _systemUpdate() { }
    remove() {
        this.pixiObject.destroy();
    }
}
//# sourceMappingURL=SpriteAnimation.js.map
import { SkeletonData, Skin as SpineSkin, Spine as PixiSpine, } from "@pixi/spine-pixi";
import AssetManager from "./AssetManager.js";
import DrawingObject from "./DrawingObject.js";
export default class SpineAnimation extends DrawingObject {
    _animation;
    _skins = [];
    options;
    constructor(x, y, assetId, options) {
        const asset = AssetManager.get(assetId);
        if (asset instanceof SkeletonData) {
            super(new PixiSpine({ x, y, skeletonData: asset }));
            this.options = options;
            this.animation = options.animation;
            if (options.skins)
                this.skins = options.skins;
            this.pixiObject.state.addListener({
                complete: (entry) => this.options.onAnimationEnd?.(entry.animation?.name ?? ""),
            });
        }
        else {
            throw new Error(`Invalid asset type: ${assetId}`);
        }
    }
    set animation(animation) {
        this._animation = animation;
        if (this.pixiObject && animation) {
            this.pixiObject.state.setAnimation(0, animation, this.options.loop ?? true);
            this.pixiObject.state.apply(this.pixiObject.skeleton);
        }
    }
    get animation() {
        return this._animation;
    }
    set skins(skins) {
        this._skins = skins;
        if (this.pixiObject) {
            const newSkin = new SpineSkin("combined-skin");
            for (const skinName of skins) {
                const skin = this.pixiObject.skeleton.data.findSkin(skinName);
                if (skin)
                    newSkin.addSkin(skin);
            }
            this.pixiObject.skeleton.setSkin(newSkin);
            this.pixiObject.skeleton.setSlotsToSetupPose();
        }
    }
    get skins() {
        return this._skins;
    }
}
//# sourceMappingURL=SpineAnimation.js.map
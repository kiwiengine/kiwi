import {
  SkeletonData,
  Skin as SpineSkin,
  Spine as PixiSpine,
} from "@pixi/spine-pixi";
import AssetManager from "./AssetManager.js";
import DrawingObject from "./DrawingObject.js";

interface SpineAnimationOptions {
  animation: string;
  skins?: string[];
  loop?: boolean;
  onAnimationEnd?: (animation: string) => void;
}

export default class SpineAnimation extends DrawingObject<PixiSpine> {
  private _animation: string | undefined;
  private _skins: string[] = [];
  private options: SpineAnimationOptions;

  constructor(
    x: number,
    y: number,
    assetId: string,
    options: SpineAnimationOptions,
  ) {
    const asset = AssetManager.get(assetId);
    if (asset instanceof SkeletonData) {
      super(new PixiSpine({ x, y, skeletonData: asset }));

      this.options = options;
      this.animation = options.animation;
      if (options.skins) this.skins = options.skins;

      this.pixiObject.state.addListener({
        complete: (entry) =>
          this.options.onAnimationEnd?.(entry.animation?.name ?? ""),
      });
    } else {
      throw new Error(`Invalid asset type: ${assetId}`);
    }
  }

  public set animation(animation: string | undefined) {
    this._animation = animation;

    if (this.pixiObject && animation) {
      this.pixiObject.state.setAnimation(
        0,
        animation,
        this.options.loop ?? true,
      );
      this.pixiObject.state.apply(this.pixiObject.skeleton);
    }
  }

  public get animation(): string | undefined {
    return this._animation;
  }

  public set skins(skins: string[]) {
    this._skins = skins;

    if (this.pixiObject) {
      const newSkin = new SpineSkin("combined-skin");
      for (const skinName of skins) {
        const skin = this.pixiObject.skeleton.data.findSkin(skinName);
        if (skin) newSkin.addSkin(skin);
      }
      this.pixiObject.skeleton.setSkin(newSkin);
      this.pixiObject.skeleton.setSlotsToSetupPose();
    }
  }

  public get skins(): string[] {
    return this._skins;
  }
}

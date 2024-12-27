import {
  SkeletonData,
  Skin as SpineSkin,
  Spine as PixiSpine,
} from "@pixi/spine-pixi";
import AssetManager from "./AssetManager.js";
import GameObject from "./GameObject.js";

export default class SpineAnimation {
  public parent: GameObject | undefined;

  private pixiSpine: PixiSpine;
  private _animation: string | undefined;
  private _skins: string[] = [];

  constructor(
    x: number,
    y: number,
    assetId: string,
    private options: {
      animation: string;
      skins?: string[];
      loop?: boolean;
    },
  ) {
    const asset = AssetManager.get(assetId);
    if (asset instanceof SkeletonData) {
      this.pixiSpine = new PixiSpine({ x, y, skeletonData: asset });
      this.animation = this.options.animation;
      if (this.options.skins) this.skins = this.options.skins;
    } else {
      throw new Error(`Invalid asset type: ${assetId}`);
    }
  }

  public set animation(animation: string | undefined) {
    this._animation = animation;

    if (this.pixiSpine && animation) {
      this.pixiSpine.state.setAnimation(
        0,
        animation,
        this.options.loop ?? true,
      );
      this.pixiSpine.state.apply(this.pixiSpine.skeleton);
    }
  }

  public get animation(): string | undefined {
    return this._animation;
  }

  public set skins(skins: string[]) {
    this._skins = skins;

    if (this.pixiSpine) {
      const newSkin = new SpineSkin("combined-skin");
      for (const skinName of skins) {
        const skin = this.pixiSpine.skeleton.data.findSkin(skinName);
        if (skin) newSkin.addSkin(skin);
      }
      this.pixiSpine.skeleton.setSkin(newSkin);
      this.pixiSpine.skeleton.setSlotsToSetupPose();
    }
  }

  public get skins(): string[] {
    return this._skins;
  }

  public _systemUpdate(): void {}
}

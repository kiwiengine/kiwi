import { AnimatedSprite as PixiAnimatedSprite, Spritesheet } from "pixi.js";
import AssetManager from "./AssetManager.js";
import GameObject from "./GameObject.js";

export default class SpriteAnimation {
  public pixiObject: PixiAnimatedSprite;
  public parent: GameObject | undefined;

  constructor(
    x: number,
    y: number,
    assetId: string,
    animation: string,
    fps: number,
  ) {
    const asset = AssetManager.get(assetId);
    if (asset instanceof Spritesheet) {
      this.pixiObject = new PixiAnimatedSprite(asset.animations[animation]);
      this.pixiObject.position.set(x, y);
      this.pixiObject.anchor.set(0.5, 0.5);
      this.pixiObject.animationSpeed = fps / 60;
      this.pixiObject.play();
    } else {
      throw new Error(`Invalid asset type: ${assetId}`);
    }
  }

  public _systemUpdate(): void {}

  public remove(): void {
    this.pixiObject.destroy();
  }
}

import { Sprite as PixiSprite, Spritesheet, Texture } from "pixi.js";
import AssetManager from "./AssetManager.js";
import DrawingObject from "./DrawingObject.js";

export default class Sprite extends DrawingObject<PixiSprite> {
  constructor(x: number, y: number, assetId: string, frame?: string) {
    const asset = AssetManager.get(assetId);
    if (asset instanceof Spritesheet) {
      if (!frame) throw new Error("Frame not found");
      const texture = asset.textures[frame];
      if (!texture) throw new Error(`Failed to load texture: ${assetId}`);
      super(
        new PixiSprite({
          x,
          y,
          texture,
          anchor: { x: 0.5, y: 0.5 },
        }),
      );
    } else if (asset instanceof Texture) {
      super(
        new PixiSprite({
          x,
          y,
          texture: asset,
          anchor: { x: 0.5, y: 0.5 },
        }),
      );
    } else {
      throw new Error(`Invalid asset type: ${assetId}`);
    }
  }
}

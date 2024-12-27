import {
  AtlasAttachmentLoader,
  SkeletonBinary,
  SkeletonData,
  SkeletonJson,
  SpineTexture,
  TextureAtlas,
} from "@pixi/spine-pixi";
import { CanvasSource, Spritesheet, SpritesheetData, Texture } from "pixi.js";

const audioContext =
  new (window.AudioContext || (window as any).webkitAudioContext)();
["mousedown", "touchend"].forEach((event) =>
  window.addEventListener(event, () => audioContext.resume())
);

class AssetManager {
  private assets: Record<
    string,
    Texture | AudioBuffer | Spritesheet | SkeletonData
  > = {};

  public async load(sources: {
    [id: string]: { type: "image" | "audio"; src: string } | {
      type: "spritesheet";
      src: string;
      atlas: {
        frames: {
          [frameId: string]: { x: number; y: number; w: number; h: number };
        };
        animations: {
          [animationId: string]: string[];
        };
      };
    } | {
      type: "spine";
      atlas: string;
      skel?: string;
      json?: string;
      png: Record<string, string> | string;
    };
  }, onProgress?: (percent: number) => void) {
    const sourcesCount = Object.keys(sources).length;
    let loadedCount = 0;

    const promises = Object.entries(sources).map(async ([id, source]) => {
      if (this.assets[id]) {
        throw new Error(`Asset already exists: ${id}`);
      }
      if (source.type === "image") {
        this.assets[id] = await this.loadImage(source.src);
      } else if (source.type === "audio") {
        this.assets[id] = await this.loadAudio(source.src);
      } else if (source.type === "spritesheet") {
        this.assets[id] = await this.loadSpritesheet(source.src, source.atlas);
      } else if (source.type === "spine") {
        this.assets[id] = await this.loadSpine(source);
      }
      if (onProgress) {
        loadedCount++;
        onProgress(loadedCount / sourcesCount * 100);
      }
    });
    await Promise.all(promises);
  }

  private async loadImage(src: string) {
    return new Promise<Texture>((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.crossOrigin = "anonymous";

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext("2d");
        if (!context) throw new Error("Failed to get 2d context");

        context.drawImage(image, 0, 0);

        const source = new CanvasSource({ resource: canvas });
        resolve(new Texture({ source }));

        canvas.remove();
      };

      image.onerror = (event) => {
        console.error(`Failed to load texture: ${src}`);
        reject(event);
      };
    });
  }

  private async loadAudio(src: string) {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  }

  private async loadSpritesheet(src: string, atlas: {
    frames: {
      [frameId: string]: { x: number; y: number; w: number; h: number };
    };
    animations: {
      [animationId: string]: string[];
    };
  }) {
    const spritesheetData: SpritesheetData = {
      frames: {},
      meta: { scale: 1 },
      animations: atlas.animations,
    };
    for (const [frameId, frameData] of Object.entries(atlas.frames)) {
      spritesheetData.frames[frameId] = { frame: frameData };
    }
    const texture = await this.loadImage(src);
    const spritesheet = new Spritesheet(texture, spritesheetData);
    await spritesheet.parse();
    return spritesheet;
  }

  private async loadSpine(source: {
    atlas: string;
    skel?: string;
    json?: string;
    png: Record<string, string> | string;
  }) {
    const textAtlasData = await this.loadText(source.atlas);
    let skeletonBynary: Uint8Array | undefined;
    let textSkeletonData: string | undefined;

    if (source.skel !== undefined) {
      skeletonBynary = await this.loadBinary(source.skel);
    } else if (source.json !== undefined) {
      textSkeletonData = await this.loadText(source.json);
    } else {
      throw new Error("Either skel or json must be provided");
    }

    let texture: Texture | undefined;
    let textures: Record<string, Texture> | undefined;

    if (typeof source.png === "string") {
      texture = await this.loadImage(source.png);
    } else {
      textures = {};
      for (const [key, path] of Object.entries(source.png)) {
        textures[key] = await this.loadImage(path);
      }
    }

    const atlas = new TextureAtlas(textAtlasData);
    atlas.pages.forEach((page) => {
      if (texture) page.setTexture(SpineTexture.from(texture.source));
      else if (textures) {
        page.setTexture(SpineTexture.from(textures[page.name].source));
      }
    });

    const atlasLoader = new AtlasAttachmentLoader(atlas);

    let skeletonData: SkeletonData;
    if (skeletonBynary) {
      const binaryLoader = new SkeletonBinary(atlasLoader);
      skeletonData = binaryLoader.readSkeletonData(skeletonBynary);
    } else if (textSkeletonData) {
      const jsonLoader = new SkeletonJson(atlasLoader);
      skeletonData = jsonLoader.readSkeletonData(textSkeletonData);
    } else {
      throw new Error("Either skel or json must be provided");
    }

    return skeletonData;
  }

  private async loadText(src: string) {
    const response = await fetch(src);
    return await response.text();
  }

  private async loadBinary(src: string) {
    const response = await fetch(src);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  public get(
    id: string,
  ): Texture | AudioBuffer | Spritesheet | SkeletonData | undefined {
    return this.assets[id];
  }
}

export default new AssetManager();

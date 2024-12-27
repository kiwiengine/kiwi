import { SkeletonData } from "@pixi/spine-pixi";
import { Spritesheet, SpritesheetData, Texture } from "pixi.js";
declare class AssetManager {
    private assets;
    load(sources: {
        [id: string]: {
            type: "image" | "audio";
            src: string;
        } | {
            type: "spritesheet";
            src: string;
            atlas: SpritesheetData;
        } | {
            type: "spine";
            atlas: string;
            skel?: string;
            json?: string;
            png: Record<string, string> | string;
        };
    }): Promise<void>;
    private loadImage;
    private loadAudio;
    private loadSpritesheet;
    private loadSpine;
    private loadText;
    private loadBinary;
    get(id: string): Texture | AudioBuffer | Spritesheet | SkeletonData | undefined;
}
declare const _default: AssetManager;
export default _default;
//# sourceMappingURL=AssetManager.d.ts.map
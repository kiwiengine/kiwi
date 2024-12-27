declare class AssetManager {
    private assets;
    load(sources: {
        [id: string]: {
            type: "image" | "audio";
            src: string;
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
    private loadSpine;
    private loadText;
    private loadBinary;
}
declare const _default: AssetManager;
export default _default;
//# sourceMappingURL=AssetManager.d.ts.map
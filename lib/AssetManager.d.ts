declare class AssetManager {
    load(...assets: ({
        id: string;
        src: string;
        type?: "image" | "audio";
    } | {
        id: string;
        atlas: string;
        skel?: string;
        json?: string;
        png: Record<string, string> | string;
        type?: "spine";
    })[]): Promise<void>;
}
declare const _default: AssetManager;
export default _default;
//# sourceMappingURL=AssetManager.d.ts.map
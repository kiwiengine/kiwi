import GameObject from "./GameObject.js";
export default class Sprite {
    parent: GameObject | undefined;
    private pixiSprite;
    constructor(x: number, y: number, assetId: string, frame?: string);
    _systemUpdate(): void;
    remove(): void;
}
//# sourceMappingURL=Sprite.d.ts.map
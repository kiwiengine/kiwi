import { Spine as PixiSpine } from "@pixi/spine-pixi";
import GameObject from "./GameObject.js";
export default class SpineAnimation {
    private options;
    pixiObject: PixiSpine;
    parent: GameObject | undefined;
    private _animation;
    private _skins;
    constructor(x: number, y: number, assetId: string, options: {
        animation: string;
        skins?: string[];
        loop?: boolean;
    });
    set animation(animation: string | undefined);
    get animation(): string | undefined;
    set skins(skins: string[]);
    get skins(): string[];
    _systemUpdate(): void;
}
//# sourceMappingURL=SpineAnimation.d.ts.map
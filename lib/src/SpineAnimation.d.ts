import { Spine as PixiSpine } from "@pixi/spine-pixi";
import DrawingObject from "./DrawingObject.js";
export default class SpineAnimation extends DrawingObject<PixiSpine> {
    private options;
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
}
//# sourceMappingURL=SpineAnimation.d.ts.map
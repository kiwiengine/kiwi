import { Spine as PixiSpine } from "@pixi/spine-pixi";
import DrawingObject from "./DrawingObject.js";
interface SpineAnimationOptions {
    animation: string;
    skins?: string[];
    loop?: boolean;
    onAnimationEnd?: (animation: string) => void;
}
export default class SpineAnimation extends DrawingObject<PixiSpine> {
    private _animation;
    private _skins;
    private options;
    constructor(x: number, y: number, assetId: string, options: SpineAnimationOptions);
    set animation(animation: string | undefined);
    get animation(): string | undefined;
    set skins(skins: string[]);
    get skins(): string[];
}
export {};
//# sourceMappingURL=SpineAnimation.d.ts.map
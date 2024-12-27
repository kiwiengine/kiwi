import { GameObjectChild } from "./GameObject.js";
export default class GameCanvas {
    private canvasContainer;
    private width;
    private height;
    private renderer;
    private rootObject;
    constructor(canvasContainer: HTMLElement, width: number, height: number, ...children: GameObjectChild[]);
    private createRenderer;
}
//# sourceMappingURL=GameCanvas.d.ts.map
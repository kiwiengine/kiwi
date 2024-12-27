import { GameObjectChild } from "./GameObject.js";
export default class GameScreen {
    private canvasContainer;
    private width;
    private height;
    private renderer;
    private rootObject;
    constructor(canvasContainer: HTMLElement, width: number, height: number, ...children: GameObjectChild[]);
    private createRenderer;
    add(...children: GameObjectChild[]): void;
}
//# sourceMappingURL=GameCanvas.d.ts.map
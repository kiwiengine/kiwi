import { GameObjectChild } from "./GameObject.js";
export default class GameScreen {
    private container;
    private width;
    private height;
    private renderer;
    private rootObject;
    constructor(container: HTMLElement, width: number, height: number, ...objects: GameObjectChild[]);
    private createRenderer;
    add(...objects: GameObjectChild[]): void;
}
//# sourceMappingURL=GameScreen.d.ts.map
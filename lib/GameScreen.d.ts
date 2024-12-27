import { GameObjectChild } from "./GameObject.js";
export default class GameScreen {
    private container;
    width: number;
    height: number;
    private renderer;
    private rootObject;
    private animationInterval;
    private targetFPS;
    private actualFPS;
    constructor(container: HTMLElement, width: number, height: number, ...objects: GameObjectChild[]);
    private createRenderer;
    private update;
    private lastFrameTime;
    private accumulatedTime;
    private animate;
    add(...objects: GameObjectChild[]): void;
    get left(): number;
    get top(): number;
    remove(): void;
}
//# sourceMappingURL=GameScreen.d.ts.map
declare class InputManager {
    onMouseDown(handler: (x: number, y: number) => void): void;
    onMouseMove(handler: (x: number, y: number) => void): void;
    onMouseUp(handler: (x: number, y: number) => void): void;
    onTouchStart(handler: (x: number, y: number) => void): void;
    onTouchMove(handler: (x: number, y: number) => void): void;
    onTouchEnd(handler: (x: number, y: number) => void): void;
    onKeyDown(handler: (key: string) => void): void;
    onKeyUp(handler: (key: string) => void): void;
    onWindowResize(handler: (width: number, height: number) => void): void;
}
declare const _default: InputManager;
export default _default;
//# sourceMappingURL=InputManager.d.ts.map
class InputManager {
    onMouseDown(handler) {
        window.addEventListener("mousedown", (e) => handler(e.clientX, e.clientY));
    }
    onMouseMove(handler) {
        window.addEventListener("mousemove", (e) => handler(e.clientX, e.clientY));
    }
    onMouseUp(handler) {
        window.addEventListener("mouseup", (e) => handler(e.clientX, e.clientY));
    }
    onTouchStart(handler) {
        window.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            handler(touch.clientX, touch.clientY);
        });
    }
    onTouchMove(handler) {
        window.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            handler(touch.clientX, touch.clientY);
        });
    }
    onTouchEnd(handler) {
        window.addEventListener("touchend", (e) => {
            const touch = e.changedTouches[0];
            handler(touch.clientX, touch.clientY);
        });
    }
    onKeyDown(handler) {
        window.addEventListener("keydown", (e) => handler(e.key));
    }
    onKeyUp(handler) {
        window.addEventListener("keyup", (e) => handler(e.key));
    }
    onWindowResize(handler) {
        window.addEventListener("resize", () => handler(window.innerWidth, window.innerHeight));
    }
}
export default new InputManager();
//# sourceMappingURL=InputManager.js.map
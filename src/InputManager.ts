class InputManager {
  public onMouseDown(handler: (x: number, y: number) => void): void {
    window.addEventListener("mousedown", (e) => handler(e.clientX, e.clientY));
  }

  public onMouseMove(handler: (x: number, y: number) => void): void {
    window.addEventListener("mousemove", (e) => handler(e.clientX, e.clientY));
  }

  public onMouseUp(handler: (x: number, y: number) => void): void {
    window.addEventListener("mouseup", (e) => handler(e.clientX, e.clientY));
  }

  public onTouchStart(handler: (x: number, y: number) => void): void {
    window.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      handler(touch.clientX, touch.clientY);
    });
  }

  public onTouchMove(handler: (x: number, y: number) => void): void {
    window.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      handler(touch.clientX, touch.clientY);
    });
  }

  public onTouchEnd(handler: (x: number, y: number) => void): void {
    window.addEventListener("touchend", (e) => {
      const touch = e.changedTouches[0];
      handler(touch.clientX, touch.clientY);
    });
  }

  public onKeyDown(handler: (key: string) => void): void {
    window.addEventListener("keydown", (e) => handler(e.key));
  }

  public onKeyUp(handler: (key: string) => void): void {
    window.addEventListener("keyup", (e) => handler(e.key));
  }

  public onWindowResize(
    handler: (width: number, height: number) => void,
  ): void {
    window.addEventListener(
      "resize",
      () => handler(window.innerWidth, window.innerHeight),
    );
  }
}

export default new InputManager();

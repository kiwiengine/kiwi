export default class DrawingObject {
    pixiObject;
    parent;
    constructor(pixiObject) {
        this.pixiObject = pixiObject;
    }
    get x() {
        return this.pixiObject.x;
    }
    set x(x) {
        this.pixiObject.x = x;
    }
    get y() {
        return this.pixiObject.y;
    }
    set y(y) {
        this.pixiObject.y = y;
    }
    get zIndex() {
        return this.pixiObject.zIndex;
    }
    set zIndex(zIndex) {
        this.pixiObject.zIndex = zIndex;
    }
    get scaleX() {
        return this.pixiObject.scale.x;
    }
    set scaleX(scaleX) {
        this.pixiObject.scale.x = scaleX;
    }
    get scaleY() {
        return this.pixiObject.scale.y;
    }
    set scaleY(scaleY) {
        this.pixiObject.scale.y = scaleY;
    }
    set scale(scale) {
        this.pixiObject.scale = scale;
    }
    get scale() {
        return this.pixiObject.scale.x;
    }
    get pivotX() {
        return this.pixiObject.pivot.x;
    }
    set pivotX(pivotX) {
        this.pixiObject.pivot.x = pivotX;
    }
    get pivotY() {
        return this.pixiObject.pivot.y;
    }
    set pivotY(pivotY) {
        this.pixiObject.pivot.y = pivotY;
    }
    get rotation() {
        return this.pixiObject.rotation;
    }
    set rotation(rotation) {
        this.pixiObject.rotation = rotation;
    }
    get alpha() {
        return this.pixiObject.alpha;
    }
    set alpha(alpha) {
        this.pixiObject.alpha = alpha;
    }
    _systemUpdate(deltaTime) { }
    remove() {
        this.pixiObject.destroy();
    }
}
//# sourceMappingURL=DrawingObject.js.map
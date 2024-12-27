export default class GameObject {
    container;
    parent;
    children = [];
    globalTransform = {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        alpha: 1,
    };
    constructor(container) {
        this.container = container;
    }
    get x() {
        return this.container.x;
    }
    set x(x) {
        this.container.x = x;
    }
    get y() {
        return this.container.y;
    }
    set y(y) {
        this.container.y = y;
    }
    get zIndex() {
        return this.container.zIndex;
    }
    set zIndex(zIndex) {
        this.container.zIndex = zIndex;
    }
    get scaleX() {
        return this.container.scale.x;
    }
    set scaleX(scaleX) {
        this.container.scale.x = scaleX;
    }
    get scaleY() {
        return this.container.scale.y;
    }
    set scaleY(scaleY) {
        this.container.scale.y = scaleY;
    }
    get pivotX() {
        return this.container.pivot.x;
    }
    set pivotX(pivotX) {
        this.container.pivot.x = pivotX;
    }
    get pivotY() {
        return this.container.pivot.y;
    }
    set pivotY(pivotY) {
        this.container.pivot.y = pivotY;
    }
    get rotation() {
        return this.container.rotation;
    }
    set rotation(rotation) {
        this.container.rotation = rotation;
    }
    get alpha() {
        return this.container.alpha;
    }
    set alpha(alpha) {
        this.container.alpha = alpha;
    }
    add(...children) {
        for (const child of children) {
            if (child.parent) {
                child.parent.children.splice(child.parent.children.indexOf(child), 1);
            }
            this.children.push(child);
            child.parent = this;
            this.container.addChild(child.container);
        }
    }
    update(deltaTime) { }
    _systemUpdate(deltaTime) {
        this.update(deltaTime);
        if (this.parent) {
            const pt = this.parent.globalTransform;
            const rx = this.x * pt.scaleX;
            const ry = this.y * pt.scaleY;
            const pCos = Math.cos(pt.rotation);
            const pSin = Math.sin(pt.rotation);
            this.globalTransform.scaleX = pt.scaleX * this.scaleX;
            this.globalTransform.scaleY = pt.scaleY * this.scaleY;
            const pivotX = this.pivotX * this.globalTransform.scaleX;
            const pivotY = this.pivotY * this.globalTransform.scaleY;
            const cos = Math.cos(this.rotation);
            const sin = Math.sin(this.rotation);
            this.globalTransform.x = pt.x +
                (rx * pCos - ry * pSin) -
                (pivotX * cos - pivotY * sin);
            this.globalTransform.y = pt.y +
                (rx * pSin + ry * pCos) -
                (pivotX * sin + pivotY * cos);
            this.globalTransform.rotation = pt.rotation + this.rotation;
            this.globalTransform.alpha = pt.alpha * this.alpha;
        }
        for (const child of this.children) {
            child._systemUpdate(deltaTime);
        }
    }
    remove() {
        this.container.destroy();
        if (this.parent) {
            this.parent.children.splice(this.parent.children.indexOf(this), 1);
        }
    }
}
//# sourceMappingURL=GameObject.js.map
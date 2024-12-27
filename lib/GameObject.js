import { Container } from "pixi.js";
import DrawingObject from "./DrawingObject.js";
export default class GameObject extends DrawingObject {
    children = [];
    globalTransform = {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        alpha: 1,
    };
    constructor(x, y, ...children) {
        super(new Container({ x, y }));
        this.add(...children);
    }
    add(...children) {
        for (const child of children) {
            if (child.parent) {
                child.parent.children.splice(child.parent.children.indexOf(child), 1);
            }
            this.children.push(child);
            child.parent = this;
            this.pixiObject.addChild(child.pixiObject);
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
        super.remove();
        if (this.parent) {
            this.parent.children.splice(this.parent.children.indexOf(this), 1);
        }
    }
}
//# sourceMappingURL=GameObject.js.map
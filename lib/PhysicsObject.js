import Matter from "matter-js";
import GameObject from "./GameObject.js";
export default class PhysicsObject extends GameObject {
    matterBody;
    constructor(x, y, rigidbody, ...children) {
        super(x, y, ...children);
        if (rigidbody.type === "rectangle") {
            this.matterBody = Matter.Bodies.rectangle(x + rigidbody.x, y + rigidbody.y, rigidbody.width, rigidbody.height, { mass: rigidbody.mass, isStatic: rigidbody.isStatic });
        }
        else if (rigidbody.type === "circle") {
            this.matterBody = Matter.Bodies.circle(x + rigidbody.x, y + rigidbody.y, rigidbody.radius, { mass: rigidbody.mass, isStatic: rigidbody.isStatic });
        }
        else {
            throw new Error("Unsupported collider type");
        }
    }
    get x() {
        return this.pixiObject.x;
    }
    set x(value) {
        this.pixiObject.x = value;
        Matter.Body.setPosition(this.matterBody, {
            x: value,
            y: this.matterBody.position.y,
        });
    }
    get y() {
        return this.pixiObject.y;
    }
    set y(value) {
        this.pixiObject.y = value;
        Matter.Body.setPosition(this.matterBody, {
            x: this.matterBody.position.x,
            y: value,
        });
    }
    get rotation() {
        return this.pixiObject.rotation;
    }
    set rotation(value) {
        this.pixiObject.rotation = value;
        Matter.Body.setAngle(this.matterBody, value);
    }
    get isStatic() {
        return this.matterBody.isStatic;
    }
    set isStatic(value) {
        this.matterBody.isStatic = value;
    }
    applyForce(x, y) {
        Matter.Body.applyForce(this.matterBody, this.matterBody.position, { x, y });
    }
    _systemUpdate(deltaTime) {
        this.x = this.matterBody.position.x;
        this.y = this.matterBody.position.y;
        this.rotation = this.matterBody.angle;
        super._systemUpdate(deltaTime);
    }
}
//# sourceMappingURL=PhysicsObject.js.map
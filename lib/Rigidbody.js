import Matter from "matter-js";
import GameObject from "./GameObject.js";
export default class Rigidbody extends GameObject {
    rigidBody;
    constructor(x, y, collider) {
        super(x, y);
        if (collider.type === "rectangle") {
            this.rigidBody = Matter.Bodies.rectangle(x + collider.x, y + collider.y, collider.width, collider.height, { isStatic: collider.isStatic });
        }
        else if (collider.type === "circle") {
            this.rigidBody = Matter.Bodies.circle(x + collider.x, y + collider.y, collider.radius, { isStatic: collider.isStatic });
        }
        else {
            throw new Error("Unsupported collider type");
        }
    }
    _systemUpdate(deltaTime) {
        this.x = this.rigidBody.position.x;
        this.y = this.rigidBody.position.y;
        this.rotation = this.rigidBody.angle;
        super._systemUpdate(deltaTime);
    }
}
//# sourceMappingURL=Rigidbody.js.map
import Matter from "matter-js";
import GameObject from "./GameObject.js";
interface RectangleRigidbody {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
    isStatic?: boolean;
}
interface CircleRigidbody {
    type: "circle";
    x: number;
    y: number;
    radius: number;
    isStatic?: boolean;
}
export default class PhysicsObject extends GameObject {
    matterBody: Matter.Body;
    constructor(x: number, y: number, rigidbody: RectangleRigidbody | CircleRigidbody);
    _systemUpdate(deltaTime: number): void;
}
export {};
//# sourceMappingURL=PhysicsObject.d.ts.map
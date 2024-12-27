import Matter from "matter-js";
import GameObject from "./GameObject.js";
export default class Rigidbody extends GameObject {
    rigidBody: Matter.Body;
    constructor(x: number, y: number, collider: {
        type: "rectangle";
        x: number;
        y: number;
        width: number;
        height: number;
        isStatic?: boolean;
    } | {
        type: "circle";
        x: number;
        y: number;
        radius: number;
        isStatic?: boolean;
    });
    _systemUpdate(deltaTime: number): void;
}
//# sourceMappingURL=Rigidbody.d.ts.map
import Matter from "matter-js";
import GameObject, { GameObjectChild } from "./GameObject.js";
import PhysicsWorld from "./PhysicsWorld.js";
interface RectangleRigidbody {
    type: "rectangle";
    x: number;
    y: number;
    width: number;
    height: number;
    mass?: number;
    isStatic?: boolean;
}
interface CircleRigidbody {
    type: "circle";
    x: number;
    y: number;
    radius: number;
    mass?: number;
    isStatic?: boolean;
}
export default class PhysicsObject extends GameObject {
    parent: PhysicsWorld | undefined;
    matterBody: Matter.Body;
    constructor(x: number, y: number, rigidbody: RectangleRigidbody | CircleRigidbody, ...children: GameObjectChild[]);
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get rotation(): number;
    set rotation(value: number);
    get isStatic(): boolean;
    set isStatic(value: boolean);
    applyForce(x: number, y: number): void;
    _systemUpdate(deltaTime: number): void;
}
export {};
//# sourceMappingURL=PhysicsObject.d.ts.map
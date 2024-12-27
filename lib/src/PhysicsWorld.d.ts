import GameObject from "./GameObject.js";
import PhysicsObject from "./PhysicsObject.js";
export default class PhysicsWorld extends GameObject<PhysicsObject> {
    private engine;
    constructor(x: number, y: number, ...objects: PhysicsObject[]);
    add(...objects: PhysicsObject[]): void;
    _systemUpdate(deltaTime: number): void;
}
//# sourceMappingURL=PhysicsWorld.d.ts.map
import GameObject from "./GameObject.js";
import Rigidbody from "./Rigidbody.js";
export default class PhysicsWorld extends GameObject<Rigidbody> {
    private engine;
    constructor(x: number, y: number, ...children: Rigidbody[]);
    add(...rigidbodies: Rigidbody[]): void;
    _systemUpdate(deltaTime: number): void;
}
//# sourceMappingURL=PhysicsWorld.d.ts.map
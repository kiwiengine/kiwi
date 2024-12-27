import Matter from "matter-js";
import GameObject from "./GameObject.js";
export default class PhysicsWorld extends GameObject {
    engine = Matter.Engine.create();
    constructor(x, y, ...children) {
        super(x, y, ...children);
    }
    add(...children) {
        for (const child of children) {
            Matter.Composite.add(this.engine.world, child.rigidBody);
        }
        super.add(...children);
    }
    _systemUpdate(deltaTime) {
        Matter.Engine.update(this.engine, (deltaTime > 0.1 ? 0.1 : deltaTime) * 1000);
        super._systemUpdate(deltaTime);
    }
}
//# sourceMappingURL=PhysicsWorld.js.map
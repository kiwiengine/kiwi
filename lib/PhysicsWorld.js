import Matter from "matter-js";
import GameObject from "./GameObject.js";
export default class PhysicsWorld extends GameObject {
    engine = Matter.Engine.create();
    constructor(x, y, ...objects) {
        super(x, y);
        this.add(...objects);
    }
    add(...objects) {
        for (const child of objects) {
            Matter.Composite.add(this.engine.world, child.matterBody);
        }
        super.add(...objects);
    }
    _systemUpdate(deltaTime) {
        Matter.Engine.update(this.engine, (deltaTime > 0.1 ? 0.1 : deltaTime) * 1000);
        super._systemUpdate(deltaTime);
    }
}
//# sourceMappingURL=PhysicsWorld.js.map
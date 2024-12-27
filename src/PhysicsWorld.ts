import Matter from "matter-js";
import GameObject from "./GameObject.js";
import Rigidbody from "./Rigidbody.js";

export default class PhysicsWorld extends GameObject<Rigidbody> {
  private engine = Matter.Engine.create();

  constructor(x: number, y: number, ...children: Rigidbody[]) {
    super(x, y, ...children);
  }

  public add(...rigidbodies: Rigidbody[]): void {
    for (const child of rigidbodies) {
      Matter.Composite.add(this.engine.world, child.rigidBody);
    }
    super.add(...rigidbodies);
  }

  public _systemUpdate(deltaTime: number): void {
    Matter.Engine.update(
      this.engine,
      (deltaTime > 0.1 ? 0.1 : deltaTime) * 1000,
    );
    super._systemUpdate(deltaTime);
  }
}

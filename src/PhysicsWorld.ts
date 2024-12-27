import Matter from "matter-js";
import GameObject from "./GameObject.js";
import PhysicsObject from "./PhysicsObject.js";

export default class PhysicsWorld extends GameObject<PhysicsObject> {
  private engine = Matter.Engine.create();

  constructor(x: number, y: number, ...objects: PhysicsObject[]) {
    super(x, y);
    this.add(...objects);
  }

  public add(...objects: PhysicsObject[]): void {
    for (const child of objects) {
      Matter.Composite.add(this.engine.world, child.matterBody);
    }
    super.add(...objects);
  }

  public _systemUpdate(deltaTime: number): void {
    Matter.Engine.update(
      this.engine,
      (deltaTime > 0.1 ? 0.1 : deltaTime) * 1000,
    );
    super._systemUpdate(deltaTime);
  }
}

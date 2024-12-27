import Matter from "matter-js";
import GameObject from "./GameObject.js";

export default class Rigidbody extends GameObject {
  public rigidBody: Matter.Body;

  constructor(
    x: number,
    y: number,
    collider: {
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
    },
  ) {
    super(x, y);
    if (collider.type === "rectangle") {
      this.rigidBody = Matter.Bodies.rectangle(
        x + collider.x,
        y + collider.y,
        collider.width,
        collider.height,
        { isStatic: collider.isStatic },
      );
    } else if (collider.type === "circle") {
      this.rigidBody = Matter.Bodies.circle(
        x + collider.x,
        y + collider.y,
        collider.radius,
        { isStatic: collider.isStatic },
      );
    } else {
      throw new Error("Unsupported collider type");
    }
  }

  public _systemUpdate(deltaTime: number): void {
    this.x = this.rigidBody.position.x;
    this.y = this.rigidBody.position.y;
    this.rotation = this.rigidBody.angle;
    super._systemUpdate(deltaTime);
  }
}

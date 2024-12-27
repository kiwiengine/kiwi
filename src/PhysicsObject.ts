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
  public matterBody: Matter.Body;

  constructor(
    x: number,
    y: number,
    rigidbody: RectangleRigidbody | CircleRigidbody,
  ) {
    super(x, y);
    if (rigidbody.type === "rectangle") {
      this.matterBody = Matter.Bodies.rectangle(
        x + rigidbody.x,
        y + rigidbody.y,
        rigidbody.width,
        rigidbody.height,
        { isStatic: rigidbody.isStatic },
      );
    } else if (rigidbody.type === "circle") {
      this.matterBody = Matter.Bodies.circle(
        x + rigidbody.x,
        y + rigidbody.y,
        rigidbody.radius,
        { isStatic: rigidbody.isStatic },
      );
    } else {
      throw new Error("Unsupported collider type");
    }
  }

  public _systemUpdate(deltaTime: number): void {
    this.x = this.matterBody.position.x;
    this.y = this.matterBody.position.y;
    this.rotation = this.matterBody.angle;
    super._systemUpdate(deltaTime);
  }
}

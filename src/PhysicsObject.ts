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
  declare public parent: PhysicsWorld | undefined;
  public matterBody: Matter.Body;

  constructor(
    x: number,
    y: number,
    rigidbody: RectangleRigidbody | CircleRigidbody,
    ...children: GameObjectChild[]
  ) {
    super(x, y, ...children);
    if (rigidbody.type === "rectangle") {
      this.matterBody = Matter.Bodies.rectangle(
        x + rigidbody.x,
        y + rigidbody.y,
        rigidbody.width,
        rigidbody.height,
        { mass: rigidbody.mass, isStatic: rigidbody.isStatic },
      );
    } else if (rigidbody.type === "circle") {
      this.matterBody = Matter.Bodies.circle(
        x + rigidbody.x,
        y + rigidbody.y,
        rigidbody.radius,
        { mass: rigidbody.mass, isStatic: rigidbody.isStatic },
      );
    } else {
      throw new Error("Unsupported collider type");
    }
  }

  public get x(): number {
    return this.pixiObject.x;
  }

  public set x(value: number) {
    this.pixiObject.x = value;
    Matter.Body.setPosition(this.matterBody, {
      x: value,
      y: this.matterBody.position.y,
    });
  }

  public get y(): number {
    return this.pixiObject.y;
  }

  public set y(value: number) {
    this.pixiObject.y = value;
    Matter.Body.setPosition(this.matterBody, {
      x: this.matterBody.position.x,
      y: value,
    });
  }

  public get rotation(): number {
    return this.pixiObject.rotation;
  }

  public set rotation(value: number) {
    this.pixiObject.rotation = value;
    Matter.Body.setAngle(this.matterBody, value);
  }

  public get isStatic(): boolean {
    return this.matterBody.isStatic;
  }

  public set isStatic(value: boolean) {
    this.matterBody.isStatic = value;
  }

  public applyForce(x: number, y: number): void {
    Matter.Body.applyForce(this.matterBody, this.matterBody.position, { x, y });
  }

  public _systemUpdate(deltaTime: number): void {
    this.x = this.matterBody.position.x;
    this.y = this.matterBody.position.y;
    this.rotation = this.matterBody.angle;
    super._systemUpdate(deltaTime);
  }
}

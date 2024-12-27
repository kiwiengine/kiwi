import { Container } from "pixi.js";

export default class GameNode<CT extends Container = Container> {
  public parent: GameNode | undefined;
  public children: GameNode[] = [];
  public globalTransform = {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    alpha: 1,
  };

  constructor(private container: CT) {}

  public get x(): number {
    return this.container.x;
  }

  public set x(x: number) {
    this.container.x = x;
  }

  public get y(): number {
    return this.container.y;
  }

  public set y(y: number) {
    this.container.y = y;
  }

  public get zIndex(): number {
    return this.container.zIndex;
  }

  public set zIndex(zIndex: number) {
    this.container.zIndex = zIndex;
  }

  public get scaleX(): number {
    return this.container.scale.x;
  }

  public set scaleX(scaleX: number) {
    this.container.scale.x = scaleX;
  }

  public get scaleY(): number {
    return this.container.scale.y;
  }

  public set scaleY(scaleY: number) {
    this.container.scale.y = scaleY;
  }

  public get pivotX(): number {
    return this.container.pivot.x;
  }

  public set pivotX(pivotX: number) {
    this.container.pivot.x = pivotX;
  }

  public get pivotY(): number {
    return this.container.pivot.y;
  }

  public set pivotY(pivotY: number) {
    this.container.pivot.y = pivotY;
  }

  public get rotation(): number {
    return this.container.rotation;
  }

  public set rotation(rotation: number) {
    this.container.rotation = rotation;
  }

  public get alpha(): number {
    return this.container.alpha;
  }

  public set alpha(alpha: number) {
    this.container.alpha = alpha;
  }

  public add(...nodes: GameNode[]): void {
    for (const node of nodes) {
      if (node.parent) {
        node.parent.children.splice(node.parent.children.indexOf(node), 1);
      }

      this.children.push(node);
      node.parent = this;
      this.container.addChild(node.container);
    }
  }

  public update(deltaTime: number): void {}

  public _systemUpdate(deltaTime: number): void {
    this.update(deltaTime);

    if (this.parent) {
      const pt = this.parent.globalTransform;
      const rx = this.x * pt.scaleX;
      const ry = this.y * pt.scaleY;
      const pCos = Math.cos(pt.rotation);
      const pSin = Math.sin(pt.rotation);

      this.globalTransform.scaleX = pt.scaleX * this.scaleX;
      this.globalTransform.scaleY = pt.scaleY * this.scaleY;

      const pivotX = this.pivotX * this.globalTransform.scaleX;
      const pivotY = this.pivotY * this.globalTransform.scaleY;
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);

      this.globalTransform.x = pt.x +
        (rx * pCos - ry * pSin) -
        (pivotX * cos - pivotY * sin);
      this.globalTransform.y = pt.y +
        (rx * pSin + ry * pCos) -
        (pivotX * sin + pivotY * cos);

      this.globalTransform.rotation = pt.rotation + this.rotation;
      this.globalTransform.alpha = pt.alpha * this.alpha;
    }

    for (const child of this.children) {
      child._systemUpdate(deltaTime);
    }
  }

  public remove(): void {
    this.container.destroy();
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
  }
}

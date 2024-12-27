import { Container } from "pixi.js";
import GameNode from "./GameNode.js";

export default class GameObject extends GameNode {
  constructor(x: number, y: number) {
    super(new Container({ x, y }));
  }
}

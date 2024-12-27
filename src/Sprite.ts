import { Container } from "pixi.js";
import GameNode from "./GameNode.js";

export default class Sprite extends GameNode {
  constructor(x: number, y: number, assetId: string) {
    super(new Container({ x, y }));
  }
}

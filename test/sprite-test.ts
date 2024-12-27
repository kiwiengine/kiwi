import { AssetManager, GameCanvas, Sprite } from "../src";

await AssetManager.load({ cat: { type: "image", src: "assets/cat.png" } });

const canvasContainer = document.getElementById("game-container");
if (!canvasContainer) throw new Error("Game container not found");

new GameCanvas(canvasContainer, 800, 600, new Sprite(0, 0, "cat"));

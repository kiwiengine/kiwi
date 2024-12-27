import { AssetManager, GameScreen, Sprite } from "../src";

await AssetManager.load({ cat: { type: "image", src: "assets/cat.png" } });

const gameContainer = document.getElementById("game-container")!;
const screen = new GameScreen(gameContainer, 800, 600);
screen.add(new Sprite(0, 0, "cat"));

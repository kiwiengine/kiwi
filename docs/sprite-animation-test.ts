import { AssetManager, GameScreen, SpriteAnimation } from "../src";

await AssetManager.load({
  "cat-spritesheet": {
    type: "spritesheet",
    src: "assets/cat-spritesheet.png",
    atlas: {
      frames: {
        walk1: { x: 0, y: 0, w: 32, h: 32 },
        walk2: { x: 32, y: 0, w: 32, h: 32 },
        walk3: { x: 64, y: 0, w: 32, h: 32 },
      },
      animations: {
        walk: ["walk1", "walk2", "walk3"],
      },
    },
  },
});

const container = document.getElementById("game-container")!;
const screen = new GameScreen(container, 800, 600);
const cat = new SpriteAnimation(0, 0, "cat-spritesheet", "walk", 8);
cat.scale = 2;
screen.add(cat);

import { AssetManager, Audio, GameScreen, InputManager } from "../src";

await AssetManager.load({
  bgm: { type: "audio", src: "assets/music.mp3" },
  sfx: { type: "audio", src: "assets/sound.wav" },
});

const container = document.getElementById("game-container")!;
const screen = new GameScreen(container, 800, 600);

// play bgm
new Audio("bgm", 0.5).playLoop();

// play sfx
InputManager.onMouseDown(() => {
  new Audio("sfx", 1).playOnce();
});

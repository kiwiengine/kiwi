import { AssetManager, GameScreen, SpineAnimation } from "../src";

await AssetManager.load({
  spineboy: {
    type: "spine",
    atlas: "assets/spine/spineboy.atlas",
    skel: "assets/spine/spineboy.skel",
    png: "assets/spine/spineboy.png",
  },
});

const container = document.getElementById("game-container")!;
const screen = new GameScreen(container, 800, 600);
const spineboy = new SpineAnimation(0, 0, "spineboy", {
  animation: "run",
  onAnimationEnd: (animation) => {
    if (animation === "run") spineboy.animation = "idle";
  },
});
spineboy.scale = 0.2;
screen.add(spineboy);

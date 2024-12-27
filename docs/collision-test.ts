import {
  AssetManager,
  GameObject,
  GameScreen,
  InputManager,
  Sprite,
} from "../src";

await AssetManager.load({ cat: { type: "image", src: "assets/cat.png" } });

const container = document.getElementById("game-container")!;
const screen = new GameScreen(container, 800, 600);

class Cat extends GameObject {
  constructor(x: number, y: number) {
    super(x, y, new Sprite(0, 0, "cat"));
    this.addCollider({
      type: "rectangle",
      x: 0,
      y: 0,
      width: 60,
      height: 60,
    }).drawColliders(0x00ff00);
  }
}

const cat = new Cat(0, 0);

InputManager.onMouseMove((mouseX, mouseY) => {
  const x = mouseX + window.scrollX - screen.left - screen.width / 2;
  const y = mouseY + window.scrollY - screen.top - screen.height / 2;

  if (cat.checkCollisionWithPoint(x, y)) {
    cat.drawColliders(0xff0000);
  } else {
    cat.drawColliders(0x00ff00);
  }
});

screen.add(cat);

import {
  AssetManager,
  GameScreen,
  InputManager,
  PhysicsObject,
  PhysicsWorld,
  Sprite,
} from "../src";

await AssetManager.load({ cat: { type: "image", src: "assets/cat.png" } });

const container = document.getElementById("game-container")!;
const screen = new GameScreen(container, 800, 600);

class Floor extends PhysicsObject {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, {
      type: "rectangle",
      x: 0,
      y: 0,
      width,
      height,
      isStatic: true,
    });

    this.addCollider({
      type: "rectangle",
      x: 0,
      y: 0,
      width,
      height,
    }).drawColliders(0x00ff00);
  }
}

class Cat extends PhysicsObject {
  constructor(x: number, y: number) {
    super(x, y, {
      type: "circle",
      x: 0,
      y: 0,
      radius: 30,
    }, new Sprite(0, 0, "cat"));

    this.addCollider({
      type: "ellipse",
      x: 0,
      y: 0,
      width: 60,
      height: 60,
    }).drawColliders(0x00ff00);
  }

  public update(deltaTime: number): void {
    if (this.checkCollisionWith(floor)) {
      this.drawColliders(0x0000ff);
    }
  }
}

const cats: Cat[] = [];
const floor = new Floor(0, 300, 800, 100);

let selectedCat: Cat | undefined;

const world = new PhysicsWorld(0, 0, floor);
for (let i = -10; i < 10; i++) {
  for (let j = -10; j < 10; j++) {
    const cat = new Cat(i * 60, j * 60);
    cats.push(cat);
    world.add(cat);
  }
}

let prevMouseX = 0;
let prevMouseY = 0;

InputManager.onMouseDown((mouseX, mouseY) => {
  prevMouseX = mouseX;
  prevMouseY = mouseY;

  const x = mouseX + window.scrollX - screen.left - screen.width / 2;
  const y = mouseY + window.scrollY - screen.top - screen.height / 2;

  for (const cat of cats) {
    if (cat.checkCollisionWithPoint(x, y)) {
      cat.drawColliders(0xff0000);
      cat.isStatic = true;
      selectedCat = cat;
    }
  }
});

InputManager.onMouseMove((mouseX, mouseY) => {
  if (!selectedCat) return;

  const x = mouseX + window.scrollX - screen.left - screen.width / 2;
  const y = mouseY + window.scrollY - screen.top - screen.height / 2;

  selectedCat.x = x;
  selectedCat.y = y;
});

InputManager.onMouseUp((mouseX, mouseY) => {
  if (selectedCat) {
    const velocityX = (mouseX - prevMouseX) * 0.02;
    const velocityY = (mouseY - prevMouseY) * 0.02;

    selectedCat.applyForce(velocityX, velocityY);
    selectedCat.drawColliders(0x00ff00);
    selectedCat.isStatic = false;
    selectedCat = undefined;
  }
});

screen.add(world);

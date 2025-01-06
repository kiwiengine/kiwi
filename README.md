# KiwiEngine

KiwiEngine is a simple and lightweight web game engine.

## Installation

### npm

```bash
npm install kiwiengine
```

### yarn

```bash
yarn add kiwiengine
```

## Usage

```typescript
import { AssetManager, GameCanvas, Sprite } from "kiwiengine";

await AssetManager.load({
  cat: { type: "image", src: "assets/cat.png" },
});

const container = document.getElementById("game-container")!;
const screen = new GameScreen(container, 800, 600);
screen.add(new Sprite(0, 0, "cat"));
```

## API

### `GameCanvas`

```typescript
new GameCanvas(container: HTMLElement, width: number, height: number, ...objects: GameObject[]): GameCanvas
```

- `add(...objects: GameObject[]): void` - Adds game objects to the canvas.
- `remove(): void` - Removes the game canvas.
- `get width(): number` - Returns the width of the game canvas.
- `get height(): number` - Returns the height of the game canvas.
- `get left(): number` - Returns the left coordinate of the game canvas.
- `get top(): number` - Returns the top coordinate of the game canvas.

### `GameObject`

```typescript
new GameObject(x: number, y: number, ...children: GameObject[]): GameObject
```

- `update(deltaTime: number): void` - A method for developers to implement game
  logic.
- `add(...children: GameObject[]): void` - Adds child game objects.
- `remove(): void` - Removes the game object.
- `get parent(): GameObject | undefined` - Returns the parent of this game
  object.
- `get children(): GameObject[]` - Returns the children of this game object.
- `get x(): number` - Gets the x coordinate of the game object.
- `set x(x: number): void` - Sets the x coordinate of the game object.
- `get y(): number` - Gets the y coordinate of the game object.
- `set y(y: number): void` - Sets the y coordinate of the game object.
- `get drawingOrder(): number` - Gets the drawing order of the game object.
- `set drawingOrder(drawingOrder: number): void` - Sets the drawing order of the
  game object.
- `get scale(): number` - Gets the scale of the game object.
- `set scale(scale: number): void` - Sets the scale of the game object.
- `get scaleX(): number` - Gets the x-axis scale of the game object.
- `set scaleX(scaleX: number): void` - Sets the x-axis scale of the game object.
- `get scaleY(): number` - Gets the y-axis scale of the game object.
- `set scaleY(scaleY: number): void` - Sets the y-axis scale of the game object.
- `get pivotX(): number` - Gets the x-axis rotation pivot point of the game
  object.
- `set pivotX(pivotX: number): void` - Sets the x-axis rotation pivot point of
  the game object.
- `get pivotY(): number` - Gets the y-axis rotation pivot point of the game
  object.
- `set pivotY(pivotY: number): void` - Sets the y-axis rotation pivot point of
  the game object.
- `get rotation(): number` - Gets the rotation angle of the game object.
- `set rotation(rotation: number): void` - Sets the rotation angle of the game
  object.
- `get alpha(): number` - Gets the opacity of the game object.
- `set alpha(alpha: number): void` - Sets the opacity of the game object.
- `addCollider(...colliders: Collider[]): void` - Adds colliders to the game
  object.
- `checkCollisionWith(other: GameObject): boolean` - Checks if this game object
  collides with another.
- `checkCollisionWithPoint(x: number, y: number): boolean` - Checks if this game
  object collides with a given point.
- `drawColliders(color: number): void` - Draws the colliders of the game object.

Example:
[Collision Test](https://kiwiengine.github.io/kiwiengine/collision-test.html)

### `AssetManager`

```typescript
await AssetManager.load(sources: {
  [id: string]:
    { type: "image" | "audio", src: string } |
    {
      type: "spritesheet",
      src: string,
      atlas: {
        frames: {
          [frameId: string]: { x: number, y: number, w: number, h: number }
        },
        animations: {
          [animationId: string]: string[]
        }
      }
    } |
    {
      type: "spine",
      atlas: string,
      skel?: string,
      json?: string,
      png: Record<string, string> | string;
    }
}, onProgress?: (percent: number) => void)): void
```

- `load(sources: { [id: string]: { type: "image" | "audio", src: string } }): void`\
  Loads images or audio.
- `load(sources: { [id: string]: { type: "spritesheet", src: string, atlas: { frames: { [frameId: string]: { x: number, y: number, w: number, h: number } }, animations: { [animationId: string]: string[] } } } }): void`\
  Loads sprite sheets.
- `load(sources: { [id: string]: { type: "spine", atlas: string, skel?: string, json?: string, png: Record<string, string> | string } }): void`\
  Loads Spine animations.

### `Sprite`

A sprite is a game object that displays an image on the screen.

```typescript
new Sprite(x: number, y: number, assetId: string): Sprite
```

- `remove(): void` - Removes the sprite from the screen.

Example: [Sprite Test](https://kiwiengine.github.io/kiwiengine/sprite-test.html)

### `SpriteAnimation`

```typescript
new SpriteAnimation(x: number, y: number, assetId: string, animation: string, fps: number): SpriteAnimation
```

- `remove(): void` - Removes the sprite animation from the screen.

Example:
[Sprite Animation Test](https://kiwiengine.github.io/kiwiengine/sprite-animation-test.html)

### `SpineAnimation`

```typescript
new SpineAnimation(x: number, y: number, assetId: string, options: {
  animation: string,
  skins?: string[],
  loop?: boolean,
  onAnimationEnd?: (animation: string) => void
}): SpineAnimation
```

- `set skin(skin: string): void` - Sets the skin of the Spine animation.
- `get skin(): string` - Gets the skin of the Spine animation.
- `set animation(animation: string): void` - Sets the animation of the Spine
  animation.
- `get animation(): string` - Gets the animation of the Spine animation.
- `remove(): void` - Removes the Spine animation from the screen.

Example: [Spine Test](https://kiwiengine.github.io/kiwiengine/spine-test.html)

### `Audio`

```typescript
new Audio(assetId: string, volume: number): Audio
```

- `playOnce(): void` - Plays the audio once.
- `playLoop(): void` - Plays the audio in a loop.
- `stop(): void` - Stops the audio.
- `pause(): void` - Pauses the audio.
- `resume(): void` - Resumes the audio.
- `set volume(volume: number): void` - Sets the volume of the audio.
- `get volume(): number` - Gets the volume of the audio.
- `remove(): void` - Removes the audio.

Example: [Audio Test](https://kiwiengine.github.io/kiwiengine/audio-test.html)

### `InputManager`

```typescript
InputManager.onKeyDown((key: string) => {
  console.log(key);
});
```

- `onMouseDown(callback: (x: number, y: number) => void): void` - Registers a
  callback for when the mouse button is pressed.
- `onMouseMove(callback: (x: number, y: number) => void): void` - Registers a
  callback for when the mouse moves.
- `onMouseUp(callback: (x: number, y: number) => void): void` - Registers a
  callback for when the mouse button is released.
- `onTouchStart(callback: (x: number, y: number) => void): void` - Registers a
  callback for when a touch starts.
- `onTouchMove(callback: (x: number, y: number) => void): void` - Registers a
  callback for when a touch moves.
- `onTouchEnd(callback: (x: number, y: number) => void): void` - Registers a
  callback for when a touch ends.
- `onKeyDown(callback: (key: string) => void): void` - Registers a callback for
  when a key is pressed.
- `onKeyUp(callback: (key: string) => void): void` - Registers a callback for
  when a key is released.
- `onWindowResize(callback: (width: number, height: number) => void): void` -
  Registers a callback for when the window is resized.

### `PhysicsWorld`

```typescript
new PhysicsWorld(x: number, y: number, objects: PhysicsObject[]): PhysicsWorld
```

Example:
[Physics Test](https://kiwiengine.github.io/kiwiengine/physics-test.html)

### `PhysicsObject`

```typescript
new PhysicsObject(x: number, y: number, rigidbody: RigidBody, ...children: GameObject[]): PhysicsObject
```

- `set isStatic(isStatic: boolean): void` - Sets whether the physics object is
  static.
- `get isStatic(): boolean` - Gets whether the physics object is static.
- `applyForce(x: number, y: number): void` - Applies force to the physics
  object.

Example:
[Physics Test](https://kiwiengine.github.io/kiwiengine/physics-test.html)

## License

[MIT](LICENSE)

## Feedback

Please leave feedback in
[Issues](https://github.com/kiwiengine/kiwiengine/issues).

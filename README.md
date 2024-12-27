# 키위엔진

키위엔진은 심플하고 가벼운 웹 게임 엔진입니다.

## 설치

### npm

```bash
npm install kiwiengine
```

### yarn

```bash
yarn add kiwiengine
```

## 사용법

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

- `add(...objects: GameObject[]): void` - 게임 오브젝트를 추가합니다.
- `remove(): void` - 게임 캔버스를 제거합니다.
- `get width(): number` - 게임 캔버스의 너비를 가져옵니다.
- `get height(): number` - 게임 캔버스의 높이를 가져옵니다.
- `get left(): number` - 게임 캔버스의 왼쪽 좌표를 가져옵니다.
- `get top(): number` - 게임 캔버스의 위쪽 좌표를 가져옵니다.

### `GameObject`

```typescript
new GameObject(x: number, y: number, ...children: GameObject[]): GameObject
```

- `update(deltaTime: number): void` - 개발자가 게임 로직을 구현할 수 있는
  메소드입니다.
- `add(...children: GameObject[]): void` - 자식 게임 오브젝트를 추가합니다.
- `remove(): void` - 게임 오브젝트를 제거합니다.
- `get parent(): GameObject | undefined` - 게임 오브젝트의 부모를 가져옵니다.
- `get children(): GameObject[]` - 게임 오브젝트의 자식들을 가져옵니다.
- `get x(): number` - 게임 오브젝트의 x 좌표를 가져옵니다.
- `set x(x: number): void` - 게임 오브젝트의 x 좌표를 설정합니다.
- `get y(): number` - 게임 오브젝트의 y 좌표를 가져옵니다.
- `set y(y: number): void` - 게임 오브젝트의 y 좌표를 설정합니다.
- `get drawingOrder(): number` - 게임 오브젝트의 그리기 순서를 가져옵니다.
- `set drawingOrder(drawingOrder: number): void` - 게임 오브젝트의 그리기 순서를
  설정합니다.
- `get scale(): number` - 게임 오브젝트의 크기를 가져옵니다.
- `set scale(scale: number): void` - 게임 오브젝트의 크기를 설정합니다.
- `get scaleX(): number` - 게임 오브젝트의 x 축 크기를 가져옵니다.
- `set scaleX(scaleX: number): void` - 게임 오브젝트의 x 축 크기를 설정합니다.
- `get scaleY(): number` - 게임 오브젝트의 y 축 크기를 가져옵니다.
- `set scaleY(scaleY: number): void` - 게임 오브젝트의 y 축 크기를 설정합니다.
- `get pivotX(): number` - 게임 오브젝트의 x 축 회전 중심점을 가져옵니다.
- `set pivotX(pivotX: number): void` - 게임 오브젝트의 x 축 회전 중심점을
  설정합니다.
- `get pivotY(): number` - 게임 오브젝트의 y 축 회전 중심점을 가져옵니다.
- `set pivotY(pivotY: number): void` - 게임 오브젝트의 y 축 회전 중심점을
  설정합니다.
- `get rotation(): number` - 게임 오브젝트의 회전 각도를 가져옵니다.
- `set rotation(rotation: number): void` - 게임 오브젝트의 회전 각도를
  설정합니다.
- `get alpha(): number` - 게임 오브젝트의 투명도를 가져옵니다.
- `set alpha(alpha: number): void` - 게임 오브젝트의 투명도를 설정합니다.
- `addCollider(...colliders: Collider[]): void` - 게임 오브젝트에 충돌체를
  추가합니다.
- `checkCollisionWith(other: GameObject): boolean` - 다른 게임 오브젝트와
  충돌했는지 확인합니다.
- `checkCollisionWithPoint(x: number, y: number): boolean` - 지정한 좌표와
  충돌했는지 확인합니다.
- `drawColliders(color: number): void` - 게임 오브젝트의 충돌체를 그립니다.

Example: https://kiwiengine.github.io/kiwiengine/collision-test.html

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

- `load(sources: { [id: string]: { type: "image" | "audio", src: string } }): void` -
  이미지나 오디오를 로드합니다.
- `load(sources: { [id: string]: { type: "spritesheet", src: string, atlas: { frames: { [frameId: string]: { x: number, y: number, w: number, h: number } }, animations: { [animationId: string]: string[] } } } }): void` -
  스프라이트 시트를 로드합니다.
- `load(sources: { [id: string]: { type: "spine", atlas: string, skel?: string, json?: string, png: Record<string, string> | string } }): void` -
  스파인 애니메이션을 로드합니다.

### `Sprite`

스프라이트는 이미지를 화면에 표시하는 게임 오브젝트입니다.

```typescript
new Sprite(x: number, y: number, assetId: string): Sprite
```

- `remove(): void` - 스프라이트를 화면에서 제거합니다.

Example: https://kiwiengine.github.io/kiwiengine/sprite-test.html

### `SpriteAnimation`

```typescript
new SpriteAnimation(x: number, y: number, assetId: string, animation: string, fps: number): SpriteAnimation
```

- `remove(): void` - 스프라이트 애니메이션을 화면에서 제거합니다.

Example: https://kiwiengine.github.io/kiwiengine/sprite-animation-test.html

### `SpineAnimation`

```typescript
new SpineAnimation(x: number, y: number, assetId: string, options: {
  animation: string,
  skins?: string[],
  loop?: boolean,
  onAnimationEnd?: (animation: string) => void
}): SpineAnimation
```

- `set skin(skin: string): void` - 스파인 애니메이션의 스킨을 설정합니다.
- `get skin(): string` - 스파인 애니메이션의 스킨을 가져옵니다.
- `set animation(animation: string): void` - 스파인 애니메이션의 애니메이션을
  설정합니다.
- `get animation(): string` - 스파인 애니메이션의 애니메이션을 가져옵니다.
- `remove(): void` - 스파인 애니메이션을 화면에서 제거합니다.

Example: https://kiwiengine.github.io/kiwiengine/spine-test.html

### `Audio`

```typescript
new Audio(assetId: string, volume: number): Audio
```

- `playOnce(): void` - 오디오를 한 번 재생합니다.
- `playLoop(): void` - 오디오를 반복 재생합니다.
- `stop(): void` - 오디오를 정지합니다.
- `pause(): void` - 오디오를 일시 정지합니다.
- `resume(): void` - 오디오를 재개합니다.
- `set volume(volume: number): void` - 오디오의 볼륨을 설정합니다.
- `get volume(): number` - 오디오의 볼륨을 가져옵니다.
- `remove(): void` - 오디오를 제거합니다.

Example: https://kiwiengine.github.io/kiwiengine/audio-test.html

### `InputManager`

```typescript
InputManager.onKeyDown((key: string) => {
  console.log(key);
});
```

- `onMouseDown(callback: (x: number, y: number) => void): void` - 마우스 버튼이
  눌렸을 때 호출될 콜백을 등록합니다.
- `onMouseMove(callback: (x: number, y: number) => void): void` - 마우스가
  움직일 때 호출될 콜백을 등록합니다.
- `onMouseUp(callback: (x: number, y: number) => void): void` - 마우스 버튼이
  떼어졌을 때 호출될 콜백을 등록합니다.
- `onTouchStart(callback: (x: number, y: number) => void): void` - 터치가 시작될
  때 호출될 콜백을 등록합니다.
- `onTouchMove(callback: (x: number, y: number) => void): void` - 터치가 움직일
  때 호출될 콜백을 등록합니다.
- `onTouchEnd(callback: (x: number, y: number) => void): void` - 터치가 끝날 때
  호출될 콜백을 등록합니다.
- `onKeyDown(callback: (key: string) => void): void` - 키가 눌렸을 때 호출될
  콜백을 등록합니다.
- `onKeyUp(callback: (key: string) => void): void` - 키가 떼어졌을 때 호출될
  콜백을 등록합니다.
- `onWindowResize(callback: (width: number, height: number) => void): void` -
  창의 크기가 변경될 때 호출될 콜백을 등록합니다.

### `PhysicsWorld`

```typescript
new PhysicsWorld(x: number, y: number, objects: PhysicsObject[]): PhysicsWorld
```

Example: https://kiwiengine.github.io/kiwiengine/physics-test.html

### `PhysicsObject`

```typescript
new PhysicsObject(x: number, y: number, rigidbody: RigidBody, ...children: GameObject[]): PhysicsObject
```

- `set isStatic(isStatic: boolean): void` - 물리 오브젝트의 정적 여부를
  설정합니다.
- `get isStatic(): boolean` - 물리 오브젝트의 정적 여부를 가져옵니다.
- `applyForce(x: number, y: number): void` - 물리 오브젝트에 힘을 가합니다.

Example: https://kiwiengine.github.io/kiwiengine/physics-test.html

## 라이센스

[MIT](LICENSE)

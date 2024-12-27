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

### `GameObject`

```typescript
new GameObject(x: number, y: number, ...children: GameObject[]): GameObject
```

- `add(...children: GameObject[]): void` - 자식 게임 오브젝트를 추가합니다.
- `remove(): void` - 게임 오브젝트를 제거합니다.

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
}): void
```

- `load(sources: { [id: string]: { type: "image" | "audio", src: string } }): void` -
  이미지나 오디오를 로드합니다.
- `load(sources: { [id: string]: { type: "spritesheet", src: string, atlas: { frames: { [frameId: string]: { x: number, y: number, w: number, h: number } }, animations: { [animationId: string]: string[] } } } }): void` -
  스프라이트 시트를 로드합니다.
- `load(sources: { [id: string]: { type: "spine", atlas: string, skel?: string, json?: string, png: Record<string, string> | string } }): void` -
  스파인 애니메이션을 로드합니다.

### `InputManager`

```typescript
```

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

### `Audio`

```typescript
```

### `PhysicsWorld`

```typescript
```

### `PhysicsObject`

```typescript
```

## 라이센스

[MIT](LICENSE)

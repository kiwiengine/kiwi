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

const gameContainer = document.getElementById("game-container")!;
const screen = new GameScreen(gameContainer, 800, 600);
screen.add(new Sprite(0, 0, "cat"));
```

## API

### `GameCanvas`

```typescript
```

### `GameObject`

```typescript
```

### `AssetManager`

```typescript
```

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
```

### `SpineAnimation`

```typescript
```

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

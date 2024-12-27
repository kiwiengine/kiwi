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

```typescript
```

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

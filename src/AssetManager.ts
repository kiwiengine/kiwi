class AssetManager {
  public async load(
    ...assets: (
      | { id: string; src: string; type?: "image" | "audio" }
      | {
        id: string;
        atlas: string;
        skel?: string;
        json?: string;
        png: Record<string, string> | string;
        type?: "spine";
      }
    )[]
  ) {
  }
}

export default new AssetManager();

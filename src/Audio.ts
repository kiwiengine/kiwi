import AssetManager, { audioContext } from "./AssetManager.js";

export default class Audio {
  private gainNode: GainNode;
  private source: AudioBufferSourceNode;

  private startTime = 0;
  private pauseTime = 0;
  private offset = 0;

  constructor(assetId: string, volume: number) {
    const asset = AssetManager.get(assetId);
    if (asset instanceof AudioBuffer) {
      this.gainNode = audioContext.createGain();
      this.gainNode.gain.value = volume;
      this.gainNode.connect(audioContext.destination);

      this.source = audioContext.createBufferSource();
      this.source.buffer = asset;
      this.source.connect(this.gainNode);
      this.startTime = audioContext.currentTime;
    } else {
      throw new Error(`Asset ${assetId} is not an audio buffer`);
    }
  }

  public playOnce(): this {
    this.source.loop = false;
    this.source.start(0, this.offset);
    this.source.onended = () => this.remove();
    return this;
  }

  public playLoop(): this {
    this.source.loop = true;
    this.source.start(0, this.offset);
    this.source.onended = null;
    return this;
  }

  public stop(): this {
    this.offset = 0;
    this.source.stop();
    return this;
  }

  public pause(): this {
    this.pauseTime = audioContext.currentTime;
    this.offset += this.pauseTime - this.startTime;
    this.source.stop();
    return this;
  }

  public resume(): this {
    this.startTime = audioContext.currentTime;
    this.source.start(0, this.offset);
    return this;
  }

  public set volume(volume: number) {
    this.gainNode.gain.value = volume;
  }

  public get volume(): number {
    return this.gainNode.gain.value;
  }

  public remove(): void {
    this.source.disconnect();
    this.gainNode.disconnect();
  }
}

export default class Audio {
    private gainNode;
    private source;
    private startTime;
    private pauseTime;
    private offset;
    constructor(assetId: string, volume: number);
    playOnce(): this;
    playLoop(): this;
    stop(): this;
    pause(): this;
    resume(): this;
    set volume(volume: number);
    get volume(): number;
    remove(): void;
}
//# sourceMappingURL=Audio.d.ts.map
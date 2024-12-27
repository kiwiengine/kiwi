import AssetManager, { audioContext } from "./AssetManager.js";
export default class Audio {
    gainNode;
    source;
    startTime = 0;
    pauseTime = 0;
    offset = 0;
    constructor(assetId, volume) {
        const asset = AssetManager.get(assetId);
        if (asset instanceof AudioBuffer) {
            this.gainNode = audioContext.createGain();
            this.gainNode.gain.value = volume;
            this.gainNode.connect(audioContext.destination);
            this.source = audioContext.createBufferSource();
            this.source.buffer = asset;
            this.source.connect(this.gainNode);
            this.startTime = audioContext.currentTime;
        }
        else {
            throw new Error(`Asset ${assetId} is not an audio buffer`);
        }
    }
    playOnce() {
        this.source.loop = false;
        this.source.start(0, this.offset);
        this.source.onended = () => this.remove();
        return this;
    }
    playLoop() {
        this.source.loop = true;
        this.source.start(0, this.offset);
        this.source.onended = null;
        return this;
    }
    stop() {
        this.offset = 0;
        this.source.stop();
        return this;
    }
    pause() {
        this.pauseTime = audioContext.currentTime;
        this.offset += this.pauseTime - this.startTime;
        this.source.stop();
        return this;
    }
    resume() {
        this.startTime = audioContext.currentTime;
        this.source.start(0, this.offset);
        return this;
    }
    set volume(volume) {
        this.gainNode.gain.value = volume;
    }
    get volume() {
        return this.gainNode.gain.value;
    }
    remove() {
        this.source.disconnect();
        this.gainNode.disconnect();
    }
}
//# sourceMappingURL=Audio.js.map
class CreateMusic {
  Ctx: HTMLAudioElement;
  constructor() {
    this.Ctx = new Audio();
  }
  set src(src: string) {
    this.Ctx.src = src;
  }
  setVolume(value: number) {
    if (value >= 0 && value <= 1) {
      this.Ctx.volume = value;
    }
  }
  setCurrentTime(num: number) {
    this.Ctx.currentTime = num;
  }
  play() {
    this.Ctx.play()
  }
  pause() {
    this.Ctx.pause();
  }
  on(eventName: string, fun: () => void) {
    this.Ctx.addEventListener(eventName, fun);
  }
}

const musicP = new CreateMusic();

export default musicP
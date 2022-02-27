export class Timer {
  //pass in callbacks to do something not relevant to timer itself
  constructor(callbacks) {
    if (callbacks) {
      this.onStart = callbacks.onStart
      this.onTick = callbacks.onTick
      this.onComplete = callbacks.onComplete
    }
    this.tick = this._tick.bind(this)
    this.pause = this._pause.bind(this)
  }
  //called by this.start
  _tick() {
    console.log(this.duration, this.timeRemaining)

    if (this.timeRemaining < 1) {
      console.log('timer has done')
      this.pause()
      if (this.onComplete) {
        this.onComplete()
      }
    } else {
      this.timeRemaining = this.timeRemaining - 1
      if (this.onTick) {
        this.onTick(this.duration)
      }
    }
  }

  //handler for start button, take in duration from the
  start(duration) {
    clearInterval(this.interval)
    this.duration = duration
    this.timeRemaining = this.duration
    if (this.onStart) {
      this.onStart()
    }
    this.tick()
    this.interval = setInterval(this.tick, 1000)
  }
  _pause() {
    clearInterval(this.interval)
  }
}

function setInterval(handler, timeout) {
  // mei get timeout call handler
  whenTimeoutHappens {
    handler.apply(window);
  }
}

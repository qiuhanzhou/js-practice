// import { Timer } from './timer.js'

class Timer {
  //pass in callbacks to do something not relevant to timer itself
  constructor(callbacks) {
    if (callbacks) {
      this.onStart = callbacks.onStart
      this.onTick = callbacks.onTick
      this.onComplete = callbacks.onComplete
    }
    this.tick = this._tick.bind(this)
  }
  //called by this.start
  _tick() {
    console.log(this.duration, this.timeRemaining)

    if (this.timeRemaining < 1) {
      console.log('timer has done')
      this._pause()
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

  _version = 1

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
  _pause = () => {
    clearInterval(this.interval)
  }
}

class FancyTimer extends Timer {
  // constructor(callback) {
  //   super(callback)
  // }
  doFancyStuff() {
    console.log('doing now')
  }
}
var fancyTimer = new FancyTimer({ onStart, onComplete, onTick })

const durationInput = document.querySelector('#duration')
const startButton = document.querySelector('#start')
const pauseButton = document.querySelector('#pause')
const circle = document.querySelector('circle')
const perimeter = circle.getAttribute('r') * 2 * Math.PI
circle.setAttribute('stroke-dasharray', perimeter)
let currentOffset = 0
function onStart() {
  console.log('timer started', circle.getAttribute('stroke-dashoffset'))
  circle.setAttribute('stroke-dashoffset', 0)
  currentOffset = 0
}
function onComplete() {
  console.log('timer completed', circle.getAttribute('stroke-dashoffset'))
  circle.setAttribute('stroke-dashoffset', 0)
  currentOffset = 0
}
function onTick(duration) {
  console.log('timer ticked', circle.getAttribute('stroke-dashoffset'))
  circle.setAttribute('stroke-dashoffset', currentOffset - perimeter / duration)
  currentOffset = currentOffset - perimeter / duration
}

const timer = new Timer({ onStart, onComplete, onTick })

startButton.addEventListener('click', () => {
  timer.start(parseFloat(durationInput.value))
})
pauseButton.addEventListener('click', (e) => {
  timer._pause()
})

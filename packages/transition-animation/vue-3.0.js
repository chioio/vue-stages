import * as Vue from 'https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js'

const TransitionApp = {
  data: () => ({
    noActivated: false,
    x: 0,
    y: 0,
    message: 'Hover Me!'
  }),
  methods: {
    xCoordinate(e) {
      this.x = e.clientX
      this.y = e.clientY
    }
  }
}

Vue.createApp(TransitionApp).mount('#transition3')

const GreenSockDemoApp = {
  data: () => ({
    show: false
  }),
  methods: {
    beforeEnter(el) {
      gsap.set(el, {
        scaleX: 0.8,
        scaleY: 1.2
      })
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 1,
        scaleX: 2,
        scaleY: 1,
        x: 150,
        ease: 'elastic.inOut(2.5, 1)',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.7,
        scaleX: 1,
        scaleY: 1,
        x: 300,
        ease: 'elastic.inOut(2.5, 1)'
      })
      gsap.to(el, {
        duration: 0.2,
        delay: 0.5,
        opacity: 0,
        onComplete: done
      })
    }
  }
}

Vue.createApp(GreenSockDemoApp).mount('#green-sock-demo')

const StateTransitionApp = {
  data: () => ({
    number: 0,
    tweenedNumber: 0
  }),
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue })
    }
  }
}

Vue.createApp(StateTransitionApp).mount('#state-trans')

const defaultSides = 10
const stats = Array.apply(null, { length: defaultSides }).map(() => 100)

const DynamicStateTransApp = {
  data: () => ({
    stats: stats,
    points: generatePoints(stats),
    sides: defaultSides,
    minRadius: 50,
    interval: null,
    updateInterval: 500
  }),
  watch: {
    sides(newSides, oldSides) {
      const sidesDifference = newSides - oldSides
      if (sidesDifference > 0) {
        for (let i = 1; i <= sidesDifference; i++) {
          this.stats.push(this.newRandomValue())
        }
      } else {
        let absoluteSidesDifference = Math.abs(sidesDifference)
        for (let i = 1; i <= absoluteSidesDifference; i++) {
          this.stats.shift()
        }
      }
    },
    stats(newStats) {
      gsap.to(this.$data, this.updateInterval / 1000, {
        points: generatePoints(newStats)
      })
    },
    updateInterval() {
      this.resetInterval()
    }
  },
  mounted() {
    this.resetInterval()
  },
  methods: {
    randomizeStats() {
      const vm = this
      this.stats = this.stats.map(() => vm.newRandomValue())
    },
    newRandomValue() {
      return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius))
    },
    resetInterval() {
      const vm = this
      clearInterval(this.interval)
      this.randomizeStats()
      this.interval = setInterval(() => {
        vm.randomizeStats()
      }, this.updateInterval)
    }
  }
}

Vue.createApp(DynamicStateTransApp).mount('#dynamic-state-trans')

function valueToPoint(value, index, total) {
  const x = 0,
    y = -value * 0.9,
    angle = ((Math.PI * 2) / total) * index,
    cos = Math.cos(angle),
    sin = Math.sin(angle),
    tx = x * cos - y * sin + 100,
    ty = x * sin + y * cos + 100

  return { x: tx, y: ty }
}

function generatePoints(stats) {
  const total = stats.length

  return stats
    .map((stat, index) => {
      const point = valueToPoint(stat, index, total)
      return point.x + ',' + point.y
    })
    .join(' ')
}

const AnimatedInteger = {
  template: `<span>{{ fullValue }}</span>`,
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    tweeningValue: 0
  }),
  computed: {
    fullValue() {
      return Math.floor(this.tweeningValue)
    }
  },
  methods: {
    tween(newValue, oldValue) {
      gsap.to(this.$data, {
        duration: 0.5,
        tweeningValue: newValue,
        ease: 'sine'
      })
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(newValue, oldValue)
    }
  },
  mounted() {
    this.tween(this.value, 0)
  }
}

const OrganTransIntoCompApp = {
  data: () => ({
    firstNumber: 20,
    secondNumber: 40
  }),
  components: {
    AnimatedInteger
  },
  computed: {
    result() {
      return this.firstNumber + this.secondNumber
    }
  }
}

Vue.createApp(OrganTransIntoCompApp).mount('#organ-trans-into-comp')

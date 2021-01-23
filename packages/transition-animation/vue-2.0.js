import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

const TransitionApp = new Vue({
  data: () => ({
    show: true,
    isEditing: true,
    docState: 'saved',
    isOn: true,
    view: 'v-a',
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    nextNum: 10
  }),
  components: {
    'v-a': {
      template: '<div class="component-container">Component A</div>'
    },
    'v-b': {
      template: '<div class="component-container">Component B</div>'
    }
  },
  computed: {
    buttonMessage() {
      switch (this.docState) {
        case 'saved':
          return 'Edit'
        case 'edited':
          return 'Save'
        case 'editing':
          return 'Cancel'
      }
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter(el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave(el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(
        el,
        {
          rotateZ: '45deg',
          translateX: '30px',
          translateX: '30px',
          opacity: 0
        },
        { complete: done }
      )
    },
    changeView() {
      this.view = this.view === 'v-a' ? 'v-b' : 'v-a'
    },
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle() {
      this.items = _.shuffle(this.items)
    }
  }
})

TransitionApp.$mount('#transition2')

// Staggered List Demo
new Vue({
  el: '#staggered-list-demo',
  data: {
    query: '',
    list: [
      { msg: 'Bruce Lee' },
      { msg: 'Jackie Chan' },
      { msg: 'Chuck Norris' },
      { msg: 'Jet Li' },
      { msg: 'Kung Fury' }
    ]
  },
  computed: {
    computedList() {
      const _this = this
      return _this.list.filter(
        (item) =>
          item.msg.toLowerCase().indexOf(_this.query.toLowerCase()) !== -1
      )
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      const delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el, { opacity: 1, height: '1.5em' }, { complete: done })
      }, delay)
    },
    leave(el, done) {
      const delay = el.dataset.index * 150
      setTimeout(() => {
        Velocity(el, { opacity: 0, height: 0 }, { complete: done })
      }, delay)
    }
  }
})

// Dynamic Transition
new Vue({
  el: '#dynamic-fade-demo',
  data: {
    show: true,
    isStop: true,
    fadeInDuration: 100,
    fadeOutDuration: 100,
    maxFadeDuration: 2000
  },
  mounted() {
    this.show = false
  },
  methods: {
    changeStats() {
      this.isStop = !this.isStop
      !this.isStop ? (this.show = false) : this.show
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      const _this = this
      Velocity(
        el,
        { opacity: 1 },
        {
          duration: this.fadeInDuration,
          complete: () => {
            done()
            if (!_this.isStop) _this.show = false
          }
        }
      )
    },
    leave(el, done) {
      const _this = this
      Velocity(
        el,
        { opacity: 0 },
        {
          duration: this.fadeOutDuration,
          complete: () => {
            done()
            _this.show = true
          }
        }
      )
    }
  }
})

// Sudoku Demo
new Vue({
  el: '#sudoku-demo',
  data: {
    cells: Array.apply(null, { length: 81 }).map((_, index) => ({
      id: index,
      number: (index % 9) + 1
    }))
  },
  methods: {
    shuffle() {
      this.cells = _.shuffle(this.cells)
    }
  }
})

import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

const mixin = {
  data: () => ({
    message: 'hello',
    foo: 'abc'
  })
}

new Vue({
  el: '#mixins-basic2',
  mixins: [mixin],
  data: () => ({
    message: 'goodbye',
    bar: 'def'
  }),
  created() {
    console.log(this.$data)
  }
})

/**
 * Render Functions & JSX
 */
Vue.component('anchored-heading', {
  render(createElement) {
    return createElement(
      'h' + this.level, // tag name
      this.$slots.default // array of children
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
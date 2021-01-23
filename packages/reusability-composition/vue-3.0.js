import * as Vue from 'https://cdn.jsdelivr.net/npm/vue@3.0.5/dist/vue.esm-browser.js'

/**
 * Mixins Basic
 */
// define a mixin object
const myMixin = {
  // option merge
  data: () => ({
    message: 'hello',
    foo: 'abc'
  }),
  // mixin hook will be called before the component's own hooks
  created() {
    this.hello()
    console.log('mixin hook called')
  },
  // object value will be merged into the same object
  methods: {
    hello() {
      console.log('hello from mixin!')
    },
    foo() {
      console.log('foo')
    },
    conflicting() {
      console.log('from mixin')
    }
  }
}

const MixinsBasicApp = {
  mixins: [myMixin],
  data: () => ({
    message: 'goodbye',
    bar: 'def'
  }),
  created() {
    console.log(this.$data)
    console.log('component hook called')
  },
  methods: {
    bar() {
      console.log('bar')
    },
    // the component's options will take priority when 
    // there are conflicting keys in these objects
    conflicting() {
      console.log('from self')
    }
  }
}

Vue.createApp(MixinsBasicApp).mount('#mixins-basic')

/**
 * Global Mixin
 */
const GlobalMixinApp = Vue.createApp({
  myOption: 'hello'
})

GlobalMixinApp.mixin({
  created() {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

GlobalMixinApp.component('test-component', {
  myOption: 'hello from component!'
})

GlobalMixinApp.mount('#global-mixin')

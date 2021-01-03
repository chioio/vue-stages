import Vue from 'https://unpkg.com/vue@2.6.12/dist/vue.esm.browser.js'

const vm = new Vue({
  data: {
    a: 'Hello World'
  },
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.a)
  }
})

vm.$mount('#app')

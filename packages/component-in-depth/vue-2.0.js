import Vue from 'https://unpkg.com/vue@2.6.12/dist/vue.esm.browser.js'

/**
 * Custom Events
 */
const CustomEventsApp = new Vue({
  data: () => ({
    lovingVue: false,
    isFocus: false,
    inputValue: 'Typing...'
  }),
  methods: {
    onFocus() {
      this.isFocus = true
    },
    onBlur() {
      this.isFocus = false
    }
  }
})

Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <div>
      <input
        id="base-checkbox"
        type="checkbox"
        v-bind:checked="checked"
        v-on:change="$emit('update:checked', $event.target.checked)"
      />
      <label for="base-checkbox">Base Checkbox</label>
    </div>
    `
})

Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners() {
      let vm = this
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit('input', event.target.value)
        }
      })
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      />
    </label>
  `
})

CustomEventsApp.$mount('#custom-events-2')

/**
 * Async Components
 */
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: `<div>I am async!</div>`
    })
  }, 1000)
})

Vue.component(
  'async-webpack-example',
  // function (resolve) {
  //   require(['./my-async-component'], resolve)
  // }
  () => import('./my-async-component')
)

// Handling loading state
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  delay: 200,
  timeout: 3000
})

const AsyncComponentApp = new Vue({})

AsyncComponentApp.$mount('#async-component-2')
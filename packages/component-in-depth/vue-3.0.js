import { createApp } from 'https://unpkg.com/vue@3.0.5/dist/vue.esm-browser.js'

/**
 * Non-Prop Attributes
 */
const NonPropAttributesApp = createApp({
  data: () => ({}),
  methods: {
    showChange(event) {
      // will log a value of the selected option
      console.log(event.target.value)
    },
    changeValue(event) {
      event.target.innerText = 'HELLO'
      console.log(event.target)
    }
  }
})

NonPropAttributesApp.component('date-picker', {
  template: `
    <select>
      <option value="1">Yesterday</option>
      <option value="2">Today</option>
      <option value="3">Tomorrow</option>
    </select>
  `,
  created() {
    console.log(this.$attrs)
  }
})

NonPropAttributesApp.component('date-picker2', {
  inheritAttrs: false,
  template: `
    <div class="date-picker">
      <input type="datetime" v-bind="$attrs" />
    </div>
  `
})

NonPropAttributesApp.component('custom-layout', {
  template: `
    <header>Header</header>
    <main v-bind="$attrs">Content</main>
    <footer>Footer</footer>
  `,
  created() {
    console.log(this.$attrs)
  }
})

NonPropAttributesApp.mount('#non-prop-attributes')


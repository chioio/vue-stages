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


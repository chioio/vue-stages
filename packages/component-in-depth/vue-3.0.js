import {
  createApp,
  computed,
  defineAsyncComponent
} from 'https://unpkg.com/vue@3.0.5/dist/vue.esm-browser.js'

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

/**
 * Custom Events
 */
const CustomEventsApp = createApp({
  data: () => ({
    lovingVue: false,
    bookTitle: 'Book Title',
    firstName: '',
    lastName: '',
    myText: ''
  })
})

CustomEventsApp.component('base-checkbox', {
  props: {
    checked: Boolean
  },
  emits: ['update:checked'],
  template: `
    <input
      id="base-checkbox"
      type="checkbox"
      v-bind="$attrs"
      :checked="checked"
      @change="$emit('update:checked', $event.target.checked)"
    />
    <label for="base-checkbox">Base Checkbox</label>
  `
})

// Validate emitted events
CustomEventsApp.component('custom-form', {
  emits: {
    emits: {
      // No validation
      click: null,
      // Validate submit event
      submit: ({ email, password }) => {
        if (email && password) {
          return true
        } else {
          console.warn('Invalid submit event payload!')
          return false
        }
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { email, password })
    }
  }
})

// `v-model` arguments
CustomEventsApp.component('base-input', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)"
    />
  `
})

// Multiple `v-model` bindings
CustomEventsApp.component('user-name', {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:first-name', 'update:last-name'],
  template: `
    <label for="first-name">First Name: </label>
    <input
      id="first-name"
      type="text"
      :value="firstName"
      @input="$emit('update:first-name', $event.target.value)"
    />
    <br />
    <label for="last-name">Last Name: </label>
    <input
      id="last-name"
      type="text"
      :value="lastName"
      @input="$emit('update:last-name', $event.target.value)"
    />
  `
})

// Custom modifiers
CustomEventsApp.component('my-component', {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:model-value'],
  methods: {
    emitValue(e) {
      let value = e.target.value
      if (this.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:model-value', value)
    }
  },
  template: `
    <label for="custom-modifier">Text Input: </label>
    <input
      id="custom-modifier"
      type="text"
      :value="modelValue"
      @input="emitValue"
    />
  `
  // created() {
  //   console.log(this.modelModifiers)  // { capitalize: true }
  // }
})

CustomEventsApp.mount('#custom-events-3')


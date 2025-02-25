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

/**
 * Custom Directive
 */
const CustomDirectiveApp = Vue.createApp({})

CustomDirectiveApp.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

CustomDirectiveApp.mount('#custom-directive')

const DynamicArgumentDirectiveApp = Vue.createApp({
  data: () => ({
    direction: 'right',
    pinPadding: 200
  })
})

DynamicArgumentDirectiveApp.directive('pin', {
  mounted(el, binding) {
    el.style.position = 'fixed'
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  },
  updated(el, binding) {
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

DynamicArgumentDirectiveApp.mount('#dynamic-arguments-directive')

/**
 * Teleport
 */
const TeleportApp = Vue.createApp({})

TeleportApp.component('modal-button', {
  template: `
    <button @click="modalOpen = true">
      Open full screen modal!
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a modal!
          (My parent is "#tooltips-teleport")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `,
  data: () => ({
    modalOpen: false
  })
})

TeleportApp.component('parent-component', {
  template: `
    <h3>This is a parent component</h3>
    <teleport to="#teleport">
      <child-component name="John" />
    </teleport>
  `
})

TeleportApp.component('child-component', {
  props: ['name'],
  template: `
    <div>Hello, {{ name }}</div>
  `
})

TeleportApp.mount('#teleport')

/**
 * Render Functions
 */
const RenderFuncApp = Vue.createApp({})

/*
RenderFuncApp.component('anchored-heading', {
  render() {
    const { h } = Vue

    return h(
      'h' + this.level, // tag name
      {}, // props/attributes
      this.$slots.default() // array of children
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
*/

/**
 * Recursively get text from children nodes
 */
function getChildrenTextContent(children) {
  return children
    .map((node) => {
      return typeof node.children === 'string'
        ? node.children
        : Array.isArray(node.children)
        ? getChildrenTextContent(node.children)
        : ''
    })
    .join('')
}

RenderFuncApp.component('anchored-heading', {
  render() {
    // create kebab-case id from the text contents
    const headingId = getChildrenTextContent(this.$slots.default())
      .toLowerCase()
      .replace(/\W+/g, '-') // replace non-word characters with dash
      .replace(/(^-|-$)/g, '') // remove leading and trailing dashes

    return Vue.h('h' + this.level, [
      Vue.h(
        'a',
        {
          name: headingId,
          href: '#' + headingId
        },
        this.$slots.default()
      )
    ])
  },
  props: {
    level: {
      type: Number,
      require: true
    }
  }
})

// duplicate the same element/component many times
RenderFuncApp.component('dup-the-same', {
  render() {
    return Vue.h('div', Array.from({ length: 20 }).map(() => {
      return Vue.h('span', ' hi ')
    }))
  }
})

RenderFuncApp.mount('#render-functions')
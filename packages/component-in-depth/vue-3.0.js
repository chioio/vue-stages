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

/**
 * Slots
 */
const TodoButton = {
  template: `
    <button class="btn-primary">
      <slot></slot>
    </button>
  `
}

const SubmitButton = {
  template: `
    <button type="submit">
      <slot>Submit</slot>
    </button>
  `
}

const FontAwesomeIcon = {
  props: {
    name: String
  },
  template: `
    <i :class="'fa fa-' + name"></i>
  `
}

const BaseLayout = {
  template: `
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `
}

const TodoList = {
  data: () => ({
    items: ['Feed a cat', 'Buy milk']
  }),
  template: `
    <ul>
      <li v-for="(item, index) in items">
        <slot 
          :item="item" 
          :index="index" 
          :another-attribute="anotherAttribute"
        ></slot>
      </li>
    </ul>
  `
}

const SlotsApp = {
  data: () => ({}),
  components: {
    TodoButton,
    FontAwesomeIcon,
    SubmitButton,
    BaseLayout,
    TodoList
  }
}

createApp(SlotsApp).mount('#slots')

/**
 * Provide / Inject
 */
const ProvideInjectApp = createApp({})

ProvideInjectApp.component('todo-list', {
  data: () => ({
    todos: ['Feed a cat', 'Buy tickets']
  }),
  provide() {
    return {
      user: 'John Doe',
      // todoLength: this.todos.length
      todoLength: computed(() => this.todos.length)
    }
  },
  template: `
    <div>
      {{ todos.length }}
      <slot></slot>
    </div>
  `
})

ProvideInjectApp.component('todo-list-statistics', {
  inject: ['user', 'todoLength'],
  created() {
    console.log(`Injected user: ${this.user}`)
    console.log(`Injected todo length is ${this.todoLength}`)
  }
})

ProvideInjectApp.mount('#provide-inject')

/**
 * Dynamic & Async Component
 */
const AsyncComp = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      resolve({
        template: `<div>I am async!</div>`
      })
    })
)

const DynamicAsyncComponentApp = createApp({
  data: () => ({
    currentTab: 'Home',
    tabs: ['Home', 'Posts', 'Archive']
  }),
  components: {
    AsyncComp
  },
  computed: {
    currentTabComponent() {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  }
})

DynamicAsyncComponentApp.component('tab-home', {
  template: `<div class="demo-tab">Home Component</div>`
})

DynamicAsyncComponentApp.component('tab-posts', {
  template: `
    <div class="demo-tab dynamic-component-demo-posts-tab">
      <ul class="dynamic-component-demo-posts-sidebar">
        <li
          v-for="post in posts"
          :key="post.id"
          :class="{ 'dynamic-component-demo-active': post === selectedPost }"
          @click="selectedPost = post"
        >{{ post.title }}</li>
      </ul>
      <div class="dynamic-component-demo-post-container">
        <div v-if="selectedPost" class="dynamic-component-demo-post">
          <h3>{{ selectedPost.title }}</h3>
          <div v-html="selectedPost.content"></div>
        </div>
        <strong v-else>
          Click on a blog title to the left to view it.
        </strong>
      </div>
    </div>
  `,
  data: () => ({
    posts: [
      {
        id: 1,
        title: 'Cat Ipsum',
        content:
          '<p>Dont wait for the storm to pass, dance in the rain kick up litter decide to want nothing to do with my owner today demand to be let outside at once, and expect owner to wait for me as i think about it cat cat moo moo lick ears lick paws so make meme, make cute face but lick the other cats. Kitty poochy chase imaginary bugs, but stand in front of the computer screen. Sweet beast cat dog hate mouse eat string barf pillow no baths hate everything stare at guinea pigs. My left donut is missing, as is my right loved it, hated it, loved it, hated it scoot butt on the rug cat not kitten around</p>'
      },
      {
        id: 2,
        title: 'Hipster Ipsum',
        content:
          '<p>Bushwick blue bottle scenester helvetica ugh, meh four loko. Put a bird on it lumbersexual franzen shabby chic, street art knausgaard trust fund shaman scenester live-edge mixtape taxidermy viral yuccie succulents. Keytar poke bicycle rights, crucifix street art neutra air plant PBR&B hoodie plaid venmo. Tilde swag art party fanny pack vinyl letterpress venmo jean shorts offal mumblecore. Vice blog gentrify mlkshk tattooed occupy snackwave, hoodie craft beer next level migas 8-bit chartreuse. Trust fund food truck drinking vinegar gochujang.</p>'
      },
      {
        id: 3,
        title: 'Cupcake Ipsum',
        content:
          '<p>Icing dessert soufflé lollipop chocolate bar sweet tart cake chupa chups. Soufflé marzipan jelly beans croissant toffee marzipan cupcake icing fruitcake. Muffin cake pudding soufflé wafer jelly bear claw sesame snaps marshmallow. Marzipan soufflé croissant lemon drops gingerbread sugar plum lemon drops apple pie gummies. Sweet roll donut oat cake toffee cake. Liquorice candy macaroon toffee cookie marzipan.</p>'
      }
    ],
    selectedPost: null
  })
})

DynamicAsyncComponentApp.component('tab-archive', {
  template: `<div class="demo-tab">Archive Component</div>`
})

DynamicAsyncComponentApp.mount('#dynamic-async-component')

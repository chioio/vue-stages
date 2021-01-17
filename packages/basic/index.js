import * as Vue from 'https://unpkg.com/vue@3.0.5/dist/vue.esm-browser.js'

/**
 * Computed Property
 */
Vue.createApp({
  data: () => ({
    author: {
      name: 'John Doe',
      books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
      ]
    }
  }),
  computed: {
    // Computed property getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    },
    // Due to `Date.now()` is not a reactive dependency,
    // so the following computed property will never update.
    now() {
      return Date.now()
    },
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
}).mount('#computed-basics')

/**
 * Watcher
 */
Vue.createApp({
  data: () => ({
    question: '',
    answer: 'Questions usually contain a question mark. ;-)'
  }),
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      if (newQuestion.indexOf('?') > -1) {
        this.getAnswer()
      }
    }
  },
  methods: {
    getAnswer() {
      this.answer = 'Thinking...'
      axios
        .get('https://yesno.wtf/api')
        .then((response) => {
          this.answer = response.data.answer
        })
        .catch((error) => {
          this.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
}).mount('#watch-example')

/**
 * List Rendering
 */
Vue.createApp({
  data: () => ({
    parentMessage: 'Parent',
    items: [{ message: 'Foo' }, { message: 'Bar' }],
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    },
    numbers: [1, 2, 3, 4, 5],
    sets: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10]
    ]
  }),
  computed: {
    evenNumbers() {
      return this.numbers.filter((number) => number % 2 === 0)
    }
  },
  methods: {
    even(numbers) {
      return numbers.filter((number) => number % 2 === 0)
    }
  }
}).mount('#list-rendering')

/**
 * List Example
 */
const ListExampleApp = Vue.createApp({
  data: () => ({
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes'
      },
      {
        id: 2,
        title: 'Take out the trash'
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  }),
  methods: {
    addNewTodo() {
      this.todos.push({
        is: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

ListExampleApp.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
    </li>
  `,
  props: ['title'],
  emits: ['remove']
})

ListExampleApp.mount('#todo-list')

/**
 * Form Elements
 */
Vue.createApp({
  data: () => ({
    message: '',
    checked: false,
    checkedNames: [],
    picked: '',
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Tow', value: 'B' },
      { text: 'Three', value: 'C' }
    ],
    toggle: 'no',
    radioValue: 'picked',
    pick: 'unpicked',
    msg: 'nothing'
  })
}).mount('#form-input-bindings')

/**
 * Components Basics
 */
const ComponentsBasicsApp = Vue.createApp({
  data: () => ({
    posts: [
      { id: 1, title: 'My journey with Vue', content: '...content...' },
      { id: 2, title: 'Blogging with Vue', content: '...content...' },
      { id: 3, title: 'Why Vue is so fun', content: '...content...' }
    ],
    postFontSize: 1,
    searchText: '',
    currentTab: 'Home',
    tabs: ['Home', 'Posts', 'Archive']
  }),
  computed: {
    currentTabComponent() {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  }
})

ComponentsBasicsApp.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h4>{{ post.title }}</h4>
      <button @click="$emit('enlarge-text', 0.1)">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})

ComponentsBasicsApp.component('custom-input', {
  props: ['modelValue'],
  // Vue 3.0
  emits: ['update:model-value'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:model-value', $event.target.value)"
    />
  `
})

ComponentsBasicsApp.component('custom-input-gsetter', {
  props: ['modelValue'],
  emits: ['update:model-value'],
  template: `<input v-model="value" />`,
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        return this.$emit('update:model-value', value)
      }
    }
  }
})

ComponentsBasicsApp.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})

ComponentsBasicsApp.component('tab-home', {
  template: `<div class="demo-tab">Home component</div>`
})

ComponentsBasicsApp.component('tab-posts', {
  template: `<div class="demo-tab">Posts component</div>`
})

ComponentsBasicsApp.component('tab-archive', {
  template: `<div class="demo-tab">Archive component</div>`
})

ComponentsBasicsApp.mount('#components-basics')

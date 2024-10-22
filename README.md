# Stages of Vue.js learning

## Basic

### Lifecycle (Vue 2.0) ↓

**`new Vue()`**

→	初始化Events & Lifecycle

**`breforeCreate()`**

→	初始化injections & reactivity

**`created()`**

→	vm.$mount(el)	→	编译template到render函数

**`beforeMount()`**

→	创建 vm.$el 并且将其替换到 el

**`mounted()`**

**`beforeUpdate()`**

→	虚拟DOM重新渲染并修正

**`updated()`**

**`beforeDestroy()`**

→	拆除（teardown）侦听器，子组件和event监听器

**`destroyed`**

### Template Syntax

所有的Vue.js的模版都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。

底层的实现上，Vue将模版编译成虚拟DOM渲染函数。

#### Interpolations（插值）

##### Text

"Mustache"语法

```html
<span>Message: {{ msg }}</span>
```

##### Raw HTML

`v-html`指令

```html
<p>
  Using v-html directive: <span v-html="rawHtml"></span>
</p>
```

##### Attribute

`v-bind`指令

```html
<div v-bind:id="dynamicId"></div>
```

对于布尔attribute（它们只要存在就意味着值为`true`

```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果`isButtonDisabled`为`null`、`undefined`或`false`，则`disabled`attribute甚至不会被包含在渲染出来的`<button>`元素中。

##### Using JavaScript Expressions

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}

<div v-bind:id="'list' + id"></div>
```

每个绑定都只能包含**单个表达式**

#### Detectives

指令时带有`v-`的前缀的特殊attribute。指令attribute的值预期是**单个JavaScript表达式**（`v-for`是例外情况）。指令职责是响应式地作用于DOM。

##### Arguments

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。

##### Dynamic Arguments（>=2.6.0）

使用方括号括起来的JavaScript表达式作为一个指令的参数：

```html
<!-- 动态属性 -->
<a v-bind:[attributeName]="url"> ... </a>
<!-- 动态事件 -->
<a v-on:[eventName]="doSomething"> ... </a>
```

##### Modifiers

修饰符是以半角句号`.`指明的特殊后缀，用于之处一个指令应该以特殊方式绑定。

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

#### Shorthands

##### `v-bind` shorthand

```html
<!-- full syntax -->
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>
```

##### `v-on` shorthand

```html
<!-- full syntax -->
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>
<!-- shorthand with dynamic argument -->
<a @[event]="doSomething"> ... </a>
```



### Computed Properties & Watchers

#### Computed Properties

对于复杂的逻辑，应当使用**计算属性**

##### Basic Example

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
// Vue 3.0
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}).mount('#computed-basics')
```

##### Computted Caching vs Methods

计算属性和方法的结果相同，但**计算属性是基于它们的响应式依赖进行缓存的**。

每当触发重新渲染时，调用方法将**总会**再次执行函数。

##### Computed Setter

计算属性默认只有 **getter** ，但我们可以在需要的时候提供 **setter** 。

#### Watchers

当需要在数据变化时执行异步或开销较大的操作时，watcher 很有用。



### Class and Style

#### Class

```html
<!-- Object Syntax -->
<div 
	class="static"
  v-bind:class="{active: isActive, 'text-danger': hasError }"
></div>

<!-- Array Syntax -->
<div v-bind:class="[activeClass, errorClass]"></div>
```

#### Style

```html
<!-- Object Syntax -->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<!-- Array Syntax -->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```



### Conditional Rendering

#### `v-if` Detective

#### `v-else-if` Detective

#### `v-else	` Detective

#### Using `key` to Manage Resuable Elements

为元素添加 `key` 属性可以让元素完全独立，Vue渲染元素将不会复用它们。

#### `v-show` Detective

与 `v-if` 不同的是 `v-show` 元素始终会被渲染并保留 DOM 中；只是简单的切换元素的 CSS `display` 属性。

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

#### Using `v-if` and `v-for` Together

**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。**

一起使用时，`v-for` 具有比 `v-if` 更高的优先级。



### List Rendering

#### `v-for` Detective

可遍历数组，也可遍历对象属性。

> 遍历对象时，会按 `Object.keys()` 的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致。

#### Array Change Detection

##### Mutation Methods

* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `reverse()`

##### Replacing an Array

* `filter()`
* `concat()`
* `slice()`

非变更方法**总是返回一个新数组**。



### Event Handling

#### Listening to Events

##### `v-on` Detective

通过 `v-on` 指令监听 DOM 事件。

##### Method Event Handlers

通过方法定义解决复杂的事件处理。

##### Methods in Inline Handlers

```html
<div id="inline-handler">
  <button @click="say('hi')">
    Say hi
  </button>
  <button @click="say('what')">
    Say what
  </button>
</div>
```

```js
Vue.createApp({
  methods: {
    say(message) {
      alert(message)
    }
  }
}).mount('#inline-handler')
```

通过 `$event` 传入方法访问原始的 DOM 事件

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn(message, event) {
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

#### Multiple Event Handlers (Vue 3.0)

```html
<!-- both one() and two() execute on button click -->
<button @click="one($event), two($event)">
  Submit
</button>
```

```js
// ...
methods: {
  one(event) {
    // first handler logic...
  },
  two(event) {
    // second handler logic...
  }
}
```

#### Event Modifiers

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。

* `.stop`

  ```html
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>
  ```

* `.prevent`

  ```html
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>
  <!-- 修饰符可以串联 -->
  <a v-on:click.stop.prevent="doThat"></a>
  <!-- 只有修饰符 -->
  <form v-on:submit.prevent></form>
  ```

* `.capture`

  ```html
  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
  <div v-on:click.capture="doThis">...</div>
  ```

* `.self`

  ```html
  <!-- 只当 event.target 是当前元素自身时触发处理函数 -->
  <div v-on:click.self="doThat">...</div>
  ```

* `.once`

  ```html
  <!-- 点击事件将只会触发一次 -->
  <a v-on:click.once="doThis"></a>
  ```

* `.passive`

  ```html
  <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
  <!-- 而不会等待 `onScroll` 完成  -->
  <!-- 这其中包含 `event.preventDefault()` 的情况 -->
  <div v-on:scroll.passive="onScroll">...</div>
  ```

#### Key Modifiers

`@keyup.enter="..."`

`@keyup.page-down="..."`

##### Key Aliases

* `.enter`
* `.tab`
* `.delete` （捕获“删除”和“退格”键）
* `.esc`
* `.space`
* `.up`
* `.down`
* `.left`
* `.right`

通过全局 `.config.keyCodes` 对象自定义按键修饰符别名：

```js
Vue.config.keyCodes.f1 = 112
```

#### System Modifiers Keys

* `.ctrl`
* `.alt`
* `.shift`
* `.meta`

> ⚠️：在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”。

```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

##### `.exact` Modifier

`.exact` 修饰符允许控制由精确的系统修饰符组合触发的事件。

```html

<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

##### Mouse Button Modifiers

* `.left`
* `.right`
* `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮。



### Form Input Bindings

在表单 `<input>`、`<textarea>`、及 `<select>` 元素上使用 `v-model` 创建双向数据绑定。

> `v-model` 会忽略所有表单元素 `value`、`checked`、`selected` 属性的初始值而总是将 Vue 实例的数据作为数据来源。应当在 `data` 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

* text 和 textarea 元素使用 `value` 属性和 `input` 事件；
* checkbox 和 radio 使用 `checked` 属性和 `change` 事件；
* select 字段将 `value` 作为 prop 并将 `change` 作为事件。

> 在文本区域插值（`<textarea>{{text}}</textarea>`）并不会生效，应用（`v-model`）来代替。

#### Modifiers

##### `.lazy`

在 `change` 事件之后进行同步。

##### `.number`

将用户输入的值转为数值类型。

* HTML 输入元素的值总会返回字符串。

##### `.trim`

过滤用户输入的首位空白字符。



### Components Basics

#### `data` Must Be a Function

**一个组件的 `data` 选项必须是一个函数。**

##### Component Retestration Type

注册类型：**全局注册**和**局部注册**

#### Listening to Child Components Events

（Vue 3.0）我们可以在组件的 `emits` 选项中列出发出的事件：

```js
app.component('blog-post', {
	props: ['title'],
	emits: ['enlargeText']
})
```

#### Content Distribution with Slots（插槽）

##### `<slot></slot>`

#### DOM Template Parsing Caveats

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格的限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

```html
<table>
  <!-- 渲染将提升到外部，导致渲染出错 -->
  <blog-post-row></blog-post-row>
</table>

<!-- 变通使用 `is` attribute -->
<table>
  <tr is="blog-post-row"></tr>
</table>
```

以下模版使用将不受这条限制：

* 字符串（`template: '...'`)
* SFC（`.vue`）
* `<script type="text/x-template">`



## Component In-Depth

### Component Registration

#### Component Names

##### With kebab-case

```js
app.component('my-component-name', { /* ... */ })
```

##### With PascalCase

```js
app.component('MyComponentName', { /* ... */ })
```

#### Global Registration

`Vue.component`

#### Local Registration

```js
const ComponentA = {
  /* ... */
}

const ComponentB = {
  /* ... */
}

const ComponentC = {
  /* ... */
}
```

在 `components` 选项中定义想要使用的组件：

```js
const app = Vue.create({
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

**局部注册的组件在其子组件中不可用**。

#### Module Systems

在 **[Vue CLI 3+]()** 中使用 `require.context` 只全局注册非常通用的组件。

`src/main.js` 示例：

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
	// 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
      	.split('/')
      	.pop()
      	.replace(/\.\w+$/, '')
    )
  )
  
  // 全局注册组件
  Vue.component(
  	componentName,
    // 如果组件选项是通过 `export default` 导出的，
    // 就会优先使用 `.default`，否则会退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

全局注册的行为必须在根 Vue 实例（通过 `new Vue`）创建之前发生。



### Props

#### Need `v-bind`

传入数字、布尔值、数组、对象时应当用 `v-bind` 来告诉 Vue 这是一个 JavaScript 表达式，而不是一个字符串。

##### Passing the Properties of an Object

通过使用不带参数的 `v-bind` （取代 `v-bind:prop:name`）将一个对象的所有 property 都作为 prop 传入：

```js
post: {
  id: 1,
    title: 'My Journey with Vue'
}
```

```html
<blog-post v-bind="post"></blog-post>
<!-- 等价于 -->
<blog-post v-bind:id="post.id" v-bind:title="post.title"></blog-post>
```

#### One-Way Data Flow

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级的 prop 的更新会向下流动到子组件中，但是反过来不行。

变更一个 prop 的两种情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。**通过定义本地 data 属性解决：

   ```js
   props: ['initialCounter'],
   data: () => ({
     counter: this.initialCounter
   })
   ```

2. **这个 prop 以一种原始的值传入且需要进行转换。**通过计算属性解决：

   ```js
   props: ['size'],
   computed: {
     normalizedSize() {
       return this.size.trim().toLowerCase()
     }
   }
   ```

#### Prop Validation

`type`, `required`, `default` `validator`

**对象**或**数组**默认值必须从一个工厂函数获取。

自定义验证函数：

```js
props: {
  propObject: {
    type: Object,
    default: () => ({ message: 'hello' })
  },
  propCusValid: {
  	validator: (value) => ['success', 'warning', 'danger'].indexOf(value) !== -1
	}
}
```

> prop 会在一个组件实例创建**之前**进行验证，所以实例的 property（如 `data`、`computed` 等）在 `default` 或 `validator`函数中是**不可用**的。

#### Type Checks

`type` 能够是下列原生构造函数中的任意一个：

* String
* Number
* Boolean
* Array
* Object
* Date
* Function
* Symbol

`type` 还可以是一个自定义的构造函数，并通过 `instanceof` 来进行检查确认。



### Custom Events

#### `$listeners` Property (Vue 2.0)

配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定元素。

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners() {
      let vm = this
      return Object.assign({},
      	this.$listeners,
        {
        	// 确保配合 `v-model` 的工作
        	input(event) {
            vm:$emit('input', event.target.value)
          }
      	}
      )
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
```

#### `.sync`  Modifier

```js
this.$emit('update:title', newTitle)
```

```html
<text-document
	v-bind:title="doc.title"
	v-on:update:title="doc.title = $event"
></text-document>
<!-- 使用 `.sync` 修饰符 -->
<text-document v-bind:title.sync="doc.title"></text-document>
```

> 注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用，只能提供想要绑定的 property 名，类似于 `v-model`。
>
> 将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync="{ title: doc.title }"` 是无效的。

#### Validate Emitted Events (Vue 3.0)

```js
app.component('custom-form', {
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
      this.$emit('submit', { email, passord })
    }
  }
})
```

#### Handling `v-model` Modifiers (Vue 3.0)

##### Custom modifiers

```js
app.component('my-component', {
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
		<input type="text"
			:value="modelValue"
			@input="emitValue"
		/>
	`,
  created() {
		console.log(this.modelModifiers)	// { captialize: true }
  }
})
```

对于 `v-model` 绑定参数，产生的 prop 将会是 `arg + "Modifiers"`：

```html
<my-component v-model:description.captialize="myText"></my-component>
```



### Slots

父级模版里的所有内容都是父级作用域中变异的；子模版里的所有内容都是在子作用域中编译的。

#### Dynamic Slots Name

```html
<base-input>
	<template v-slot:[dynamicSlotName]>...</template>
</base-input>
```

#### Named Slots Shorthand

```html
<base-layout>
  <template #header>
    <h1>
      Here might be a page title
    </h1>
  </template>
  
  <p>
    A paragraph for the main content.
  </p>
  <p>
    And another one.
  </p>
  
  <template #footer>
    <p>
      Here's some content info
    </p>
  </template>
</base-layout>

<current-user #default="{user}">
  {{ user.firstName }}
</current-user>
```

**插槽 prop 允许我们将插槽转换为可复用的模版，这些模版可以基于输入的 prop 渲染出不同的内容。**



### Provide / Inject

父组件通过 `provide` 提供数据，子组件通过 `inject` 选项使用父组件提供的数据。

* 父组件不需要知道哪些子组件使用它提供的 property
* 子组件不需要知道 `inject` property 来自哪里



### Dynamic & Async Components

#### Dynamic Component

`keep-alive`

#### Async Component (Vue 3.0)

* 通过 `defineAsyncComponent` 定义异步组件
* 结合 webpack 通过（工厂函数返回一个 `Promise`） `import('component')` 导入

#### Using with Suspense

如果异步组件的父链中有一个 `<Suspense>`，该组件被视为该 `<Suspense>` 的异步依赖。在这种情况下加载状态将由 `<Suspense>` 控制，组件自身的加载、错误、延时和超时选项将被忽略。

可在异步组件中通过 `suspensable:false` 退出 `Suspense` 控制，让组件始终控制自己的加载状态。

#### Async Component (Vue 2.0)

* 通过回调函数定义异步组件

* 结合 webpack 通过（工厂函数返回一个 `Promise`） `import('component')` 导入

##### Handling Loading State

```js
const AsyncComp = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```



### Template refs

当 `ref` 与 `v-for` 一起使用时，得到的 `ref` 将是一个数组，其中包含镜像数据源的子组件。

> ##### WARNING
>
> `$refs` 仅在组件渲染后填充。应避免从模版或计算属性中访问 `$refs`



### Handling Edge Cases

#### Forcing an Update

通过 `$forceUpdate` 强制更新

#### Cheap Static Components with `v-once`

通过向根元素添加 `v-once` 指令来确保只对静态组件求值一次，然后进行缓存。

```js
app.component('terms-of-service', {
  template: `
		<div v-once>
			<h1>Terms of Service</h1>
		</div>
	`
})
```



### Handling Edge Cases (Vue 2.0)

#### Element & Component Access

##### Accessing the Root Instance

`$root`

##### Accessing the Parent Component Instance

`$parent`

##### Accessing Child Component Instances & Child Elements

`ref`, `$refs`

#### Programmatic Event Listeners

通过 `$on(eventName, eventHandler)` 侦听一个事件

通过 `$once(eventName, eventHandler)` 一次性侦听一个事件

通过 `$off(eventName, eventHandler)` 停止侦听一个事件

> 注意 Vue 的事件系统不同于浏览器的 [EventTarget API](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)。尽管它们工作起来是相似的，但是 `$emit`、`$on`, 和 `$off` 并不是 `dispatchEvent`、`addEventListener` 和 `removeEventListener` 的别名。

#### Circular References

##### Recursive Compnents

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事。



### Transitions & Animation

* 在 CSS 过渡和动画中自动应用 class
* 可以配合使用第三方 CSS 动画，如 Animate.css
* 在过渡钩子函数中使用 JavaScript 直接操作 DOM
* 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

#####  Transition Classes

`v-enter-from`：定义进入过渡的开始的状态

`v-enter-active`：定义进入过渡生效的状态

`v-enter-to`：定义进入过渡的结束状态

`v-leave-from`：定义离开过渡的开始状态

`v-leave-active`：定义离开过渡生效时的状态

`v-leave-to`：定义离开过渡的结束状态

##### Custom Transition Classes

* `enter-from-class`
* `enter-active-class`
* `enter-to-class`
* `leave-from-class`
* `leave-active-class`
* `leave-to-class`

##### JavaScript Hooks

* `beforeEnter(el)`
* `enter(el, done)`
* `afterEnter(el)`
* `enterCancelled(el)`
* `beforeLeave(el)`
* `leave(el, done)`
* `afterLeave(el)`
* `leaveCanclled(el)`

#### Transitions on Initial Render

通过 `appear` attribute 设置节点的初始渲染的过渡

```html
<transition appear>
  ...
</transition>
```

可自定义 CSS 类名：

`appear-class`

`appear-to-class`

`appear-active-class`

可自定义 JavaScript Hooks

`@before-appear`

`@appear`

`@after-appear`

`@appear-cancelled`

#### Multiple Elements Transition

> 当有**相同标签名**的元素切换时，需要通过 `key` attribute 设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，**给在 `<transition>` 组件中的多个元素设置 key 是一个更好的实践**。

#### List Transition

`<transition-group>` 组件。

* 默认 Tag `<span>`，可通过 `tag` 属性更换
* 过渡模式不可用
* 内部元素**总是需要**提供唯一的 `key` attribute 值
* CSS 过渡的类将会应用在内部的元素中，而不是这个组件/容器本身

##### List Sorting Transition

通过 `v-move` class 改变元素的定位。

> 使用 FLIP 过渡的元素不能设置 `display: inline` 。作为代替方案，可以设置为 `display: inline-block` 或者放置于 flex 中。



## Reusability & Composition

### Mixins

#### Basic

混入（mixin）提供了一种非常灵活的方式，来分发 Vue 组件中可复用功能。一个混入对象可以包含任意组件选项。（当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

#### Option Merging

当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”

* 数据对象冲突时，以组件数据优先

* 同名钩子函数将合并为一个数组，因此都将被调用。（混入对象的钩子将在组件自身钩子**之前**调用
* 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。（两个对象键名冲突时，取组件对象的键值对。）

#### Global Mixin

`.mixin({})`

#### Custom Option Merge Strategies

`app.config.optionMergeStrategies`

```js
const app = Vue.createApp({})

app.config.optionMergeStrategies.customOption = (toVal, fromVal) => {
  // return mergedVal
}
```



### Custom Drective

```js
app.directive('focus', {})

// 局部注册指令
directives: {
  focus: {
    // ...
  }
}
```

#### Hook Functions (Vue 3.0)

* `beforeMount`：当指令第一次绑定到元素并且挂载父组件之前调用。
* `mounted`：在挂载绑定元素的父组件时调用。
* `beforeUpdate`：在更新包含组件的 VNode 之前调用。
* `updated`：在包含组件的 VNode **及其子组件的 VNode** 更新后调用。
* `beforeUnmount`：在卸载绑定元素的父组件之前调用。
* `unmounted`：当指令与元素解除绑定且父组件已卸载时，只调用一次。

##### Dynamic Drective Arguments

`v-mydirective:[argument]="value"`

#### Function Shorthand

仅 `mounted` 和 `updated` 触发相同的行为：

```js
app.directive('pin', (el, binding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

#### Object Literals

指令函数能够接受所有合法的 JavaScript 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```



### Teleport (Vue 3.0)

`<teleport to="selector">...</teleport>`



### Render Functions (Vue 3.0)

`Vue.h(tag, props, children)`

#### Using JavaScript replace Template Feature

##### `v-if` & `v-for`

Using `if`/`else` and `map()` replace template `v-if` and `v-for` feature:

```js
props: ['items'],
render() {
  if (this.items.length) {
    return Vue.h('ul', this.items.map((item) => {
      return Vue.h('li', item.name)
    }))
  } else {
    return Vue.h('p', 'No items found.')
  }
}
```

##### `v-model`

`v-model` 扩展为 `modelValue` 和 `onUpdate:modelValue`：

```js
props: ['modelValue'],
render() {
  return Vue.h(SomeComponent, {
    modelValue: this.modelValue,
    'onUpdate:modelValue': value => this.$emit('update:modelValue', value)
  })
}
```

##### `v-on`

```js
render() {
  return Vue.h('div', {
    onClick: $event => console.log('clicked', $event.target)
  })
}
```

##### Event Modifiers

`.passive`, `.capture`, `.once`

```js
render() {
  return Vue.h('input', {
    onClick: {
      handler: this.doThisInCapturingMode,
      capture: true
    },
    onKeyUp: {
      handler: this.doThisOnce,
      once: true
    },
    onMouseOver: {
      handler: this.doThisOnceInCapuringMode,
      once: true,
      capture: true
    }
  })
}
```

`.stop`, `.prevent`, `.self`, `.enter`, `.13`, `.ctrl`, `.alt`, `.shift`, `.meta`

```js
render() {
  return Vue.h('input', {
    onKeyUp: event => {
      if (event.target !== event.currentTarget) return
      if (!event.shiftKey || event.keyCode !== 13) return
      event.stopPropagation()
      event.preventDefault()
      // ...
    }
  })
}
```

##### Slots

`this.$slots`

```js
render() {
  // `<div><slot></slot></div>`
  return Vue.h('div', {}, this.$slots.default())
}
```

```js
props: ['message'],
render() {
  // `<div><slot :text="message"></slot></div>`
  return Vue.h('div', {}, this.$slots.default({ text: this.message }))
}
```

将 slot 传递给子组件：

```js
render() {
  // `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
  return Vue.h('div', [
    Vue.h('child', {}, {
      default: (props) => Vue.h('span', props.text)
    })
  ])
}
```


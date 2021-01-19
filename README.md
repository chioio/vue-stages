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




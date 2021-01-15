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




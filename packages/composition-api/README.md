# Composition API

## Basics

### `setup` Component Option

> **WARNING**
>
> Because the component instance is not yet created when `setup` is executed, there is no `this` inside a `setup` option. This means, with the exception of `props`, we won't be able to access any properties declared in the component - **local state, computed properties** or **methods**.

The `setup` option should be a function that accepts `props` and `context`.

Everything that we return from `setup` will be exposed to the rest of(其余的) our component (computed properties, methods, lifecycle hooks and so on) as well as to the component's template.

### Reactive Variables with `ref`

`ref` takes the argument and returns it wrapped within **an object with a `value` property**, which can then be used to access or mutate the value of the reactive variable.

```js
import { ref } from 'vue'

const counter = ref(0)

console.log(counter)	// { value: 0 }
console.log(counter.value)	// 0

counter.value++
console.log(counter.value)	// 1
```

> **POINT**
>
> Because in JavaScript, primitive types like `Number` or `String` are passed by **value**, not by **reference**. Therefore, the `ref` function is able to change primitive types to **Reactive References** (object).

### Lifecycle Hook Registration Inside `setup`

Lifecycle hooks on composition API have the same name as for Options API but are prefixed with `on`: i.e. `onMounted`.

### Reacting to Changes with `watch`

`watch` accepts 3 arguments: 

* A **Reactive Reference** or getter function that we want to watch
* A callback
* Optional configuration options

```js
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```

### Standalone `computed` properties

```js
import { ref, computed } from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value++
console.log(counter.value)	// 1
console.log(twiceTheCounter.value)	// 2
```

The `computed` function returns a read-only **Reactive Reference** to the ouput of the getter-like callback passed as the first argument to `computed`.



## Setup

### Argument

* `props`
* `context`

#### Props

`props` inside of a `setup` function are reactive and will be updated when new props are passed in.

> **WARNING**
>
> However, because `props` are reactive, we **cannot use ES6 destructuring** because it will remove props reactivity.

If wee need to destructure our props, we can do this by utilizing the `toRefs` inside of the `setup` function: 

```js
import { toRefs } from 'vue'

setup(props) {
  const { title } = toRefs(props)
  console.log(title.value)
}
```
 If `title` is an optional prop, it could be missing from `props`. So in this case, `toRefs` won't create a ref for `title`. Instead we'd need to use `toRef`: 

```js
import { toRef } from 'vue'

setup(props) {
	const title = toRef(props, 'title')
  console.log(title.value)
}
```

#### Context

The `context` is a normal JavaScript object that is **not reactive** and exposes three component properties: 

```js
export default {
  setup(props, context) {
    // Attributes (Non-reactive object)
    console.log(context.attrs)
    
    // Slots (Non-reactive object)
    console.log(context.slots)
    
    // Emit Events (Method)
    console.log(context.emit)
  }
  
  // We can safely use ES6 destructuriing on `context`
  // due to the `context` is not reactive.
  setup(props, { attrs, slots, emit }) {
    // ...
  }
}
```

`attrs` and `slots` are stateful objects that are always updated when the component itself is updated.

### Accessing Component Properties

When `setup` is executed, the component instance has not been created yet. As a result, we will only be able to access the: 

* `props`
* `attrs`
* `slots`
* `emit`

Not have access to the: 

* `data`
* `computed`
* `methods`

### Usage with Templates

If `setup` returns an object, the properties on the object can be accessed in the component's template, as well as the properties of the `props` passed into `setup`.

### Usage with Render Functions

`setup` can also return a render function which can directly make use of the reactive state declared in the same scope.

### Usage of `this`

Inside `setup()`, `this` **won't** be a reference to the current active instance . (Since `setup()` is called before other component options are resolved, `this` inside `setup()` will behave quite differently from `this` in other options) So avoid to use `this` in `setup()`.



## Lifecycle Hooks

| Options API       | Hook inside setup   |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |

> **TIP**
>
> Because `setup` is run around the `beforeCreate` and `created` lifecycle hooks, we do not need to explicitly define them.



## Provide / Inject

### Using Provide

The `provide` function allows us to define the property through two parameters: 

1. The property's name (`<String>` type)
2. The property's value

### Using Inject

The `inject` function takes two parameters: 

1. The name of the property to iinject
2. A default value (Optional)

### Reactivity

#### Add Reactivity

To add reactivity between provided and injected values, we can use a `ref` or `reactive` when providing a value.

#### Mutating Reactive Properties

When using reactive provide / inject values, **it is recommended to keep any mutations to reactive properties inside of the *provider* whenever possible**.

* It is recommended using `readonly` on provided property if we want to ensure that the data passed through `provide` cannot be mutated by the injected component.




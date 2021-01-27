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




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


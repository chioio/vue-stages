<template>
  <div>{{ collectionName }} : {{ readersNumber }} {{ book.title }}</div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  props: {
    collectionName: String
  },
  setup(props) {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })

    // expose to template
    // return {
    //   readersNumber,
    //   book
    // }
    // use render
    return () => h('div', [readersNumber.value, book.title])
  }
}
</script>

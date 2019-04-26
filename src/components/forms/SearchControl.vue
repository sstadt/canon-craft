
<template lang="pug">
  .controls-input.icon-input
    icon(name="search", size="14")
    input(type="text", v-model="searchParam", placeholder="Search")
</template>

<script>
  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'SearchControl',
    components: { Icon },
    props: {
      search: String
    },
    data () {
      return {
        searchParam: this.search
      }
    },
    watch: {
      searchParam () {
        this.$emit('input', this.searchParam)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
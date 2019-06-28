
<template lang="pug">
  .dropdown-menu
    icon-button.dropdown-menu__open(:icon="icon", size="18px", @click="toggle")
    transition(name="slide-fade-up-minor")
      .dropdown-menu__list-wrapper(v-if="show")
        .dropdown-menu__list
          slot
</template>

<script>
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'DropdownMenu',
    components: { IconButton },
    props: {
      icon: {
        type: String,
        default: 'more'
      }
    },
    data () {
      return {
        show: false
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      }
    }
  }
</script>

<style scoped lang="scss">
  .dropdown-menu {
    &__open {
      background-color: $body-bg--main;
      border-radius: 50%;
      padding: 5px;
    }

    &__list-wrapper {
      position: relative;
    }

    &__list {
      position: absolute;
      display: flex;
      flex-direction: column;
      padding-top: 5px;
      top: 0;
      right: 0;
    }
  }
</style>
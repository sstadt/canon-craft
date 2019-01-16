
<template lang="pug">
  transition(name="fade", @after-enter="triggerTextWipe")
    .missive.modal(v-if="isVisible")
      .modal__overlay
      .modal__content
        a.button.button--icon.modal__close(href="#", @click.prevent="close")
          span.u-hidden Close Modal
          icon(name="times")
        h3.missive__title(v-if="title") {{ title }}
        transition(name="wipe-down")
          //- vue-markdown(v-if="showText") {{ content }}
          .missive__content.foo(v-if="showText")
            p(v-for="n in 50") lorem ipsum dolor sit amet consecteteur adipiscing elit.
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'Missive',
    components: { VueMarkdown, Icon },
    props: {
      title: String,
      content: String
    },
    data() {
      return {
        isVisible: false,
        showText: false
      }
    },
    methods: {
      open () {
        this.isVisible = true
      },
      close () {
        this.isVisible = false
        this.showText = false
      },
      triggerTextWipe () {
        this.showText = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .modal {
    &__content {
      min-width: 80%;
      background-color: transparent;
      color: $body-text--light;

      .icon {
        fill: $body-text--light;
      }
    }
  }

  .missive {
    &__title {
      margin-bottom: $content-gutter;
    }

    &__content {
      transition: 0.3s ease all;
      mask-position: 0% 0%;
      mask-image: -webkit-gradient(linear, left 0%, left 5%, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));

      &.foo {
        mask-position: 0% 100%;
      }
    }
  }
</style>

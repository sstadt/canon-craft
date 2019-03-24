
<template lang="pug">
  transition(name="installer")
    .installer(v-if="showInstaller", v-touch:swipe.down="dismiss")
      img.installer__image(v-lazy="'/img/icons/apple-touch-icon.png'")
      p.installer__instructions
        | Install this webapp on your iPhone: tap 
        icon(name="ios-share", :size="20")
        |  and then Add to Homescreen
</template>

<script>
  import { mapState } from 'vuex'

  import Icon from '@/components/ui/Icon.vue'

  export default {
    name: 'Installer',
    components: { Icon },
    data () {
      return {
        show: true
      }
    },
    computed: {
      ...mapState({
        showInstaller: state => state.installer.showInstaller
      })
    },
    created() {
      this.$store.dispatch('installer/init')
    },
    methods: {
      dismiss () {
        this.$store.dispatch('installer/dismiss')
      }
    }
  }
</script>

<style scoped lang="scss">
  .installer {
    position: fixed;
    height: 75px;
    width: calc(100vw - #{$grid-gutter});
    bottom: $grid-gutter / 2;
    left: $grid-gutter / 2;
    background-color: $body-bg--main;
    border-radius: 4px;
    padding: $grid-gutter / 2;
    display: flex;
    align-items: center;
    box-shadow: $drop-shadow;

    &__image {
      border-radius: 6px;
      max-width: 50px;
    }

    &__instructions {
      line-height: 1.8;
      padding-left: $grid-gutter / 2;
      font-size: rem(13);
    }
  }
</style>
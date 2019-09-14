
<template lang="pug">
  .splash-page(:style="heroBackground")
    .splash-page__content
      img.splash-page__logo(src="/img/logo-CanonCraft.svg")
      carousel.splash-page__carousel(
        :slides-to-show="isMobile ? 2.2 : 3",
        :center-mode="isMobile",
        :infinite="isMobile",
        @before-slide="beforeSlide",
        @after-slide="afterSlide"
      )
        slide(v-for="(slide, index) in slides", :key="index + '_' + slide.icon")
          .splash-page__feature
            icon.splash-page__feature__icon(:name="slide.icon", size="82px")
            transition(name="fade-slow")
              p.splash-page__feature__description(v-if="!isMobile || index === activeIndex") {{ slide.description }}
      .splash-page__footer
        p.splash-page__footer__copy The Head Tinkerer is working very hard to make CanonCraft available to all. Sign up to get updates from us!
        primary-button(label="Update Me!", @click="showNewsletterForm", jumbo)
</template>

<script>
  import { splashImages } from '@/lib/config.images.js'

  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import Icon from '@/components/ui/Icon.vue'
  import Carousel from '@/components/ui/Carousel.vue'
  import Slide from '@/components/ui/Slide.vue'

  export default {
    name: 'Splash',
    components: { PrimaryButton, Icon, Carousel, Slide },
    data () {
      return {
        images: splashImages,
        activeIndex: null,
        slides: [{
          icon: 'quill',
          description: 'Record and share game data'
        }, {
          icon: 'cog',
          description: 'Optimized mobile experience'
        }, {
          icon: 'npc',
          description: 'Add to the table, don\'t replace it!'
        }]
      }
    },
    computed: {
      heroBackground () {
        return {
          'background-image': `url(${this.images.desktopBg})`
        }
      },
      isMobile () {
        return this.$mq === 'mobile'
      }
    },
    mounted () {
      this.activeIndex = 0
    },
    methods: {
      beforeSlide ({ from, to }) {
        if (from !== to) this.activeIndex = null
      },
      afterSlide (index) {
        this.activeIndex = index
      },
      showNewsletterForm () {
        console.log('show the newsletter form')
      }
    }
  }
</script>

<style scoped lang="scss">
  .splash-page {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    &:before {
      content: '';
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba($color-dark-red, 0.3);
    }

    &__content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: $color--secondary;

      .icon {
        fill: $color--secondary;
      }

      @include tablet-up {
        max-width: 50%;
        padding: 0 $grid-gutter;
      }
    }

    &__logo {
      width: 350px;
    }

    &__carousel {
      width: 100%;

      @include tablet-up {
        max-width: 420px;
      }
    }

    &__logo,
    &__carousel {
      margin-bottom: 45px;
    }

    &__logo,
    &__footer {
      @include mobile-only {
        padding: 0 $grid-gutter;
      }
    }

    &__feature {
      text-align: center;
      padding: 0 30px;

      .icon {
        margin: 0 auto 20px;
      }

      &__description {
        font-size: rem(12);
      }
    }

    &__footer {
      text-align: center;

      @include tablet-up {
        max-width: 380px;
      }

      &__copy {
        font-size: rem(14);
        margin-bottom: $content-gutter;
      }
    }
  }
</style>
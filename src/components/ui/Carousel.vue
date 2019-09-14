
<template lang="pug">
  .carousel(ref="carousel", v-touch:swipe.left="slideNext", v-touch:swipe.right="slidePrev")
    .carousel__track.carousel__track--clone(v-if="infinite", :style="beforeTrackStyles")
      slot(name="clone-before")
    .carousel__track(:style="trackStyles")
      slot
    .carousel__track.carousel__track--clone(v-if="infinite", :style="afterTrackStyles")
      slot(name="clone-after")
    ul.carousel__dots.u-list-simple.u-list-inline(v-if="dots")
      li(v-for="n in slides.length" :key="n")
        button.u-clear-button(
          :class="{ 'is-active': n === currentSlideIndex + 1, 'carousel__dots__button': thumbnailImages.length === 0, 'carousel__dots__thumbnail': thumbnailImages.length > 0 }",
          @click="slideTo(n - 1)"
        )
          img(v-if="thumbnailImages.length > 0", :src="thumbnailImages[n - 1].src")
          .u-sr-only Show Slide {{ n }}
</template>

<script>
  import { debounce, clone } from '@/lib/util.js'
  import { cloneSlide } from '@/lib/util.vue.js'
  import { getInRange, normalizeSlideIndex } from '@/lib/util.carousel.js'

  export default {
    name: 'Carousel',
    provide () {
      const data = {}

      Object.defineProperty(data, 'slideWidth', {
        enumerable: true,
        get: () => this.slideWidth
      })

      return { data }
    },
    props: {
      slidesToShow: {
        type: Number,
        default: 1
      },
      slidesToScroll: {
        type: Number,
        default: 1
      },
      duration: {
        type: Number,
        default: 300
      },
      centerMode: {
        type: Boolean,
        deault: false
      },
      infinite: {
        type: Boolean,
        default: false
      },
      dots: {
        type: Boolean,
        default: false
      },
      thumbnailImages: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        slides: [],
        beforeSlides: [],
        afterSlides: [],
        carouselWidth: 0,
        offsetX: 0,
        enableTransition: false,
        nagivating: false
      }
    },
    mounted () {
      this.slides = this.getChildSlides()
      this.slides[0].componentInstance.active = true
      if (this.slides[1]) this.slides[1].componentInstance.next = true
      this.updateTrackWidth()
      window.addEventListener('resize', () => this.onResize())

      this.$nextTick(() => {
        if (this.centerMode) {
          this.offsetX = this.carouselWidth / 2 - this.slideWidth / 2
        }
  
        if (this.infinite) this.initClones()
        this.enableTransition = true
      })
    },
    beforeUpdate () {
      let isForcedUpdate = this.infinite && (!this.$slots['before'] || !this.$slots['after'])
      
      if (isForcedUpdate) {
        this.initClones()
      }
    },
    computed: {
      trackWidth () {
        return this.slideWidth * this.slides.length
      },
      cloneTrackWidth () {
        return this.trackWidth * 2
      },
      trackTransition () {
        return (this.enableTransition) ? `${this.duration}ms ease all` : 'none'
      },
      trackStyles () {
        return {
          width: `${this.trackWidth}px`,
          transform: `translateX(${this.offsetX}px)`,
          transition: (this.enableTransition) ? `${this.duration}ms ease all` : 'none'
        }
      },
      beforeTrackStyles () {
        return {
          width: `${this.cloneTrackWidth}px`,
          transform: `translateX(${this.offsetX - this.cloneTrackWidth}px)`,
          transition: (this.enableTransition) ? `${this.duration}ms ease all` : 'none'
        }
      },
      afterTrackStyles () {
        return {
          width: `${this.cloneTrackWidth}px`,
          transform: `translateX(${this.offsetX + this.trackWidth}px)`,
          transition: (this.enableTransition) ? `${this.duration}ms ease all` : 'none'
        }
      },
      slideWidth () {
        return this.carouselWidth / this.slidesToShow
      },
      currentSlideIndex () {
        return this.slides.findIndex(slide => slide.componentInstance.active)
      }
    },
    watch: {
      slidesToShow () {
        this.onResize()
      },
      centerMode () {
        this.onResize()
      },
      infinite () {
        this.onResize()
      }
    },
    methods: {
      getActiveIndex () {
        return this.slides.findIndex(slide => slide.componentInstance.active)
      },
      getSlideClones (set) {
        let slides = []

        for (let i = 0, j = this.slides.length; i < j; i++) {
          slides.push(cloneSlide(this.slides[i], Math.abs(i - this.slides.length * set)))
        }

        return slides
      },
      initClones () {
        this.$slots['clone-before'] = this.getSlideClones(1).concat(this.getSlideClones(2))
        this.$slots['clone-after'] = this.getSlideClones(3).concat(this.getSlideClones(4))
      },
      getChildSlides () {
        return this.$slots.default.filter(el => {
          if (!el.componentOptions || !el.componentOptions.Ctor) {
            return false;
          }
          return el.componentOptions.Ctor.options.name === 'Slide';
        })
      },
      onResize () {
        debounce(() => {
          this.updateTrackWidth()
          this.slideTo(this.currentSlideIndex)
        }, 50)();
      },
      updateTrackWidth () {
        this.carouselWidth = this.$refs.carousel.offsetWidth
      },
      setCurrentSlide (currentIndex) {
        this.slides.forEach((slide, index) => {
          slide.componentInstance.active = (currentIndex === index)
          slide.componentInstance.next = (currentIndex + 1 === index)
          slide.componentInstance.prev = (currentIndex - 1 === index)
          this.slides[index] = slide;
        })
        setTimeout(() => {
          this.navigating = false
          this.enableTransition = true
          this.$emit('after-slide', this.getActiveIndex())
        }, 50)
      },
      getNewOffset (index) {
        let offset = -(index * this.slideWidth)
        return (this.centerMode) 
          ? this.carouselWidth / 2 - this.slideWidth / 2 + offset
          : offset
      },
      slideTo (index) {
        if (!this.navigating && index !== this.currentSlideIndex) {
          this.$emit('before-slide', { from: this.getActiveIndex(), to: index })
          this.navigating = true
          
          if (!this.infinite) {
            index = (this.centerMode) 
              ? getInRange(index, 0, this.slides.length - 1)
              : getInRange(index, 0, this.slides.length - this.slidesToShow)
          }

          this.offsetX = this.getNewOffset(index)

          if (this.infinite) {
            setTimeout(() => {
              index = normalizeSlideIndex(index, this.slides.length)
              this.enableTransition = false
              this.$nextTick(() => {
                this.offsetX = this.getNewOffset(index)
                this.setCurrentSlide(index)
              })
            }, this.duration + 1)
          } else {
            this.setCurrentSlide(index)
          }
        }
      },
      slideNext () {
        this.slideTo(this.currentSlideIndex + this.slidesToScroll)
      },
      slidePrev () {
        this.slideTo(this.currentSlideIndex - this.slidesToScroll);
      }
    }
  }
</script>

<style scoped lang="scss">
  .carousel {
    overflow: hidden;
    position: relative;

    &__track {
      display: flex;

      @include tablet-up {
        justify-content: center;
        min-width: 100%;
      }

      &--clone {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }

    &__dots {
      padding: 0;
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 0;
      margin: 0;

      &__button {
        border: none;
        padding: 4px;
        border-radius: 50px;
        margin: 8px;
        background-color: $color-charcoal;
        transition: transform 0.2s;

        &.is-active {
          transform: scale(1.5);
          background-color: $color-light-grey;
        }
      }

      &__thumbnail {
        display: flex;
        align-items: center;
        flex-direction: column;
        opacity: 0.55;
        transition: 0.3s ease opacity;
        padding: 4px;

        &:focus {
          outline: none;
        }

        &:after {
          content: '';
          display: block;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          margin-top: 12px;
          opacity: 0;
          background-color: $color-light-grey;
          transition: 0.3s ease opacity;
        }

        &.is-active,
        &:hover,
        &:focus {
          opacity: 1;
        }

        &.is-active:after {
          opacity: 1;
        }
      }
    }
  }
</style>
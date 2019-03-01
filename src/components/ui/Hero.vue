
<template lang="pug">
  .hero(:style="heroBackgroundImage")
    .container
      h1.hero__title {{ title }}
      .hero__controls
        slot
</template>

<script>
  export default {
    name: 'Hero',
    props: {
      title: String,
      image: String
    },
    computed: {
      heroBackgroundImage () {
        return {
          'background-image': `url(${this.image})`
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .hero {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 30px;

    .container {
      padding-top: 30px;
      padding-bottom: 30px;
      height: 35vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      @include tablet-up {
        padding-top: 50px;
        padding-bottom: 50px;
        height: 420px;
      }
    }

    &__title {
      color: $color-white;
      font-weight: normal;
      letter-spacing: 1.2px;
      margin-bottom: $content-gutter;

      @include tablet-up {
        font-size: rem(40);
      }
    }

    &__controls > * {
      margin-right: 14px;
    }
  }
</style>


<template lang="pug">
  .card.card--image
    .card--image__wrapper
      img.card--image__image(v-lazy="image.url")
    .card__content
      ul.card__state.u-list-simple
        li Type: {{ image.type }}
        li Size: {{ image.size | fileSize }}
</template>

<script>
  export default {
    name: 'ImageCard',
    props: {
      image: Object
    }
  }
</script>

<style scoped lang="scss">
  .card {
    &--image {
      &__wrapper {
        display: flex;
        height: 120px;
      }

      &__image {
        object-fit: cover;
      }
    }
  }
</style>
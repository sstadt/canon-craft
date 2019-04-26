
<template lang="pug">
  a.card.card--npc(@click="openNpc")
    .card--npc__image
      img(v-if="npc.image", :src="npc.image")
    .card--npc__content
      h3.card__title.card--npc__title {{ npc.name }}
      p.card__description.card--npc__description {{ synopsis }}
</template>

<script>
  export default {
    name: 'Npc',
    props: {
      npc: Object
    },
    computed: {
      synopsis () {
        return this.npc.description
      }
    },
    methods: {
      openNpc () {
        this.$emit('show')
      }
    }
  }
</script>

<style scoped lang="scss">
  .card--npc {
    display: flex;
    padding: $grid-gutter / 2;

    &__content {
      max-width: calc(100% - 110px);
    }

    &__title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__image {
      max-width: 110px;
      flex-shrink: 0;
      line-height: 0;
    }

    &__content {
      padding-left: 12px;
    }

    &__description {
      @include multi-line-ellipsis(1rem, 1.3, 3);
    }
  }
</style>
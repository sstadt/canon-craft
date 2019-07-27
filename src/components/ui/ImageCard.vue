
<template lang="pug">
  .card.card--image
    .card--image__wrapper
      img.card--image__image(v-lazy="image.url")
    .card__content
      ul.card__state.u-list-simple
        li Type: {{ image.type }}
        li Size: {{ image.size | fileSize }}
    context-menu.card--image__menu
      context-menu-item(icon="trash", label="Delete", @click="confirmDelete")
    confirm-dialog(ref="confirm")
</template>

<script>
  import ContextMenu from '@/components/ui/ContextMenu.vue'
  import ContextMenuItem from '@/components/ui/ContextMenuItem.vue'
  import ConfirmDialog from '@/components/ui/ConfirmDialog.vue'

  export default {
    name: 'ImageCard',
    components: { ContextMenu, ContextMenuItem, ConfirmDialog },
    props: {
      image: Object
    },
    methods: {
      confirmDelete () {
        this.$refs.confirm.ask({
          message: `Are you sure you with to delete ${this.image.name}? This cannot be undone.`,
          callback: () => this.deleteImage()
        })
      },
      deleteImage () {
        this.$emit('delete')
      }
    }
  }
</script>

<style scoped lang="scss">
  .card {
    &--image {
      position: relative;

      &__wrapper {
        display: flex;
        height: 120px;
      }

      &__image {
        object-fit: cover;
      }

      &__menu {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
</style>
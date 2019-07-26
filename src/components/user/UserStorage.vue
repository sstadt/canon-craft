
<template lang="pug">
  .user-storage
    capacity-bar(:capacity="storageLimit", :usage="totalFilesSize")
    .row.small-up-2.medium-up-4.large-up-5
      .column(v-for="image in imageLibrary", :key="image.url")
        image-card(:image="image")
</template>

<script>
  import { mapState } from 'vuex'

  import CapacityBar from '@/components/ui/CapacityBar.vue'
  import ImageCard from '@/components/ui/ImageCard.vue'

  export default {
    name: 'UserStorage',
    components: { CapacityBar, ImageCard },
    computed: {
      ...mapState({
        imageLibrary: state => state.files.images,
        storageLimit: state => state.files.storageLimit
      }),
      totalFilesSize () {
        return (this.imageLibrary.length > 0)
          ? this.imageLibrary
            .map(image => image.size)
            .reduce((previous, current) => {
              return previous + current
            })
          : 0
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

<template lang="pug">
  .user-storage
    capacity-bar(:capacity="storageLimit", :usage="totalFilesSize")
    .row.small-up-2.medium-up-4.large-up-5
      .column(v-for="image in imageLibrary", :key="image.url")
        image-card(:image="image", @delete="deleteImage(image)")
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
        userData: state => state.user.userData
      }),
      storageLimit () {
        return (this.userData) ? this.userData.tier.storageLimit : 0
      },
      totalFilesSize () {
        return (this.userData && this.userData.storageSize) ? this.userData.storageSize : 0
      }
    },
    methods: {
      deleteImage (image) {
        this.$store.dispatch('files/deleteImage', image)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
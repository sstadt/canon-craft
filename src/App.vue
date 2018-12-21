
<template lang="pug">
  #app
    icon-store
    navbar
    transition(name="fade", mode="out-in")
      router-view
    loading-indicator
</template>

<script>
  import { mapState } from 'vuex'

  import Navbar from '@/components/navigation/Navbar.vue'

  import IconStore from '@/components/ui/IconStore.vue'
  import LoadingIndicator from '@/components/ui/LoadingIndicator.vue'

  export default {
    name: 'App',
    components: { Navbar, IconStore, LoadingIndicator },
    data () {
      return {
        dataInitialized: false
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      })
    },
    created () {
      console.warn('App (re)loaded')
      this.$store.dispatch('user/init')
    },
    watch: {
      currentUser () {
        if (!this.dataInitialized && this.currentUser.uid) {
          this.dataInitialized = true

          this.$store.dispatch('games/init')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'theme/style';
</style>


<template lang="pug">
  #app
    icon-store
    navbar
    transition(name="fade", mode="out-in")
      router-view
    toast
    loading-indicator
</template>

<script>
  import { mapState } from 'vuex'

  import Navbar from '@/components/navigation/Navbar.vue'

  import IconStore from '@/components/ui/IconStore.vue'
  import Toast from '@/components/ui/Toast.vue'
  import LoadingIndicator from '@/components/ui/LoadingIndicator.vue'

  export default {
    name: 'App',
    components: { Navbar, IconStore, LoadingIndicator, Toast },
    data () {
      return {
        dataInitialized: false
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        loggedIn: state => state.user.loggedIn
      })
    },
    created () {
      console.warn('App (re)loaded')
      this.$store.dispatch('user/init')
    },
    watch: {
      currentUser () {
        if (!this.dataInitialized && this.loggedIn) {
          this.dataInitialized = true
          this.$store.dispatch('games/init')
        } else if (this.dataInitialized && !this.loggedIn) {
          this.dataInitialized = false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'theme/style';
</style>

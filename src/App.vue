
<template lang="pug">
  #app
    icon-store
    toast
    loading-indicator
    installer
    navbar
    .main-content
      transition(name="fade", mode="out-in")
        router-view
</template>

<script>
  import { mapState } from 'vuex'

  import Navbar from '@/components/navigation/Navbar.vue'

  import Installer from '@/components/ui/Installer.vue'
  import IconStore from '@/components/ui/IconStore.vue'
  import Toast from '@/components/ui/Toast.vue'
  import LoadingIndicator from '@/components/ui/LoadingIndicator.vue'

  export default {
    name: 'App',
    components: { Navbar, Installer, IconStore, LoadingIndicator, Toast },
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
      this.$store.dispatch('user/init')
    },
    watch: {
      currentUser () {
        if (!this.dataInitialized && this.loggedIn) {
          this.dataInitialized = true
          this.populateData()
        } else if (this.dataInitialized && !this.loggedIn) {
          this.dataInitialized = false
        }
      }
    },
    methods: {
      populateData () {
        this.$store.dispatch('games/populate')
        this.$store.dispatch('quests/populate')
      }
    }
  }
</script>

<style lang="scss">
  @import 'theme/style';

  .main-content {
    padding-bottom: 50px;
  }
</style>

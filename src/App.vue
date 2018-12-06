
<template lang="pug">
  #app
    navbar
    transition(name="fade", mode="out-in")
      router-view
</template>

<script>
  import { mapState } from 'vuex'

  import Navbar from '@/components/navigation/Navbar.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    },
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

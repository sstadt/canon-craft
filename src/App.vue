
<template lang="pug">
  #app
    icon-store
    toast
    loading-indicator
    //- disabled in lieu of better safari support
    //- installer 
    navbar
    side-panel
    .main-content
      //- transition(
      //-   name="fade", 
      //-   mode="out-in",
      //-   @beforeLeave="beforeLeave",
      //-   @enter="enter",
      //-   @afterEnter="afterEnter"
      //- )
      router-view
</template>

<script>
  import { mapState } from 'vuex'
  import { initScrollLock } from '@/lib/events.scrollLock.js'

  import Installer from '@/components/ui/Installer.vue'
  import IconStore from '@/components/ui/IconStore.vue'
  import LoadingIndicator from '@/components/ui/LoadingIndicator.vue'
  import Navbar from '@/components/navigation/Navbar.vue'
  import SidePanel from '@/components/sidepanel/SidePanel.vue'
  import Toast from '@/components/ui/Toast.vue'

  export default {
    name: 'App',
    components: {
      Installer,
      IconStore,
      LoadingIndicator,
      Navbar,
      SidePanel,
      Toast
    },
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
      this.$store.dispatch('toast/init')
      this.$store.dispatch('npcs/init')
      initScrollLock()
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
      beforeLeave(element) {
        this.prevHeight = getComputedStyle(element).height;
      },
      enter(element) {
        const { height } = getComputedStyle(element);

        element.style.height = this.prevHeight;

        setTimeout(() => {
          element.style.height = height;
        });
      },
      afterEnter(element) {
        element.style.height = 'auto';
      },
      populateData () {
        this.$store.dispatch('games/populate')
        this.$store.dispatch('quests/populate')
        this.$store.dispatch('npcs/populate')
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

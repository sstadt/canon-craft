
<template lang="pug">
  .container
    vue-headful(title="Canon Craft - My Account")
    transition(name="fade")
      .user-profile(v-if="loggedIn")
        h1 {{ currentUser.email }}
        tabs
          tab(heading="User Profile", :selected="true")
            user-details(:user="currentUser")
          tab(heading="Account Settings")
            user-password-reset
          tab(heading="Games")
            .row.small-up-1.medium-up-3.large-up-4
              .column(v-for="game in games")
                game-card(:game="game")
          tab(heading="Storage")
            user-storage
      .user-profile.user-profile--logged-out(v-else-if="authInitialized")
        h1 User Profile
        p
          a(@click.prevent="logIn") Log in
          |  to view your account details
</template>

<script>
  import { mapState } from 'vuex'
  import VueHeadful from 'vue-headful'

  import Tab from '@/components/ui/Tab.vue'
  import Tabs from '@/components/ui/Tabs.vue'
  import GameCard from '@/components/game/GameCard.vue'
  import UserDetails from '@/components/user/UserDetails.vue'
  import UserPasswordReset from '@/components/user/UserPasswordReset.vue'
  import UserStorage from '@/components/user/UserStorage.vue'

  export default {
    name: 'UserProfile',
    components: {
      VueHeadful,
      Tab, Tabs, GameCard,
      UserDetails, UserPasswordReset, UserStorage
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        loggedIn: state => state.user.loggedIn,
        authInitialized: state => state.user.authInitialized,
        games: state => state.games.all
      })
    },
    methods: {
      logIn () {
        this.$store.dispatch('user/requestAuth')
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-profile {
    margin-top: $grid-gutter;
  }
</style>
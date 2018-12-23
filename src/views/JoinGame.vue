
<template lang="pug">
  .join-game
</template>

<script>
  import { mapState } from 'vuex'

  import { debounce } from '@/lib/util.js'
  import { functions } from '@/store/firebase.js'

  const joinGame = functions.httpsCallable('joinGame')

  export default {
    name: 'JoinGame',
    data () {
      return {
        attemptQueued: false,
        waitingForAuthInit: false,
        joinSuccessful: false,
        joinedGame: null
      }
    },
    computed: {
      ...mapState({
        isLoggedIn: state => state.user.loggedIn,
        authInitialized: state => state.user.authInitialized,
        games: state => state.games.all
      })
    },
    watch: {
      isLoggedIn (newVal, oldVal) {
        if (this.attemptQueued && oldVal === false && newVal === true) {
          this.joinByInvite()
        }
      },
      authInitialized (newVal, oldVal) {
        if (this.waitingForAuthInit === true && oldVal === false && newVal === true) {
          this.waitingForAuthInit = false
          this.attemptJoin()
        }
      }
    },
    created () {
      this.$store.dispatch('loading/start')
      this.attemptJoin()
    },
    methods: {
      attemptJoin () {
        if (this.isLoggedIn === true) {
          this.joinByInvite()
        } else {
          this.attemptQueued = true

          if (this.authInitialized === true) {
            this.requestLogin()
          } else {
            this.waitingForAuthInit = true
          }
        }
      },
      requestLogin () {
        this.$store.dispatch('loading/message', 'Authenticating...')
        this.$store.dispatch('user/requestAuth')
      },
      joinByInvite: debounce(function () {
        let invite = this.$route.params.invite

        this.attemptQueued = false
        this.waitingForAuthInit = false
        this.$store.dispatch('loading/message', 'Joining Game...')

        joinGame(invite)
          .then(result => {
            this.joinSuccessful = true
            this.joinedGame = result.data.game
            this.$store.dispatch('loading/message', 'Success!')

            let interval = setInterval(() => {
              if (this.games.find(game => game.id === result.data.game)) {
                clearInterval(interval)
                this.$store.dispatch('loading/stop')
                this.$router.push(`/game/${this.joinedGame}`)
              }
            }, 250)

          })
          .catch((error) => {
            this.$store.dispatch('loading/message', error.message)
          })
      }, 250)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

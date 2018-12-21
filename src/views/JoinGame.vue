
<template lang="pug">
  .join-game
</template>

<script>
  import { functions } from '@/store/firebase.js'

  import Icon from '@/components/ui/Icon.vue'

  const joinGame = functions.httpsCallable('joinGame')

  // if logged in join game
  // if not, throw login and then wait for user before joining

  export default {
    name: 'JoinGame',
    components: { Icon },
    created () {
      this.$store.dispatch('loading/start', 'Joining Game...')
      this.attemptJoin()
    },
    methods: {
      attemptJoin () {
        let invite = this.$route.params.invite

        joinGame({ invite })
          .then(result => {
            console.log('--- joinGame returned ----------')
            console.log(result)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

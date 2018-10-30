
<template lang="pug">
  .user-status
    .user-status__logged-in(v-if="currentUser")
      p.user-status__username {{ currentUser.displayName }}
      a(href="#", @click.prevent="logOut") Log Out
    .user-status__logged-out(v-else)
      a(href="#", @click.prevent="logIn") Log In
      modal(ref="authModal")
        template(slot="content")
          auth
</template>

<script>
import { mapState } from 'vuex'

import Modal from '@/components/ui/Modal.vue'
import Auth from '@/components/authentication/Auth.vue'

export default {
  name: 'UserStatus',
  components: { Modal, Auth },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser
    })
  },
  created() {
    this.$store.dispatch('user/init')
  },
  methods: {
    logIn () {
      this.$refs.authModal.open()
    },
    logOut () {
      this.$store.dispatch('user/logout')
    }
  },
  watch: {
    currentUser (newUser, oldUser) {
      if (newUser && !oldUser) {
        this.$refs.authModal.close()
      }
    }
  }
};
</script>

<style scoped lang="scss">
</style>


<template lang="pug">
  .user-status
    .user-status__logged-in(v-if="isActiveUser")
      p.user-status__username {{ currentUser.displayName }}
      a(href="#", @click.prevent="logOut") Log Out
    .user-status__logged-out(v-else)
      a(href="#", @click.prevent="logIn") Log In
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'UserStatus',
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser
    }),
    isActiveUser() {
      return this.currentUser && this.currentUser.displayName;
    }
  },
  created() {
    this.$store.dispatch('user/init');
  },
  methods: {
    logIn() {
      this.$store.dispatch('user/login');
    },
    logOut() {
      this.$store.dispatch('user/logout');
    }
  }
};
</script>

<style scoped lang="scss">
</style>

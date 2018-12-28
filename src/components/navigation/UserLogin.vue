
<template lang="pug">
  .user-login
    transition(name="fade")
      .user-login__logged-in(v-if="currentUser")
        a.user-login__avatar(@click="toggleMenu")
          img(:src="currentUser.photoURL")
        transition(name="slide-fade")
          .user-login__menu(v-if="showMenu")
            a.navbar__link(href="#", @click.prevent="logOut") Log Out
      .user-login__logged-out(v-else)
        a.navbar__link(href="#", @click.prevent="logIn") Log In
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
    data() {
      return {
        showMenu: false
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser,
        authRequested: state => state.user.authRequested
      })
    },
    methods: {
      logIn () {
        this.$refs.authModal.open()
      },
      logOut () {
        this.showMenu = false
        this.$router.push('/')
        this.$store.dispatch('games/clear')
        this.$store.dispatch('user/logout')
      },
      toggleMenu () {
        this.showMenu = !this.showMenu
      }
    },
    watch: {
      currentUser (newUser, oldUser) {
        if (newUser && !oldUser) {
          this.$refs.authModal.close()
        }
      },
      authRequested (newVal, oldVal) {
        if (newVal === true && oldVal === false) {
          this.$refs.authModal.open()
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .user-login {
    position: relative;
    margin-left: 20px;

    &__avatar {
      display: block;
      width: 24px;
      height: 24px;
      border: 1px solid $navbar-text--link;
    }

    &__menu {
      position: absolute;
      bottom: -15px;
      right: 0;
      transform: translateY(100%);
      width: 200px;
      background-color: $body-bg--darkest;
      border-radius: 4px;
      box-shadow: 0px 5px 15px rgba($color-black, 0.4);

      a {
        display: block;
        padding: 14px 20px;
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 5px;
        border-bottom: 6px solid $body-bg--darkest;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        transform: translateY(-100%);
      }
    }
  }
</style>

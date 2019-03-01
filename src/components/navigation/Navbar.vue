
<template lang="pug">
  .navbar
    .navbar__container.container
      .navbar__left
        router-link.navbar__logo(to="/")
          img(src="@/assets/images/logo-CanonCraft.svg")
      .navbar__right
        transition-group(name="fade")
          router-link.navbar__link(to="/games", key="games", v-if="loggedIn") Games
          //- router-link.navbar__link(to="/styleguide", key="styleguide") Styleguide
        user-login
</template>

<script>
  import { mapState } from 'vuex'

  import UserLogin from '@/components/navigation/UserLogin.vue'

  export default {
    name: 'Navbar',
    components: {
      UserLogin
    },
    computed: {
      ...mapState({
        loggedIn: state => state.user.loggedIn
      })
    }
  }
</script>

<style lang="scss">
  .navbar {
    position: relative;
    padding: 20px 0;
    background-color: $body-bg--dark;

    &__container {
      display: flex;
      justify-content: space-between;
    }

    &__right {
      display: flex;
      align-items: center;
    }

    &__logo {
      display: block;
      max-width: 80px;
    }

    &__link {
      padding-left: 20px;

      &, &:hover {
        color: $navbar-text--link;
      }
    }
  }
</style>

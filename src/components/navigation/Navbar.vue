
<template lang="pug">
  .navbar
    .navbar__container.container
      .navbar__left
        router-link.navbar__logo(to="/")
          img(src="@/assets/images/logo-CanonCraft.svg")
      .navbar__right
        router-link.navbar__link(to="/styleguide") Styleguide
        user-login
</template>

<script>
  import UserLogin from '@/components/navigation/UserLogin.vue'

  export default {
    name: 'Navbar',
    components: {
      UserLogin
    }
  }
</script>

<style lang="scss">
  .navbar {
    padding: 20px 0;
    background-color: $body-bg--dark;

    &__container {
      @include tablet-up {
        display: flex;
        justify-content: space-between;
      }
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

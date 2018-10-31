
<template lang="pug">
  .auth
    component(:is="currentAuthView", @change-auth-view="changeView")
</template>

<script>
  import Login from '@/components/authentication/Login.vue'
  import Signup from '@/components/authentication/Signup.vue'
  import ForgotPassword from '@/components/authentication/ForgotPassword.vue'

  export default {
    name: 'Auth',
    components: {
      Login,
      Signup,
      ForgotPassword
    },
    data () {
      return {
        currentAuthView: 'Login'
      }
    },
    methods: {
      changeView (view) {
        this.currentAuthView = view;
      }
    }
  }
</script>

<style scoped lang="scss">
</style>


<template lang="pug">
  .password-strength
    p password strength: {{ strength }}
</template>

<script>
  import zxcvbn from 'zxcvbn'

  export default {
    name: 'PasswordStrength',
    props: {
      password: {
        type: String,
        required: true
      }
    },
    computed: {
      strength () {
        return zxcvbn(this.password).score
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

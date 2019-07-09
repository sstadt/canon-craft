
<template lang="pug">
  .user-details
    .row
      .column.small-12.medium-6
        h2.u-mb-content Profile Information
        form.u-mb(@submit.prevent="updateUserDetails")
          text-input(
            label="Display Name",
            type="text",
            v-model="displayName", 
            v-validate="'required'"
            :error="errors.first('display-name')"
          )
          image-input(
            label="Avatar", 
            type="text",
            v-model="photoURL", 
            v-validate="'required'",
            :error="errors.first('avatar')"
          )
          submit-button(label="Save Details", :small="true")
</template>

<script>
  import TextInput from '@/components/forms/TextInput.vue'
  import ImageInput from '@/components/forms/ImageInput.vue'
  import SubmitButton from '@/components/buttons/SubmitButton.vue'

  export default {
    name: 'UserDetails',
    components: { TextInput, ImageInput, SubmitButton },
    props: {
      user: Object,
      data: Object
    },
    data () {
      return {
        displayName: this.user.displayName,
        photoURL: this.user.photoURL
      }
    },
    methods: {
      updateUserDetails () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('user/updateUser', {
              displayName: this.displayName,
              photoURL: this.photoURL
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
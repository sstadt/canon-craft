
<template lang="pug">
  modal(ref="modal", :dialog="true")
    template(slot="content")
      h3(v-if="heading") {{ heading }}
      p {{ message }}
      .controls.controls--right
        primary-button(label="No", :small="true", :secondary="true", @click="close")
        primary-button(label="Yes", :small="true", @click="confirm")
</template>

<script>
  import Modal from '@/components/ui/Modal.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import TextInput from '@/components/forms/TextInput.vue'

  export default {
    name: 'ConfirmDialog',
    components: { Modal, PrimaryButton, TextInput },
    props: {
      heading: String
    },
    data () {
      return {
        message: '',
        callback: () => {}
      }
    },
    methods: {
      ask ({ message, callback }) {
        this.message = message
        this.callback = callback
        this.$refs.modal.open()
      },
      confirm () {
        this.callback()
        this.close()
      },
      close () {
        this.callback = () => {}
        this.$refs.modal.close()
      }
    }
  }
</script>

<style lang="scss">
</style>
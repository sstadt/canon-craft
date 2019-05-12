
<template lang="pug">
  .npc-editor
    form(@submit.prevent="save", novalidate)
      text-input(
        label="Name", 
        type="game", 
        v-model="npc.name",
        validation="required"
      )
      image-input(
        label="Image",
        type="game",
        v-model="npc.image"
      )
      .game-input
        wysiwyg(v-model="npc.description")
      .controls
        .controls__group
          confirm-button(label="Delete", :small="true", @confirmed="remove")
        .controls__group
          submit-button(label="Save", :small="true")
</template>

<script>
  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import ConfirmButton from '@/components/buttons/ConfirmButton.vue'
  import TextInput from '@/components/forms/TextInput.vue'
  import ImageInput from '@/components/forms/ImageInput.vue'
  import Wysiwyg from '@/components/forms/Wysiwyg.vue'

  export default {
    name: 'NpcEditor',
    components: { SubmitButton, ConfirmButton, TextInput, ImageInput, Wysiwyg },
    props: {
      npc: Object
    },
    methods: {
      save () {
        this.$emit('save', this.npc)
      },
      remove () {
        this.$emit('remove', this.npc.id)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

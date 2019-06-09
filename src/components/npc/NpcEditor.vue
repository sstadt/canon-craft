
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
          primary-button(v-if="isNew", label="Cancel", :small="true", @click="cancel")
          confirm-button(v-else, label="Delete", :small="true", @confirmed="remove")
        .controls__group
          submit-button(label="Save", :small="true")
</template>

<script>
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import ConfirmButton from '@/components/buttons/ConfirmButton.vue'
  import TextInput from '@/components/forms/TextInput.vue'
  import ImageInput from '@/components/forms/ImageInput.vue'
  import Wysiwyg from '@/components/forms/Wysiwyg.vue'

  export default {
    name: 'NpcEditor',
    components: {
      PrimaryButton,
      SubmitButton,
      ConfirmButton,
      TextInput,
      ImageInput,
      Wysiwyg
    },
    props: {
      npc: Object,
      isNew: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      save () {
        this.$emit('save', this.npc)
      },
      remove () {
        this.$emit('remove', this.npc.id)
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

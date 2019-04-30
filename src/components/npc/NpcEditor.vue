
<template lang="pug">
  .npc-editor
    form(@submit.prevent="save", novalidate)
      text-input(
        label="Name", 
        type="game", 
        v-model="npc.name",
        validation="required"
      )
      .game-input
        wysiwyg(v-model="npc.description")
      .controls
        .controls__group
          submit-button(label="Save", :small="true")
</template>

<script>
  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import TextInput from '@/components/forms/TextInput.vue'
  import Wysiwyg from '@/components/forms/Wysiwyg.vue'
  import Tabs from '@/components/ui/Tabs.vue'
  import Tab from '@/components/ui/Tab.vue'

  export default {
    name: 'NpcEditor',
    components: { SubmitButton, TextInput, Wysiwyg },
    props: {
      npc: Object
    },
    methods: {
      save () {
        console.log('save')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

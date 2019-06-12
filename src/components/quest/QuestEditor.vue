
<template lang="pug">
  .quest-form
    form(@submit.prevent="save", novalidate)
      h2.u-mb-content Quest Details
      .game-input
        label(for="new_quest_title") Title
        input(type="text", name="title", id="new_quest_title", placeholder="Name", v-model="quest.title", v-validate="'required'")
        span.error(v-show="errors.has('title')") {{ errors.first('title') }}
      .game-input
        h3.label Objectives
        transition-group(name="slide-fade-left")
          .objective-input(v-for="(objective, index) in quest.objectives", :key="objective.id")
            input(type="number", :max="objective.goal", v-model="objective.completed")
            span /
            input(type="number", min="1", v-model="objective.goal")
            span :
            textarea(placeholder="Don't forget the objective!", rows="1", v-model="objective.description")
            transition(name="fade")
              icon-button(v-if="quest.objectives.length > 1", label="Remove Objective", icon="times", size="12px", @click="removeObjective(index)")
        primary-button(label="Add Objective", :text="true", classes="objective-input--add", @click="addObjective")
      .game-input
        wysiwyg(v-model="quest.description")
      .controls
        .controls__group(v-if="quest.id")
          confirm-button(label="Delete Quest", :small="true", @confirmed="removeQuest")
        .controls__group
          primary-button(label="Cancel", :small="true", :secondary="true", @click="cancel")
          submit-button(label="Save Quest", :small="true")
</template>

<script>
  import { Objective as newObjective } from '@/schema/Objective.js'

  import Wysiwyg from '@/components/forms/Wysiwyg.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import ConfirmButton from '@/components/buttons/ConfirmButton.vue'

  export default {
    name: 'QuestForm',
    components: {
      Wysiwyg, 
      PrimaryButton, SubmitButton, IconButton, ConfirmButton
    },
    props: {
      quest: {
        type: Object,
        default: {}
      }
    },
    methods: {
      addObjective () {
        this.quest.objectives.push(newObjective())
      },
      removeObjective (index) {
        this.quest.objectives.splice(index, 1)
      },
      save () {
        this.$emit('save', this.quest)
      },
      cancel () {
        this.$emit('cancel')
      },
      removeQuest () {
        this.$emit('remove')
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

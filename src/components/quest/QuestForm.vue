
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
              button.button.button--icon(@click="removeObjective(index)", v-if="quest.objectives.length > 1")
                span.u-hidden Remove Objective
                icon(name="times", size="12px")
        a.button.button--text.objective-input--add(@click="addObjective") Add Objective
      .game-input
        wysiwyg(v-model="quest.description")
      .controls
        .controls__group(v-if="quest.id")
          confirm-button(label="Delete Quest", :small="true", @confirmed="removeQuest")
        .controls__group
          button.button.button--small.button--secondary(type="button", @click="cancel") Cancel
          button.button.button--small(type="submit") Save Quest
</template>

<script>
  import { Objective as newObjective } from '@/schema/Objective.js'

  import Icon from '@/components/ui/Icon.vue'
  import Wysiwyg from '@/components/ui/Wysiwyg.vue'
  import ConfirmButton from '@/components/ui/ConfirmButton.vue'

  export default {
    name: 'QuestForm',
    components: { Icon, Wysiwyg, ConfirmButton },
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
        this.$emit('submit', this.quest)
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

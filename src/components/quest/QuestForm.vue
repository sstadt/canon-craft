
<template lang="pug">
  .quest-form
    form(@submit.prevent="saveQuest", novalidate)
      h2.u-mb-content Quest Details
      .game-input
        label(for="new_quest_title") Title
        input(type="text", name="title", id="new_quest_title", placeholder="Name", v-model="quest.title", v-validate="'required'")
        span.error(v-show="errors.has('title')") {{ errors.first('title') }}
      .game-input
        h3.label Objectives
        .objective-input(v-for="objective in quest.objectives", :key="objective.created_on")
          input(type="number", :max="objective.goal", v-model="objective.completed")
          span /
          input(type="number", min="1", v-model="objective.goal")
          span :
          textarea(placeholder="Don't forget the objective!", v-model="objective.description")
        a.button.button--text.objective-input--add Add Objective
      .game-input
        wysiwyg(v-model="quest.description")
      button(type="submit", class="button") Save
</template>

<script>
  import Wysiwyg from '@/components/ui/Wysiwyg.vue'

  export default {
    name: 'QuestForm',
    components: { Wysiwyg },
    props: {
      quest: {
        type: Object,
        default: {}
      }
    },
    methods: {
      saveQuest () {
        this.$emit('save', this.quest)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

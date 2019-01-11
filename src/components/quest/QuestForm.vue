
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
        transition-group(name="slide-fade-left")
          .objective-input(v-for="(objective, index) in quest.objectives", :key="objective.created_on")
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
      button(type="submit", class="button") Save Quest
</template>

<script>
  import { Objective } from '@/schema/Objective.js'

  import Icon from '@/components/ui/Icon.vue'
  import Wysiwyg from '@/components/ui/Wysiwyg.vue'

  export default {
    name: 'QuestForm',
    components: { Icon, Wysiwyg },
    props: {
      quest: {
        type: Object,
        default: {}
      }
    },
    methods: {
      addObjective () {
        this.quest.objectives.push(Objective())
      },
      removeObjective (index) {
        this.quest.objectives.splice(index, 1)
      },
      saveQuest () {
        this.$emit('submit', this.quest)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>

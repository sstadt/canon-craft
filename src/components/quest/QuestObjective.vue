
<template lang="pug">
  .quest__objective
    label.quest__objective__status(:for="objectiveId", :class="objectiveStatusClass", @click="toggleCompletion")
      span(v-if="objective.goal > 1") {{ objective.completed }}/{{ objective.goal }}:&nbsp;
      span {{ objective.description }}
    select.quest__objective__select(v-if="isGameMaster && objective.goal > 1", :id="objectiveId", v-model="currentStatus")
      option(value="0") 0 of {{ objective.goal }}
      option(v-for="n in (0, parseInt(objective.goal, 10))", :value="n", :key="n") {{ n }} of {{ objective.goal }}
</template>

<script>
  import { debounce } from '@/lib/util'

  export default {
    name: 'QuestObjective',
    props: {
      objective: Object,
      isGameMaster: Boolean
    },
    computed: {
      objectiveId () {
        return `objective-${this.objective.id}`
      },
      objectiveStatusClass () {
        return {
          'u-pointer': this.isGameMaster,
          completed: this.objective.completed === parseInt(this.objective.goal, 10)
        }
      },
      goal () {
        return parseInt(this.objective.goal, 10)
      }
    },
    data () {
      return {
        currentStatus: parseInt(this.objective.completed, 10)
      }
    },
    watch: {
      currentStatus: debounce(function () {
        this.updateObjectiveStatus()
      }, 300)
    },
    methods: {
      toggleCompletion: debounce(function () {
        if (this.isGameMaster && this.goal === 1) {
          this.currentStatus = (this.currentStatus > 0) ? 0 : 1;
        }
      }, 300),
      updateObjectiveStatus () {
        this.$emit('update-objective', {
          id: this.objective.id,
          completed: this.currentStatus
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .quest__objective {
    padding-left: 10px;
    line-height: 2;
    position: relative;

    &__status {
      display: block;

      &.completed {
        color: $body-text--completed;
        text-decoration: line-through;
      }
    }

    &__label {
      display: block;
      height: 100%;
      width: 100%;
    }

    &__select {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border: 0;
      -webkit-appearance: none;
      background-color: transparent;
      opacity: 0;
    }
  }
</style>

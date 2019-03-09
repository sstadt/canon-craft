
<template lang="pug">
  router-link.card.card--quest(:to="gameLink")
    //- img(v-if="quest.image", v-lazy="quest.image")
    .card__content
      h3.card__title {{ quest.title }}
      p.card__status(v-for="objective in quest.objectives") {{ objective.completed }}/{{ objective.goal }}: {{ objective.description }}
      //- p.card__description Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
</template>

<script>
  export default {
    name: 'QuestCard',
    props: {
      quest: Object
    },
    computed: {
      gameLink () {
        return `/game/${this.quest.game}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

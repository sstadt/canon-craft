
<template lang="pug">
  .game-characters
    game-character(v-for="character in characters", :character="character", :key="character.id")
</template>

<script>
  import GameCharacter from '@/components/game/GameCharacter.vue'

  export default {
    name: 'GameCharacters',
    components: { GameCharacter },
    props: {
      characters: Array
    }
  }
</script>

<style scoped lang="scss">
  .game-characters {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    @include mobile-only {
      margin-top: 20px;
      margin-bottom: 0;
      justify-content: center;
    }
  }
</style>

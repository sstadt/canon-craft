
<template lang="pug">
  .npcs
    .row.small-up-1.medium-up-2.x-large-up-3
      .column(v-for="npc in npcs", :key="npc.id")
        npc-card(:npc="npc", @show="showNpc(npc)")
</template>

<script>
  import NpcCard from '@/components/npc/NpcCard.vue'

  export default {
    name: 'Npcs',
    components: { NpcCard },
    props: {
      isGameMaster: Boolean
    },
    data () {
      activeNpc: null
    },
    computed: {
      npcs () {
        return [
          { id: 1, name: 'Jon Snow', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 2, name: 'Denaeris Targaryan, mother of dragons', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 3, name: 'Tyrion Lannister', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 4, name: 'Sansa Stark', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 5, name: 'Aria Stark', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 6, name: 'Brandon Stark', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
        ]
      }
    },
    methods: {
      showNpc(npc) {
        this.activeNpc = npc
        // show drawer
      }
    }
  }
</script>

<style scoped lang="scss">
  .npcs {
    .column {
      padding: 0;
    }
  }
</style>
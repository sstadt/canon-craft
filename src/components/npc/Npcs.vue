
<template lang="pug">
  .npcs
    .game-controls
      search-control.game-controls__search(v-model="searchParam")
      primary-button(v-if="isGameMaster", label="New NPC", :small="true", @click="newNpc")
    .row.small-up-1.medium-up-2.x-large-up-3
      .column(v-for="npc in npcs", :key="npc.id")
        npc-card(:npc="npc", @show="showNpc(npc)")
    side-panel(ref="npcSidePanel", :title="sidePanelTitle", :image="sidePanelImage")
      template(slot="content", v-if="shownNpc")
        .content(v-html="shownNpcDescription")
    modal(ref="npcModal", v-if="isGameMaster")
      template(slot="content")
        npc-editor(v-if="editingNpc", :npc="editingNpc")
</template>

<script>
  import { clone } from '@/lib/util.js'
  import { Npc as newNpc } from '@/schema/Npc.js'

  import Modal from '@/components/ui/Modal.vue'
  import SidePanel from '@/components/ui/SidePanel.vue'
  import SearchControl from '@/components/forms/SearchControl.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import NpcCard from '@/components/npc/NpcCard.vue'
  import NpcEditor from '@/components/npc/NpcEditor.vue'

  export default {
    name: 'Npcs',
    components: {
      Modal,
      SidePanel,
      SearchControl, 
      PrimaryButton, 
      NpcCard,
      NpcEditor
    },
    props: {
      isGameMaster: Boolean
    },
    data () {
      return {
        shownNpc: null,
        editingNpc: null,
        searchParam: ''
      }
    },
    computed: {
      npcs () {
        return [
          { id: 1, name: 'Jon Snow', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 2, name: 'Denaeris Targaryan, mother of dragons', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 3, name: 'Tyrion Lannister', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 4, name: 'Sansa Stark', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
          { id: 5, name: 'Aria Stark', image: '//placehold.it/75x110', description: 'Lorem ipsum dolor sit amet consecteteur adipiscing elit. Lorem ipsum dolor sit amet consecteteur adipiscing elit.' },
          { id: 6, name: 'Brandon Stark', image: '//placehold.it/75x110', description: 'lorem ipsum dolor sit amet' },
        ]
      },
      shownNpcDescription () {
        return (this.shownNpc) ? this.$sanitize(this.shownNpc.description) : ''
      },
      sidePanelTitle () {
        return (this.shownNpc) ? this.shownNpc.name : ''
      },
      sidePanelImage () {
        return (this.shownNpc) ? this.shownNpc.image : null
      }
    },
    methods: {
      showNpc (npc) {
        this.shownNpc = npc
        this.$refs.npcSidePanel.open()
      },
      newNpc () {
        this.editingNpc = newNpc()
        this.$refs.npcModal.open()
      },
      editNpc (npc) {
        this.editingNpc = clone(npc)
        this.$refs.npcModal.open()
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

  .npc-header {
    display: flex;

    &__image {
      align-self: flex-start;
    }

    &__title {
      padding-left: $grid-gutter / 2;
    }
  }
</style>
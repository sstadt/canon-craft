
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
        npc-editor(
          v-if="editingNpc", 
          :npc="editingNpc", 
          @save="saveNewNpc"
        )
</template>

<script>
  import { mapState } from 'vuex'
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
      isGameMaster: Boolean,
      campaign: String
    },
    data () {
      return {
        shownNpc: null,
        editingNpc: null,
        searchParam: ''
      }
    },
    computed: {
      ...mapState({
        allNpcs: state => state.npcs.all
      }),
      npcs () {
        return this.allNpcs.filter(npc => npc.campaign === this.campaign)
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
        this.editingNpc = newNpc({ campaign: this.campaign })
        this.$refs.npcModal.open()
      },
      editNpc (npc) {
        this.editingNpc = clone(npc)
        this.$refs.npcModal.open()
      },
      saveNewNpc (npc) {
        this.$store.dispatch('npcs/create', npc)
        this.$refs.npcModal.close()
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
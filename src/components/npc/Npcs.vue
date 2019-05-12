
<template lang="pug">
  .npcs
    .game-controls
      search-control.game-controls__search(v-model="searchParam")
      primary-button(v-if="isGameMaster", label="New NPC", :small="true", @click="newNpc")
    .row.small-up-1.medium-up-2.x-large-up-3
      .column(v-for="npc in npcs", :key="npc.id")
        npc-card(:npc="npc", @show="showNpc(npc)")
    side-panel(ref="npcSidePanel", :title="sidePanelTitle", :image="sidePanelImage")
      template(slot="controls", v-if="isGameMaster")
        icon-button(label="Edit", icon="quill", @click="editNpc(shownNpc)")
      template(slot="share", v-if="shownNpc")
        .npcs__permissions(v-if="isGameMaster")
          character-permissions(
            :document-id="shownNpc.id",
            :characters="allCharacters", 
            :players="shownNpc.players",
            @toggleplayer="togglePlayer",
            @enableall="enableAllPlayers"
            @disableall="disableAllPlayers"
          )
      template(slot="content", v-if="shownNpc")
        .content(v-html="shownNpcDescription")
    modal(ref="npcModal", v-if="isGameMaster")
      template(slot="content")
        npc-editor(
          v-if="editingNpc", 
          :npc="editingNpc", 
          @save="save",
          @remove="removeNpc"
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
  import IconButton from '@/components/buttons/IconButton.vue'
  import CharacterPermissions from '@/components/characters/CharacterPermissions.vue'
  import NpcCard from '@/components/npc/NpcCard.vue'
  import NpcEditor from '@/components/npc/NpcEditor.vue'

  export default {
    name: 'Npcs',
    components: {
      Modal,
      SidePanel,
      SearchControl, 
      PrimaryButton, 
      IconButton,
      CharacterPermissions,
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
        allNpcs: state => state.npcs.all,
        allCharacters: state => state.characters.all
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
      save (npc) {
        if (npc.id) {
          this.saveNpc(npc)
        } else {
          this.saveNewNpc(npc)
        }
      },
      saveNpc (npc) {
        this.$store.dispatch('npcs/update', npc)
        this.shownNpc = clone(npc)
        this.$refs.npcModal.close()
      },
      saveNewNpc (npc) {
        this.$store.dispatch('npcs/create', npc)
        this.$refs.npcModal.close()
      },
      removeNpc (npcId) {
        this.$refs.npcModal.close()
        this.$refs.npcSidePanel.close()
        this.$store.dispatch('npcs/remove', npcId)
      },
      togglePlayer ({ document, player }) {
        let currentPlayers = this.shownNpc.players
        let playerIndex = currentPlayers.indexOf(player)

        if (playerIndex > -1) {
          this.shownNpc.players.splice(playerIndex, 1)
        } else {
          this.shownNpc.players.push(player)
        }

        this.$store.dispatch('npcs/update', {
          id: document,
          players: this.shownNpc.players
        })
      },
      enableAllPlayers (npcId) {
        let players = this.allCharacters.map(character => character.player)

        this.shownNpc.players = players
        this.$store.dispatch('npcs/update', { id: this.shownNpc.id, players })
      },
      disableAllPlayers (npcId) {
        this.shownNpc.players = []
        this.$store.dispatch('npcs/update', { id: this.shownNpc.id, players: [] })
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

<template lang="pug">
  .npcs
    .game-controls
      search-control.game-controls__search(v-model="searchParam")
      primary-button(v-if="isGameMaster", label="New NPC", :small="true", @click="newNpc")
    transition-group.row.small-up-1.medium-up-2.x-large-up-3(name="fade", tag="div")
      .column(v-for="npc in filteredNpcs", :key="npc.id")
        npc-card(:npc="npc", @show="showNpc(npc)")
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
  import { clone, debounce } from '@/lib/util.js'
  import { Npc as newNpc } from '@/schema/Npc.js'

  import Modal from '@/components/ui/Modal.vue'
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
      SearchControl, 
      PrimaryButton, 
      IconButton,
      CharacterPermissions,
      NpcCard,
      NpcEditor
    },
    props: {
      isGameMaster: Boolean,
      campaign: String,
      characters: Array
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
        currentUser: state => state.user.currentUser,
        allNpcs: state => state.npcs.all
      }),
      npcs () {
        return this.allNpcs.filter(npc => npc.campaign === this.campaign)
      },
      filteredNpcs () {
        return (this.searchParam.length > 2) ? this.filterNpcs() : this.npcs
      },
      shownNpcDescription () {
        return (this.shownNpc) ? this.$sanitize(this.shownNpc.description) : ''
      },
      // sidePanelTitle () {
      //   return (this.shownNpc) ? this.shownNpc.name : ''
      // },
      // sidePanelImage () {
      //   return (this.shownNpc) ? this.shownNpc.image : null
      // }
    },
    methods: {
      filterNpcs () {
        let searchParam = this.searchParam.toLowerCase()
        
        return this.npcs.filter(npc => {
          return Boolean(
            npc.name.toLowerCase().indexOf(searchParam) > -1 ||
            npc.description.toLowerCase().indexOf(searchParam) > -1
          )
        })
      },
      showNpc (npc) {
        // this.shownNpc = npc
        this.$store.dispatch('sidepanel/showContent', {
          type: 'npc',
          data: npc
        })
      },
      newNpc () {
        this.editingNpc = newNpc({
          campaign: this.campaign,
          created_by: this.currentUser.uid
        })
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
        // this.$refs.npcSidePanel.close()
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
        let players = this.shownNpc.players.slice()

        this.characters.forEach(character => {
          if (players.indexOf(character.player) < 0) {
            players.push(character.player)
          }
        })

        this.shownNpc.players = players
        this.$store.dispatch('npcs/update', { id: this.shownNpc.id, players })
      },
      disableAllPlayers (npcId) {
        let players = this.shownNpc.players.slice()
        
        this.characters.forEach(character => {
          let index = players.indexOf(character.player)

          if (index > -1) {
            players.splice(index, 1)
          }
        })

        this.shownNpc.players = players
        this.$store.dispatch('npcs/update', { id: this.shownNpc.id, players })
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
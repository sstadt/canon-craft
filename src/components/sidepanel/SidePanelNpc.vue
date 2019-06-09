
<template lang="pug">
  .side-panel--npc
    .side-panel__header
      img.side-panel__image(v-lazy="image", v-if="image")
      .side-panel__header__content
        h2.side-panel__title {{ title }}
        .side-panel__header__controls(v-if="isGameMaster")
          icon-button(label="Edit", icon="quill", @click="$refs.editModal.open()")
      .side-panel__share
        .npcs__permissions(v-if="isGameMaster")
          character-permissions(
            :document-id="data.id",
            :characters="characters", 
            :players="data.players",
            @toggleplayer="togglePlayer",
            @enableall="enableAllPlayers"
            @disableall="disableAllPlayers"
          )
    .side-panel__content
      .content(v-html="description")
    modal(ref="editModal", v-if="isGameMaster")
      template(slot="content")
        npc-editor(:npc="data", @save="save", @remove="remove")
</template>

<script>
  import { mapState } from 'vuex'

  import Modal from '@/components/ui/Modal.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import CharacterPermissions from '@/components/characters/CharacterPermissions.vue'
  import NpcEditor from '@/components/npc/NpcEditor.vue'

  export default {
    name: 'SidePanelNpc',
    components: { Modal, CharacterPermissions, IconButton, NpcEditor },
    props: {
      data: Object,
      characters: Array,
      isGameMaster: Boolean
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      }),
      title () {
        return this.data.name
      },
      image () {
        return this.data.image
      },
      description () {
        return this.$sanitize(this.data.description)
      }
    },
    methods: {
      save () {
        this.$store.dispatch('npcs/update', this.data)
        this.$refs.editModal.close()
      },
      remove () {
        this.$refs.editModal.close()
        this.$store.dispatch('sidepanel/close')
        this.$store.dispatch('npcs/remove', this.data.id)
      },
      togglePlayer ({ document, player }) {
        let currentPlayers = this.data.players
        let playerIndex = currentPlayers.indexOf(player)

        if (playerIndex > -1) {
          this.data.players.splice(playerIndex, 1)
        } else {
          this.data.players.push(player)
        }

        this.$store.dispatch('npcs/update', {
          id: document,
          players: this.data.players
        })
      },
      enableAllPlayers (npcId) {
        let players = this.data.players.slice()

        this.characters.forEach(character => {
          if (players.indexOf(character.player) < 0) {
            players.push(character.player)
          }
        })

        this.data.players = players
        this.$store.dispatch('npcs/update', { id: this.data.id, players })
      },
      disableAllPlayers (npcId) {
        let players = this.data.players.slice()
        
        this.characters.forEach(character => {
          let index = players.indexOf(character.player)

          if (index > -1) {
            players.splice(index, 1)
          }
        })

        this.data.players = players
        this.$store.dispatch('npcs/update', { id: this.data.id, players })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
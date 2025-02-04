
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

  import { permissions } from '@/mixins/character.js'

  import Modal from '@/components/ui/Modal.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import CharacterPermissions from '@/components/characters/CharacterPermissions.vue'
  import NpcEditor from '@/components/npc/NpcEditor.vue'

  export default {
    name: 'SidePanelNpc',
    mixins: [ permissions ],
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
        this.update(this.data)
        this.$refs.editModal.close()
      },
      remove () {
        this.$refs.editModal.close()
        this.$store.dispatch('sidepanel/close')
        this.$store.dispatch('npcs/remove', this.data.id)
      },
      update (data) {
        this.$store.dispatch('npcs/update', data)
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
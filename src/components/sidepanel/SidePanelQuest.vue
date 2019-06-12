
<template lang="pug">
  .side-panel--quest
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
      .objectives
        p.objectives__item(v-for="objective in objectives") {{ objective.completed }}/{{ objective.goal }}: {{ objective.description }}
      .content(v-html="description")
    modal(ref="editModal", v-if="isGameMaster")
      template(slot="content")
        quest-editor(:quest="data", @save="save", @remove="remove")
</template>

<script>
  import { mapState } from 'vuex'

  import { permissions } from '@/mixins/character.js'

  import Modal from '@/components/ui/Modal.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import CharacterPermissions from '@/components/characters/CharacterPermissions.vue'
  import QuestEditor from '@/components/quest/QuestEditor.vue'

  export default {
    name: 'SidePanelNpc',
    mixins: [ permissions ],
    components: { Modal, CharacterPermissions, IconButton, QuestEditor },
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
        return this.data.title
      },
      image () {
        return this.data.image
      },
      objectives () {
        return (this.data.objectives) ? this.data.objectives : []
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
        this.$store.dispatch('quests/remove', this.data.id)
      },
      update (data) {
        this.$store.dispatch('quests/update', data)
      }
    }
  }
</script>

<style scoped lang="scss">
  .objectives {
    margin-bottom: $content-gutter;

    &__item:not(:last-child) {
      margin-bottom: 8px;
    }
  }
</style>
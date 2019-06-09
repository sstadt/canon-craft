
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
          :is-new="true",
          @save="save",
          @cancel="$refs.npcModal.close()"
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
      }
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
      save (npc) {
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

<template lang="pug">
  .game-character
    p.game-character__name {{ character.name }}
    a.button.button--icon.game-character__edit
      icon(name="quill", size="22px")
</template>

<script>
  import { mapState } from 'vuex'

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'

  export default {
    name: 'GameCharacter',
    components: { Modal, Icon },
    props: {
      character: Object
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      }),
      isOwner () {
        return this.currentUser && this.currentUser.uid === this.character.player
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-character {
    position: relative;
    padding-right: 30px;

    &__edit {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
</style>

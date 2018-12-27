
<template lang="pug">
  .game-character
    .game-character__avatar
      img(:src="character.avatar")
    p.game-character__name {{ character.name }}
    a.button.button--icon.game-character__edit(v-if="isOwner", @click="$refs.editCharacterModal.open()")
      span.u-hidden Edit Character
      icon(name="quill", size="22px")
    modal(ref="editCharacterModal")
      template(slot="content")
        form.edit-character-form(@submit.prevent="updateCharacter", novalidate)
          .edit-character-form__avatar
            img(:src="avatar")
          .edit-character-form__fields
            .form-input
              input(type="text", name="name", placeholder="Character Name", v-model="name", v-validate="'required'")
              span.error(v-show="errors.has('name')") {{ errors.first('name') }}
            .form-input
              input(type="text", name="avatar", placeholder="Character Image", v-model="avatar", v-validate="'required'")
              span.error(v-show="errors.has('avatar')") {{ errors.first('avatar') }}
            button.button.button--small(type="submit") Save
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
    data () {
      return {
        name: this.character.name,
        avatar: this.character.avatar
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      }),
      isOwner () {
        return this.currentUser && this.currentUser.uid === this.character.player
      }
    },
    methods: {
      updateCharacter () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('characters/update', {
              id: this.character.id,
              name: this.name,
              avatar: this.avatar
            })
            this.$refs.editCharacterModal.close()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .game-character {
    position: relative;
    padding-right: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &__avatar {
      max-width: 34px;
      flex-shrink: 0;
    }

    &__name {
      padding-left: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__edit {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .edit-character-form {
    display: flex;

    &__avatar {
      max-width: 50px;
      flex-shrink: 0;
    }

    &__fields {
      padding-left: 10px;
    }
  }
</style>

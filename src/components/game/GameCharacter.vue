
<template lang="pug">
  .game-character
    .game-character__avatar
      img(:src="character.avatar")
    a.game-character__name(v-if="showSheetLink", :href="character.url", target="_blank") {{ character.name }}
    p.game-character__name(v-else) {{ character.name }}
    icon-button(
      v-if="isOwner",
      label="Edit Character",
      icon="quill",
      size="22px",
      classes="game-character__edit",
      @click="$refs.editCharacterModal.open()"
    )
    modal(ref="editCharacterModal")
      template(slot="content")
        form.edit-character-form(@submit.prevent="updateCharacter", novalidate)
          .form-input
            label Character Name
            input(type="text", name="name", placeholder="Character Name", v-model="name", v-validate="'required'")
            span.error(v-show="errors.has('name')") {{ errors.first('name') }}
          .edit-character-form__avatar
            img(:src="avatar")
            .form-input
              label Avatar
              input(type="text", name="avatar", placeholder="Character Image", v-model="avatar", v-validate="'required'")
              span.error(v-show="errors.has('avatar')") {{ errors.first('avatar') }}
          .form-input
            label Character Sheet URL
            input(type="text", name="url", placeholder="https://www.dndbeyond.com/profile/UserName/characters/1234567", v-model="url", v-validate="'url'")
            span.error(v-show="errors.has('url')") {{ errors.first('url') }}
          .controls
            .controls__group
              submit-button(label="Save", :small="true")
</template>

<script>
  /**
   * NOTE: This is a TEMPORARY component
   * 
   * This will eventually be replaced with a standalone
   * character feature that allows for a full character
   * sheet.
   * 
   * Only perform bug fixes and minor enhancements here.
   */
  import { mapState } from 'vuex'

  import Modal from '@/components/ui/Modal.vue'

  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'GameCharacter',
    components: { Modal, SubmitButton, IconButton },
    props: {
      character: Object
    },
    data () {
      return {
        name: this.character.name,
        avatar: this.character.avatar,
        url: this.character.url || ''
      }
    },
    computed: {
      ...mapState({
        currentUser: state => state.user.currentUser
      }),
      isOwner () {
        return this.currentUser && this.currentUser.uid === this.character.player
      },
      showSheetLink () {
        return this.character.url.length > 0
      }
    },
    methods: {
      updateCharacter () {
        this.$validator.validateAll().then((isValid) => {
          if (isValid) {
            this.$store.dispatch('characters/update', {
              id: this.character.id,
              name: this.name,
              avatar: this.avatar,
              url: this.url
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
    &__avatar {
      display: flex;
      align-items: flex-start;

      .form-input {
        flex-grow: 1;
      }

      img {
        flex-shrink: 0;
        max-width: 66px;
        margin-right: 10px;
      }
    }
  }
</style>

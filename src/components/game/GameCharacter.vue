
<template lang="pug">
  .game-character
    icon-button.game-character__avatar(v-if="isOwner", label="Edit Character", :image="character.avatar", @click="$refs.editCharacterModal.open()")
    a.game-character__avatar(v-else-if="showSheetLink", :href="character.url", target="_blank")
      img(v-lazy="avatar")
    .game-character__avatar(v-else)
      img(v-lazy="avatar")
    a.game-character__name.u-hidden-mobile-only(v-if="showSheetLink", :href="character.url", target="_blank") {{ character.name }}
    p.game-character__name.u-hidden-mobile-only(v-else) {{ character.name }}
    modal(v-if="isOwner", ref="editCharacterModal")
      template(slot="content")
        form.edit-character-form(@submit.prevent="updateCharacter", novalidate)
          .form-input
            label Character Name
            input(type="text", name="name", placeholder="Character Name", v-model="name", v-validate="'required'")
            span.error(v-show="errors.has('name')") {{ errors.first('name') }}
          .edit-character-form__avatar
            img(v-lazy="avatar")
            .form-input
              label Avatar
              input(type="text", name="avatar", placeholder="Character Image", v-model="avatar", v-validate="'required'")
              span.error(v-show="errors.has('avatar')") {{ errors.first('avatar') }}
          .form-input
            label 
              span Character Sheet URL
            input(type="text", name="url", placeholder="https://www.dndbeyond.com/profile/UserName/characters/1234567", v-model="url", v-validate="'url'")
            a.button.button--text(v-if="!errors.has('url') && url.length > 0", :href="url", target="_blank")
              span open character
              icon(name="external-link", size="12px")
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

  import Icon from '@/components/ui/Icon.vue'
  import Modal from '@/components/ui/Modal.vue'

  import SubmitButton from '@/components/buttons/SubmitButton.vue'
  import IconButton from '@/components/buttons/IconButton.vue'

  export default {
    name: 'GameCharacter',
    components: { Icon, Modal, SubmitButton, IconButton },
    props: {
      character: Object
    },
    data () {
      return {
        name: this.character.name,
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
      },
      avatar () {
        return (this.character.avatar.length > 0) ? this.character.avatar : '/img/ph-CharacterAvatar.jpg';
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;

    @include mobile-only {
      margin-right: 15px;
    }

    @include tablet-up {
      width: calc(50% - 10px);

      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    &__avatar {
      max-width: 40px;
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

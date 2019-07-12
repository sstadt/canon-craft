
<template lang="pug">
  .image-input(:class="wrapperClass")
    label(v-if="!hideLabel") {{ label }}
    .image-input__controls
      input.image-input__input(type="text", :name="name", v-model="currentValue", :class="inputClass")
      primary-button.image-input__button(label="Change", :inline="true", @click="openPicker")
    span.error(v-if="error") {{ error }}
    modal(ref="imagePicker")
      template(slot="content")
        tabs
          tab(heading="Image Library")
            p TODO
          tab(heading="Upload", :selected="true")
            croppa.image-input__cropper(
              ref="imageCropper",
              :width="cropperWidth",
              :height="cropperHeight",
              canvas-color="#f3f3f3"
            )
            .image-input__cropper-controls
              primary-button(label="Upload", @click="startUpload")
</template>

<script>
  import { mapState } from 'vuex'

  import Modal from '@/components/ui/Modal.vue'
  import Tabs from '@/components/ui/Tabs.vue'
  import Tab from '@/components/ui/Tab.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import TextInput from '@/components/forms/TextInput.vue'

  export default {
    name: 'ImageInput',
    extends: TextInput,
    components: { Modal, Tabs, Tab, PrimaryButton },
    props: {
      aspectRatio: {
        type: String,
        default: 'square',
        validator: value => {
          let options = ['square', 'portrait', 'landscape']
          return options.indexOf(value) > -1
        }
      }
    },
    computed: {
      ...mapState({
        storageRef: state => state.user.storageRef,
        currentUser: state => state.user.currentUser
      }),
      cropperHeight () {
        return (this.aspectRatio === 'square' || this.aspectRatio === 'portrait')
          ? 200
          : 150
      },
      cropperWidth () {
        return (this.aspectRatio === 'square' || this.aspectRatio === 'landscape')
          ? 200
          : 150
      }
    },
    methods: {
      openPicker () {
        this.$refs.imagePicker.open()
      },
      closePicker () {
        this.$refs.imagePicker.close()
      },
      startUpload () {
        const fileData = this.$refs.imageCropper.getChosenFile()
        const fileRef = this.storageRef.child(fileData.name)

        this.$refs.imageCropper.generateBlob(blob => {
          var task = fileRef.put(blob)

          task.on('state_changed', snapshot => {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(percentage)
          }, err => {
            // handle error
          }, () => {
            fileRef.getDownloadURL()
              .then(url => console.log(url))
          })
        }, 'image/jpeg', 0.8) // 80% compressed
      }
    }
  }
</script>

<style scoped lang="scss">
  .image-input {
    &__controls {
      display: flex;
    }

    &__button {
      margin-left: 10px;
    }

    &__cropper {
      display: flex;
      justify-content: center;
    }

    &__cropper-controls {
      display: flex;
      margin-top: $grid-gutter;
      justify-content: center;

      & > * {
        margin-left: $grid-gutter / 4;
        margin-right: $grid-gutter / 4;
      }
    }
  }
</style>

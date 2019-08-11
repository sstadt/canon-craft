
<template lang="pug">
  .image-input(:class="wrapperClass")
    label {{ label }}
    .image-input__image
      img(:src="currentValue")
      icon-button.image-input__button(
        label="Change", 
        icon="cog", 
        :primary="true",
        @click="openPicker"
      )
    modal(ref="imagePicker", :slim="true")
      template(slot="content")
        tabs
          tab(heading="Image Library", :selected="true")
            .image-library
              .image-library__grid.row.small-up-2.medium-up-5(v-if="imageLibrary.length > 0")
                .column(v-for="image in imageLibrary")
                  button.image-library__image.button--plain(
                    type="button",
                    :class="{ 'image-library__image--selected': image.url === currentValue }",
                    @click="setImage(image.url)"
                  )
                    img(v-lazy="image.url")
              p(v-else) You haven't uploaded any images yet
            .controls.controls--right
              primary-button(label="Close", :small="true", @click="$refs.imagePicker.close()")
          tab(heading="Upload")
            .image-input__upload
              .image-input__upload__crop
                .image-input__upload__cropper
                  croppa(
                    ref="imageCropper",
                    :width="cropperWidth",
                    :height="cropperHeight",
                    :accept="'image/*'"
                    canvas-color="#f3f3f3",
                    @file-choose="handleFileChoose",
                    @image-remove="handleImageRemove"
                  )
                  transition(name="fade")
                    progress-bar.image-input__upload__progress(v-if="showProgress", :progress="uploadProgress")
                .image-input__upload__cropper-controls
                  primary-button(label="Upload", :disabled="uploadDisabled", :small="true", :wide="true", @click="generateBlobAndUpload")
              .u-or(v-if="$mq !== 'mobile'")
              .u-or.u-or--horizontal(v-else)
              form.image-input__upload__web(@submit.prevent="setImageFromUrl")
                text-input.image-input__upload__web-link(ref="urlInput", label="Enter URL", v-model="fromUrlValue", :center-label="true")
                primary-button(label="Update", :small="true")
</template>

<script>
  import { mapState } from 'vuex'
  import { getUniqueFileName } from '@/lib/util.file.js'

  import Modal from '@/components/ui/Modal.vue'
  import Tabs from '@/components/ui/Tabs.vue'
  import Tab from '@/components/ui/Tab.vue'
  import ProgressBar from '@/components/ui/ProgressBar.vue'
  import IconButton from '@/components/buttons/IconButton.vue'
  import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
  import TextInput from '@/components/forms/TextInput.vue'

  const CROPPER_HEIGHTS = {
    'square': 200,
    'portrait': 200,
    'landscape': 150
  }

  const CROPPER_WIDTHS = {
    'square': 200,
    'portrait': 150,
    'landscape': 200
  }

  export default {
    name: 'ImageInput',
    extends: TextInput,
    components: {
      Modal, Tabs, Tab, ProgressBar,
      TextInput, PrimaryButton, IconButton
    },
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
    data () {
      return {
        fromUrlValue: this.value,
        showProgress: false,
        uploadProgress: 0,
        uploading: false,
        uploadReady: false
      }
    },
    computed: {
      ...mapState({
        storageRef: state => state.files.storageRef,
        currentUser: state => state.user.currentUser,
        imageLibrary: state => state.files.images
      }),
      cropperHeight () {
        return CROPPER_HEIGHTS[this.aspectRatio]
      },
      cropperWidth () {
        return CROPPER_WIDTHS[this.aspectRatio]
      },
      uploadDisabled () {
        return this.uploading || !this.uploadReady
      }
    },
    methods: {
      openPicker () {
        this.$refs.imagePicker.open()
      },
      closePicker () {
        this.$refs.imagePicker.close()
      },
      handleFileChoose () {
        this.uploadReady = true
      },
      handleImageRemove () {
        this.uploadReady = false
      },
      generateBlobAndUpload () {
        this.$refs.imageCropper.generateBlob(blob => 
          this.uploadImage(blob), 'image/jpeg', 0.8) // 80% compressed
      },
      uploadImage (blob) {
        const fileData = this.$refs.imageCropper.getChosenFile()
        const fileName = getUniqueFileName(fileData.name)
        const fileRef = this.storageRef.child(fileName)

        this.uploadProgress = 0
        this.showProgress = true

        this.$store.dispatch('user/setUploadToken', `${this.currentUser.uid}/${fileName}`)
          .then(() => {
            var task = fileRef.put(blob)

            this.uploadProgress = 10
  
            task.on('state_changed', snapshot => {
              this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, err => { // error
              console.log('*** Unhandled Upload Error **********')
              console.log(err)
              this.$store.dispatch('toast/send', 'Could not upload your image at this time')
            }, () => { // completed
              this.showProgress = false
              fileRef.getDownloadURL().then(url => {
                this.$store.dispatch('user/addImage', url)
                this.setImage(url)
                this.closeImagePicker()
              })
            })
          })
          .catch((reason) => {
            this.uploadProgress = 0
            this.showProgress = false
            this.$store.dispatch('toast/send', 'There was an error uploading your image')
          })
      },
      setImageFromUrl () {
        this.setImage(this.fromUrlValue)
        this.closeImagePicker()
      },
      setImage (url) {
        this.fromUrlValue = url
        this.currentValue = url
        this.$emit('input', url)
      },
      closeImagePicker () {
        this.$refs.imagePicker.close()
      }
    }
  }
</script>

<style scoped lang="scss">
  .image-library {
    &__image {
      transition: 0.3s ease all;
      border: 2px solid transparent;

      img {
        object-fit: contain;
      }

      &:before {
        content: '';
        float: left;
        padding-top: 100%;
      }

      &:hover {
        box-shadow: $drop-shadow;
      }

      &--selected {
        border: 2px solid $color--primary;
        box-shadow: $drop-shadow;
      }
    }
  }

  .image-input {
    &__image {
      position: relative;
      line-height: 0;
    }

    &__button {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    &__upload {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      @include tablet-up {
        flex-direction: row;
      }

      &__cropper {
        position: relative;
        margin: 0 auto;
      }

      &__cropper-controls {
        display: flex;
        margin-top: $grid-gutter / 2;
        justify-content: center;
      }

      &__progress {
        position: absolute;
        width: calc(100% - #{$grid-gutter});
        bottom: $grid-gutter / 2;
        left: $grid-gutter / 2;
      }

      &__crop {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      &__web {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      &__web-link {
        width: 100%;
      }
    }
  }
</style>

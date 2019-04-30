
<template lang="pug">
  .wysiwyg
    editor-menu-bubble(:editor="editor")
      .menububble(slot-scope="{ commands, isActive, getMarkAttrs, menu }", :class="{ 'is-active': menu.isActive }", :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`")
        form.menububble__form(v-if="linkMenuIsActive", @submit.prevent="setLinkUrl(commands.link, linkUrl)")
          input.menububble__input(type="text", v-model="linkUrl", placeholder="https://", ref="linkInput", @keydown.esc="hideLinkMenu")
          button.menububble__button(type="button", @click="setLinkUrl(commands.link, null)")
            span.u-hidden Save Link
            icon(name="link", size="14")
        template(v-else)
          button.menububble__button(@click="showLinkMenu(getMarkAttrs('link'))", :class="{ 'is-active': isActive.link() }")
            span.u-hidden Add Link
            icon(name="link", size="14")
    editor-menu-bar(:editor="editor")
      .wysiwyg__controls(slot-scope="{ commands, isActive }")
        .wysiwyg__control-group
          wysiwyg-button(label="Bold", icon="bold", :size="iconSize", :class="{ 'is-active': isActive.bold() }", @click="commands.bold")
          wysiwyg-button(label="Italic", icon="italic", :size="iconSize", :class="{ 'is-active': isActive.italic() }", @click="commands.italic")
          wysiwyg-button(label="Underline", icon="underline", :size="iconSize", :class="{ 'is-active': isActive.underline() }", @click="commands.underline")
          wysiwyg-button(label="Strikethrough", icon="strikethrough", :size="iconSize", :class="{ 'is-active': isActive.strike() }", @click="commands.strike")
        .wysiwyg__control-group
          wysiwyg-button(label="H2", icon="h2", :size="headingIconSize", :class="{ 'is-active': isActive.heading({ level: 2 }) }", @click="commands.heading({ level: 2 })")
          wysiwyg-button(label="H3", icon="h3", :size="headingIconSize", :class="{ 'is-active': isActive.heading({ level: 3 }) }", @click="commands.heading({ level: 3 })")
        .wysiwyg__control-group
          wysiwyg-button(label="Unordered List", icon="unordered-list", :size="iconSize", :class="{ 'is-active': isActive.bullet_list() }", @click="commands.bullet_list")
          wysiwyg-button(label="Ordered List", icon="ordered-list", :size="iconSize", :class="{ 'is-active': isActive.ordered_list() }", @click="commands.ordered_list")
        .wysiwyg__control-group
          wysiwyg-button(label="Add Image", icon="image", :size="iconSize", @click="showImagePrompt(commands.image)")
    editor-content(:editor="editor")
</template>

<script>
  import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
  import {
    Bold, Italic, Underline, Strike,
    Heading, ListItem, BulletList, OrderedList,
    Link, Image
  } from 'tiptap-extensions'

  import Icon from '@/components/ui/Icon.vue'
  import WysiwygButton from '@/components/buttons/WysiwygButton.vue'

  export default {
    name: 'Wysiwyg',
    components: { 
      EditorContent, EditorMenuBar, EditorMenuBubble, 
      Icon, WysiwygButton
    },
    props: {
      value: String
    },
    data () {
      return {
        editor: null,
        iconSize: '14px',
        headingIconSize: '17px',
        linkUrl: null,
        linkMenuIsActive: false
      }
    },
    mounted () {
      this.editor = new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new Strike(),
          new Heading({ levels: [2, 3] }),
          new ListItem(),
          new BulletList(),
          new OrderedList(),
          new Link(),
          new Image()
        ],
        content: this.$sanitize(this.value),
        onUpdate: this.onUpdate
      })
    },
    beforeDestroy () {
      this.editor.destroy()
    },
    methods: {
      onUpdate ({ getHTML }) {
        let raw = getHTML()
        let html = this.$sanitize(raw)

        this.$emit('input', html)
      },
      showLinkMenu (attrs) {
        this.linkUrl = attrs.href
        this.linkMenuIsActive = true
        this.$nextTick(() => this.$refs.linkInput.focus())
      },
      hideLinkMenu () {
        this.linkUrl = null
        this.linkMenuIsActive = false
      },
      setLinkUrl (command, url) {
        command({ href: url })
        this.hideLinkMenu()
        this.editor.focus()
      },
      showImagePrompt(command) {
        let src = prompt('Enter the url of your image here')

        if (src != null) {
          command({ src })
        }
      }
    }
  }
</script>

<style lang="scss">
  .wysiwyg {
    position: relative;

    &__controls {
      display: flex;
    }

    &__control-group {
      display: flex;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }

  }

  .menububble {
    position: absolute;
    display: flex;
    z-index: 20;
    background: #000;
    border-radius: 5px;
    padding: .3rem;
    margin-bottom: .5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity .2s,visibility .2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }

    &__button {
      display: inline-flex;
      background: rgba(0,0,0,0);
      border: 0;
      color: #fff;
      padding: .2rem .5rem;
      margin-right: .2rem;
      border-radius: 3px;
      padding: 6px;

      .icon {
        fill: $body-text--light;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: hsla(0,0%,100%,.1);
      }

      &.is-active {
        background-color: hsla(0,0%,100%,.2);
      }
    }

    &__form {
      display: flex;
      align-items: center;
    }

    &__input {
      border: none;
      background: rgba(0,0,0,0);
      color: $body-text--light;
    }
  }

</style>

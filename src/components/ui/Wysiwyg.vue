
<template lang="pug">
  .wysiwyg
    editor-menu-bar(:editor="editor")
      .wysiwyg__controls(slot-scope="{ commands, isActive }")
        .wysiwyg__control-group
          button.button.button--wysiwyg(:class="{ 'is-active': isActive.bold() }", @click="commands.bold")
            span.u-hidden Bold
            icon(name="bold", :size="iconSize")
          button.button.button--wysiwyg(:class="{ 'is-active': isActive.italic() }", @click="commands.italic")
            span.u-hidden Italic
            icon(name="italic", :size="iconSize")
        .wysiwyg__control-group
          button.button.button--wysiwyg(:class="{ 'is-active': isActive.heading({ level: 2 }) }", @click="commands.heading({ level: 2 })")
            span.u-hidden H2
            icon(name="h2", :size="iconSize")
          button.button.button--wysiwyg(:class="{ 'is-active': isActive.heading({ level: 3 }) }", @click="commands.heading({ level: 3 })")
            span.u-hidden H3
            icon(name="h3", :size="iconSize")
        .wysiwyg__control-group
          button.button.button--wysiwyg(:class="{ 'is-active': isActive.link() }", @click="commands.link")
            span.u-hidden Link
            icon(name="link", :size="iconSize")
    editor-content(:editor="editor")
</template>

<script>
  import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
  import { Bold, Heading, Italic, Link } from 'tiptap-extensions'
  import TurndownService from 'turndown'

  import Icon from '@/components/ui/Icon.vue'

  const turndownService = new TurndownService()

  export default {
    name: 'Wysiwyg',
    components: { EditorContent, EditorMenuBar, Icon },
    data () {
      return {
        editor: null,
        iconSize: '16px'
      }
    },
    mounted () {
      this.editor = new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Heading({ levels: [2, 3] }),
          new Link()
        ],
        content: 'The local magistrate has been having trouble with kobolds nearby. He\'s offered a reward in gold for anyoone who can clear out their nest.',
        onUpdate: this.update
      })
    },
    beforeDestroy () {
      this.editor.destroy()
    },
    methods: {
      update ({ getHTML }) {
        let html = getHTML()
        let markdown = turndownService.turndown(html)

        console.log(html, markdown)
      }
    }
  }
</script>

<style scoped lang="scss">
  .wysiwyg {
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
</style>

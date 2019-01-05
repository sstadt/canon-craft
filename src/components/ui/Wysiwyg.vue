
<template lang="pug">
  .wysiwyg
    editor-menu-bar(:editor="editor")
      div(slot-scope="{ commands, isActive }")
        button.button.button--wysiwyg(:class="{ 'is-active': isActive.bold() }", @click="commands.bold") Bold
        button.button.button--wysiwyg(:class="{ 'is-active': isActive.italic() }", @click="commands.italic") Italic
        button.button.button--wysiwyg(:class="{ 'is-active': isActive.heading({ level: 2 }) }", @click="commands.heading({ level: 2 })") H2
        button.button.button--wysiwyg(:class="{ 'is-active': isActive.heading({ level: 3 }) }", @click="commands.heading({ level: 3 })") H3
        button.button.button--wysiwyg(:class="{ 'is-active': isActive.link() }", @click="commands.link") Link
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
        editor: null
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
        content: '',
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
</style>

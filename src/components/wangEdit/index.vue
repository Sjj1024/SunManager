<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px;"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


export default Vue.extend({
  name: 'WangEdit',
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {
        toolbarKeys: [
          'header1',
          'header2',
          'header3',
          '|',
          'bold',
          'underline',
          'italic',
          'color',
          'clearStyle',
          '|',
          'insertLink',
          {
            key: 'group-image',
            title: '图片',
            iconSvg:
              '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
            menuKeys: ['insertImage', 'uploadImage']
          },
          'insertVideo',
          'insertTable',
          'codeBlock'
        ],
        excludeKeys: [],
        insertKeys: {
          index: 0,
          keys: []
        },
        modalAppendToBody: false
      },
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      console.log('wang-----', this.editor)
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>


<style src="@wangeditor/editor/dist/css/style.css"></style>

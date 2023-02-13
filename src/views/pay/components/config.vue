<template>
  <div class="codeBox">
    <codemirror
      v-model="code"
      :options="cmOptions"
    ></codemirror>
  </div>
</template>

<script>
// require component
import { codemirror } from 'vue-codemirror'

// require styles
import 'codemirror/lib/codemirror.css'
// 引入语言
import 'codemirror/mode/javascript/javascript.js'
// base16-dark主题
import 'codemirror/theme/base16-dark.css'
// bespin主题
import 'codemirror/theme/bespin.css'
// require more codemirror resource...

// component
export default {
  name: 'PayConfig',
  components: {
    codemirror
  },
  data() {
    return {
      code: `function foo(items, nada) {
          for (var i=0; i<items.length; i++) {
              alert(items[i] + "juhu\\n");
          }	// Real Tab.
      }`,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'bespin',
        lineNumbers: true,
        line: true,
        // 高亮行功能
        styleActiveLine: true,
        // 自动括号匹配功能
        matchBrackets: true,
        autofocus: false,
        autoRefresh: true,
        // #region 代码折叠
        foldGutter: true,
        showHint: true,
        lint: true,
        hintOptions: {
          // 避免由于提示列表只有一个提示信息时，自动填充
          completeSingle: false
        },
        readOnly: false // 只读
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {},
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.codeBox {
  height: 500px;
}

.CodeMirror {
  /* height: auto !important; */
  height: 500px;
  font-family: Arial, monospace;
  font-size: 16px;
  letter-spacing: 1.5px;
}
</style>
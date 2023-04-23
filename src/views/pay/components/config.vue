<template>
  <div class="codeBox">
    <codemirror
      ref="myCm"
      @ready="onCmReady"
      v-model="code"
      :options="cmOptions"
    ></codemirror>
  </div>
</template>

<script>
// require component
import { codemirror } from "vue-codemirror";

// require styles
import "codemirror/lib/codemirror.css";
// 引入语言
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
// base16-dark主题
import "codemirror/theme/base16-dark.css";
// import 'codemirror/theme/default.css'
// bespin主题
import "codemirror/theme/bespin.css";
import "codemirror/theme/abbott.css";
// require more codemirror resource...
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/emacs.js";
// 引入代码自动提示插件
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";

import "codemirror/theme/monokai.css";
import "codemirror/mode/python/python.js";
import "codemirror/mode/yaml/yaml.js";

// active-line.js
import "codemirror/addon/selection/active-line.js";

// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
import "codemirror/keymap/vim.js";

// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";

// component
export default {
  name: "PayConfig",
  components: {
    codemirror,
  },
  data() {
    return {
      code: `import numpy as np
cimport cython
from libc.math cimport sqrt

@cython.boundscheck(False)
@cython.wraparound(False)
def pairwise_cython(double[:, ::1] X):
    cdef int M = X.shape[0]
    cdef int N = X.shape[1]
    cdef double tmp, d
    cdef double[:, ::1] D = np.empty((M, M), dtype=np.float64)
    for i in range(M):
        for j in range(M):
            d = 0.0
            for k in range(N):
                tmp = X[i, k] - X[j, k]
                d += tmp * tmp
            D[i, j] = sqrt(d)
    return np.asarray(D)`,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/x-python",
        theme: "default",
        lineNumbers: false,
        line: false,
        // 高亮行功能
        styleActiveLine: true,
        // 自动括号匹配功能
        matchBrackets: true,
        autofocus: false,
        autoRefresh: true,
        // #region 代码折叠
        foldGutter: false,
        showHint: true,
        lint: true,
        autoCloseBrackets: true, // 在键入时自动关闭括号和引号
        hintOptions: {
          // 避免由于提示列表只有一个提示信息时，自动填充
          completeSingle: true,
        },
        gutters: [
          "CodeMirror-lint-markers",
          "CodeMirror-linenumbers",
          "CodeMirror-foldgutter",
        ],
        readOnly: false, // 只读
        // more codemirror options, 更多 codemirror 的高级配置...
      },
    };
  },
  methods: {},
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    },
  },
  // mounted() {
  //   // 这里的 cm 对象就是 codemirror 对象，等于 this.$refs.myCm.codemirror
  //   this.$refs.myCm.codemirror.on("inputRead", (cm, obj) => {
  //     if (obj.text && obj.text.length > 0) {
  //       let c = obj.text[0].charAt(obj.text[0].length - 1);
  //       if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
  //         cm.showHint({ completeSingle: false });
  //       }
  //     }
  //   });
  // },
  methods: {
    onCmReady(cm) {
      // 这里的 cm 对象就是 codemirror 对象，等于 this.$refs.myCm.codemirror
      this.$refs.myCm.codemirror.on("inputRead", (cm, obj) => {
        if (obj.text && obj.text.length > 0) {
          let c = obj.text[0].charAt(obj.text[0].length - 1);
          if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
            cm.showHint({ completeSingle: false });
          }
        }
      });
    },
  },
};
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

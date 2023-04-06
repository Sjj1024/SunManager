<template>
  <div class="editinfo-box">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="文章标题">
        <el-input
          class="title"
          v-model="formInline.title"
          placeholder="文章标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select
          v-model="formInline.region"
          placeholder="分类"
        >
          <el-option
            label="技术区"
            value="shanghai"
          ></el-option>
          <el-option
            label="达盖尔"
            value="beijing"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="queryRepet"
        >查重</el-button>
        <el-button
          type="primary"
          @click="queryRepet"
        >转换</el-button>
        <el-button
          type="primary"
          @click="reView"
        >预览</el-button>
        <el-button
          type="primary"
          @click="onSave"
        >保存</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >发布</el-button>
      </el-form-item>
    </el-form>
    <Edit
      ref="wangEdit"
      @change="getEditor"
      :height="100"
    ></Edit>
  </div>
</template>

<script>
import Edit from '@/components/wangEdit/index.vue'

export default {
  name: 'BaseInfo',
  components: { Edit },
  data() {
    return {
      content: '',
      formInline: {
        title: '',
        region: ''
      }
    }
  },
  methods: {
    getEditor(val) {
      this.addForm.afficheContent = val
    },
    queryRepet() {
      console.log('queryRepet!')
      const text = this.$refs.wangEdit.editor.getText()
      console.log('queryRepet', text)
    },
    reView() {
      console.log('reView!')
      const text = this.$refs.wangEdit.editor.getText()
      console.log('reView', text)
    },
    onSave() {
      console.log('submit!')
      const text = this.$refs.wangEdit.editor.getText()
      console.log('submit', text)
    },
    onSubmit() {
      console.log('onSave!')
      const text = this.$refs.wangEdit.editor.getText()
      console.log('onSave', text)
    }
  }
}
</script>

<style lang="scss" scoped>
.editinfo-box {
  height: 590px;
  overflow-y: scroll;
  .title {
    width: 500px;
  }
}
</style>
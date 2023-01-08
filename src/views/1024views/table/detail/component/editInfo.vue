<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item label="文章标题">
        <el-input
          v-model="formInline.user"
          placeholder="文章标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类">
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
          @click="onSubmit"
        >查重</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >预览</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >保存</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >发布</el-button>
      </el-form-item>
    </el-form>
    <Edit
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
        user: '',
        region: ''
      }
    }
  },
  methods: {
    getEditor(val) {
      this.addForm.afficheContent = val
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style>
</style>
<template>
  <el-dialog
    title="自动签到"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="caoliuSignForm"
    >
      <el-form-item label="文章链接">
        <el-input v-model="caoliuSignForm.link"></el-input>
      </el-form-item>
      <el-form-item label="签到内容">
        <el-input v-model="caoliuSignForm.commit"></el-input>
      </el-form-item>
      <el-form-item label="签到时间">
        <el-input v-model="caoliuSignForm.corn"></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="danger"
        @click="delTask"
      >删 除</el-button>
      <el-button
        type="success"
        @click="handleClose"
      >暂 停</el-button>
      <el-button
        <el-button
        type="warning"
        @click="handleClose"
      >运 行</el-button>
      <el-button
        type="primary"
        @click="toggleSignTask"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import taskApi from '@/api/task'

export default {
  name: 'SignDialog',
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'right',
      caoliuSignForm: {
        link: 'https://cl.6273x.xyz/htm_data/2302/7/5522451.html',
        commit: '今日签到',
        corn: '02 19 * * *'
      }
    }
  },
  // created() {
  //   var refreshHours = new Date().getHours()
  //   var refreshMin = new Date().getMinutes() + 1
  //   this.caoliuSignForm.corn = `${refreshMin} ${refreshHours} * * *`
  // },
  methods: {
    handleClose() {
      console.log('关闭dialog')
      this.dialogVisible = false
    },
    showSign(row) {
      console.log('dislogShow', row)
      this.caoliuSignForm.id = row.id
      this.caoliuSignForm.user_name = row.user_name
      this.caoliuSignForm.cookie = row.cookie
      this.caoliuSignForm.user_agent = row.user_agent
      this.caoliuSignForm.link =
        'https://cl.6273x.xyz/htm_data/2302/7/5522451.html'
      this.caoliuSignForm.commit = '今日签到'
      var refreshHours = new Date().getHours()
      var refreshMin = new Date().getMinutes() + 2
      this.caoliuSignForm.corn = `${refreshMin} ${refreshHours} * * *`
      this.dialogVisible = true
    },
    async toggleSignTask() {
      console.log('切换签到任务状态')
      await taskApi.addSignTask(this.caoliuSignForm)
      this.handleClose()
      this.$emit('reFetchDate')
    },
    async delTask() {
      await taskApi.delSignTask(this.caoliuSignForm)
      this.handleClose()
      this.$emit('reFetchDate')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-bottom: 15px;
}
</style>
<template>
  <el-dialog
    title="自动评论"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="70px"
      :inline="true"
      :model="tangSignForm"
    >
      <el-form-item label="评论任务">
        <el-input v-model="tangSignForm.corn">
          <el-button slot="append" icon="el-icon-refresh" @click="refreshCorn" ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-radio-group v-model="tangSignForm.run_time">
          <el-radio-button label="White"></el-radio-button>
          <el-radio-button label="Black"></el-radio-button>
        </el-radio-group>
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
        type="warning"
        @click="runCommitNow"
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
import { randomInt } from '@/utils'

export default {
  name: 'CommitDialog',
  data() {
    return {
      dialogVisible: false,
      labelPosition: 'right',
      tangSignForm: {
        id: '',
        user_name: '',
        user_agent: '',
        corn: '',
        run_time: "White",
      }
    }
  },
  // created() {
  //   var refreshHours = new Date().getHours()
  //   var refreshMin = new Date().getMinutes() + 1
  //   this.tangSignForm.corn = `${refreshMin} ${refreshHours} * * *`
  // },
  methods: {
    handleClose() {
      console.log('关闭dialog')
      this.dialogVisible = false
      this.tangSignForm = {
        id: '',
        user_name: '',
        user_agent: '',
        corn: '',
        run_time: "White",
      }
    },
    showSign(row) {
      console.log('dislogShow', row)
      this.tangSignForm.id = row.id
      this.tangSignForm.user_name = row.user_name
      this.tangSignForm.cookie = row.cookie
      this.tangSignForm.user_agent = row.user_agent
      // var refreshHours = new Date().getHours()
      this.refreshCorn()
      this.dialogVisible = true
    },
    async toggleSignTask() {
      console.log('切换评论任务状态')
      try {
        const res = await taskApi.add98CommitTask(this.tangSignForm)
        console.log("res-----", res);
      } catch (error) {
        console.log("error-----", error);
        this.$message.error('错了哦：' + error)
      }
      this.handleClose()
      this.$emit('reFetchDate')
    },
    async delTask() {
      await taskApi.del98CommitTask(this.tangSignForm)
      this.handleClose()
      this.$emit('reFetchDate')
    },
    async runCommitNow() {
      await taskApi.run98CommitTask(this.tangSignForm)
      this.handleClose()
      this.$emit('reFetchDate')
    },
    refreshCorn(){
      console.log("重新刷新Corn表达式时间");
      // var refreshHours = randomInt(17, 22);
      var refreshMin = randomInt(1, 60)
      refreshMin = refreshMin < 10 ? `0${refreshMin}` : refreshMin
      this.tangSignForm.corn = `${refreshMin} */1 * * *`;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-bottom: 15px;
}
</style>
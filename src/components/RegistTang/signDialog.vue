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
      :model="tangSignForm"
    >
      <el-form-item label="签到时间" >
        <el-input v-model="tangSignForm.corn">
          <el-button slot="append" icon="el-icon-refresh" @click="refreshCorn" ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="danger" @click="delTask">删 除</el-button>
      <el-button type="success" @click="handleClose">暂 停</el-button>
      <el-button type="warning" @click="handleClose">运 行</el-button>
      <el-button type="primary" @click="toggleSignTask">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import taskApi from "@/api/task";
import { randomInt } from "@/utils";

export default {
  name: "SignDialog",
  data() {
    return {
      dialogVisible: false,
      labelPosition: "right",
      tangSignForm: {
        corn: "02 19 * * *",
      },
    };
  },
  // created() {
  //   var refreshHours = new Date().getHours()
  //   var refreshMin = new Date().getMinutes() + 1
  //   this.tangSignForm.corn = `${refreshMin} ${refreshHours} * * *`
  // },
  methods: {
    handleClose() {
      console.log("关闭dialog");
      this.dialogVisible = false;
    },
    showSign(row) {
      console.log("dislogShow", row);
      this.tangSignForm.id = row.id;
      this.tangSignForm.user_name = row.user_name;
      this.tangSignForm.cookie = row.cookie;
      this.tangSignForm.user_agent = row.user_agent;
      // var refreshHours = new Date().getHours()
      var refreshHours = randomInt(17, 22);
      var refreshMin = randomInt(1, 60);
      this.tangSignForm.corn = `${refreshMin} ${refreshHours} * * *`;
      this.dialogVisible = true;
    },
    async toggleSignTask() {
      console.log("切换签到任务状态");
      await taskApi.add98SignTask(this.tangSignForm);
      this.handleClose();
      this.$emit("reFetchDate");
    },
    async delTask() {
      await taskApi.del98SignTask(this.tangSignForm);
      this.handleClose();
      this.$emit("reFetchDate");
    },
    refreshCorn(){
      console.log("重新刷新Corn表达式时间");
      var refreshHours = randomInt(17, 22);
      var refreshMin = randomInt(1, 60);
      this.tangSignForm.corn = `${refreshMin} ${refreshHours} * * *`;
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-bottom: 15px;
}
</style>

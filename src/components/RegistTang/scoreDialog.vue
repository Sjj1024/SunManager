<template>
  <el-dialog
    title="自动评分"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="tangSignForm"
    >
      <el-form-item label="作者UID: ">
        <el-input
          v-model="tangSignForm.uids"
          placeholder="多个作者UID用,分割"
        ></el-input>
      </el-form-item>
      <el-form-item label="评分类型">
        <el-radio-group v-model="tangSignForm.category">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="文章"></el-radio-button>
          <el-radio-button label="评论"></el-radio-button>
          <el-radio-button label="头像"></el-radio-button>
          <el-radio-button label="描述"></el-radio-button>
          <el-radio-button label="聊天"></el-radio-button>
          <el-radio-button label="好友"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务时间">
        <el-input v-model="tangSignForm.corn">
          <el-button
            slot="append"
            icon="el-icon-refresh"
            @click="refreshCorn"
          ></el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="danger" @click="delTask">删 除</el-button>
      <el-button type="success" @click="handleClose">暂 停</el-button>
      <el-button type="warning" @click="runSignTask">运 行</el-button>
      <el-button type="primary" @click="toggleSignTask">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import taskApi from "@/api/task";
import { randomInt } from "@/utils";

export default {
  name: "ScoreDialog",
  data() {
    return {
      dialogVisible: false,
      labelPosition: "right",
      tangSignForm: {
        uids: "",
        // 文章 | 评论 | 全部
        category: "全部",
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
      var refreshHours = randomInt(10, 21);
      var refreshMin = randomInt(1, 60);
      refreshMin = refreshMin < 10 ? `0${refreshMin}` : refreshMin;
      this.tangSignForm.corn = `${refreshMin} ${refreshHours} * * *`;
      this.dialogVisible = true;
    },
    async toggleSignTask() {
      console.log("切换签到任务状态");
      await taskApi.add98SignTask(this.tangSignForm);
      this.handleClose();
      this.$emit("reFetchDate");
    },
    async runSignTask() {
      console.log("立即运行签到任务");
      await taskApi.run98SignTask(this.tangSignForm);
      this.handleClose();
      this.$emit("reFetchDate");
    },
    async delTask() {
      await taskApi.del98SignTask(this.tangSignForm);
      this.handleClose();
      this.$emit("reFetchDate");
    },
    refreshCorn() {
      console.log("重新刷新Corn表达式时间");
      var refreshHours = randomInt(10, 21);
      var refreshMin = randomInt(1, 60);
      console.log("refreshMin", refreshMin);
      refreshMin = refreshMin < 10 ? `0${refreshMin}` : refreshMin;
      this.tangSignForm.corn = `${refreshMin} ${refreshHours} * * *`;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding-bottom: 15px;
}
</style>

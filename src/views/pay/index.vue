<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CodeMirror" name="first">
        <PayConfig></PayConfig>
      </el-tab-pane>
      <el-tab-pane label="支付测试" name="second">
        <PayTest></PayTest>
      </el-tab-pane>
      <el-tab-pane label="MonacoEditor" name="third">
        <monaco></monaco>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PayTest from "./components/paytest.vue";
import PayConfig from "./components/config.vue";
import monaco from "./components/monaco.vue";

export default {
  components: { PayTest, PayConfig, monaco },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss">
.app-container {
  height: 100vh;
  // overflow: auto;
  overflow-y: scroll;
}
</style>

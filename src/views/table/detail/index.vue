<template>
  <div class="detail-box">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="基本信息"
        name="first"
      >
        <BaseInfo></BaseInfo>
      </el-tab-pane>
      <el-tab-pane
        label="编辑资料"
        name="second"
      >
        <EditInfo></EditInfo>
      </el-tab-pane>
      <el-tab-pane
        label="我的文章"
        name="third"
      >
        <MyArticle></MyArticle>
      </el-tab-pane>
      <el-tab-pane
        label="租借信息"
        name="fourth"
      >
        <LeaseInfo></LeaseInfo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BaseInfo from '@/views/table/detail/component/baseInfo'
import EditInfo from '@/views/table/detail/component/editInfo'
import MyArticle from '@/views/table/detail/component/myArticle'
import LeaseInfo from '@/views/table/detail/component/leaseInfo'

export default {
  name: 'Detail',
  components: { BaseInfo, EditInfo, MyArticle, LeaseInfo },
  props: {
    person: {
      type: Object,
      default: () => {
        return {
          id: 1,
          username: 'woshibiaoti',
          grade: '新手上路',
          weiwang: 'song',
          gongxian: '2022-12-11',
          money: '300',
          publick: '12/12/22',
          mazi: 'yqsdfasdfasdfsdf',
          email: '1024sssssxiaoshen@gmail.com'
        }
      },
      created() {
        const id = this.$route.params.id
        console.log('detail-id---', id)
      }
    }
  },
  data() {
    return {
      id: '',
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-box {
  padding: 20px;
}
</style>
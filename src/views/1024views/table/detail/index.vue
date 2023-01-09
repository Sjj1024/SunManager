<template>
  <el-tabs
    v-model="activeName"
    class="detail-box"
    @tab-click="handleClick"
  >
    <el-tab-pane
      label="基本信息"
      name="first"
    >
      <BaseInfo @paySuccess="goToInvcode"></BaseInfo>
    </el-tab-pane>
    <el-tab-pane
      label="发布文章"
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
      label="邀请管理"
      name="fore"
    >
      <LeaseInfo ref="invcodePanel"></LeaseInfo>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import BaseInfo from '@/views/1024views/table/detail/component/baseInfo'
import EditInfo from '@/views/1024views/table/detail/component/editInfo'
import MyArticle from '@/views/1024views/table/detail/component/myArticle'
import LeaseInfo from '@/views/1024views/table/detail/component/leaseInfo'

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
        console.log('detail---', id)
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
    },
    goToInvcode() {
      console.log('跳转到邀请码列表页')
      this.activeName = 'fore'
      this.$refs.invcodePanel.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-box {
  padding: 20px;
  // overflow-y: scroll;
  // height: 2000px;
}
</style>
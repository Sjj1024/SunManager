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
      <keep-alive>
        <BaseInfo
          v-if="activeName == 'first'"
          @paySuccess="goToInvcode"
        ></BaseInfo>
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane
      label="发布文章"
      name="second"
    >
      <PubArticle v-if="activeName == 'second'"></PubArticle>
    </el-tab-pane>
    <el-tab-pane
      label="我的文章"
      name="third"
    >
      <keep-alive>
        <MyArticle v-if="activeName == 'third'"></MyArticle>
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane
      label="我的评论"
      name="fore"
    >
      <keep-alive>
        <Commits
          v-if="activeName == 'fore'"
          ref="invcodePanel"
        ></Commits>
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane
      label="我的点评"
      name="five"
    >
      <keep-alive>
        <RefCommits
          v-if="activeName == 'five'"
          ref="invcodePanel"
        ></RefCommits>
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane
      label="邀请管理"
      name="six"
    >
      <keep-alive>
        <Invcodes
          v-if="activeName == 'six'"
          ref="invcodePanel"
        ></Invcodes>
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import BaseInfo from '@/views/1024views/caoliu/detail/component/baseInfo'
import PubArticle from '@/views/1024views/caoliu/detail/component/pubArticle.vue'
import MyArticle from '@/views/1024views/caoliu/detail/component/myArticle'
import Invcodes from '@/views/1024views/caoliu/detail/component/invcodes'
import Commits from '@/views/1024views/caoliu/detail/component/commit.vue'
import RefCommits from '@/views/1024views/caoliu/detail/component/refCommit.vue'

export default {
  name: 'Detail',
  components: { BaseInfo, PubArticle, MyArticle, Invcodes, Commits, RefCommits },
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
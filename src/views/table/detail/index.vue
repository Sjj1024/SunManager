<template>
  <div class="detail-box">这是详情页</div>
</template>

<script>
export default {
  name: 'Detail',
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
      id: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-box {
  padding: 20px;
}
</style>
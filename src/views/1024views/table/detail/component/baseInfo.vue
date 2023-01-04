<template>
  <div class="base-box">
    <div class="inline">
      <div class="left">
        <span class="lable">用户名:</span>
        <span>{{ base.user_name }}</span>
      </div>
      <div class="right">
        <span class="lable">ID:</span>
        <span>{{ base.id }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">等级:</span>
        <span>{{ base.grade }}</span>
      </div>
      <div class="right">
        <span class="lable">邮箱:</span>
        <span>{{ base.email }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">威望:</span>
        <span>{{ base.weiwang }}</span>
      </div>
      <div class="right">
        <span class="lable">发帖数量:</span>
        <span>{{ base.article_number }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献:</span>
        <span>{{ base.contribute }}</span>
      </div>
      <div class="right">
        <span class="lable">注册时间:</span>
        <span>{{ base.creat_time }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">金钱:</span>
        <span>{{ base.money }}</span>
      </div>
      <div class="right">
        <span class="lable">两步认证:</span>
        <span>{{ base.authentication }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">活期存款:</span>
        <span>{{ base.money }}</span>
      </div>
      <div class="right">
        <span class="lable">定期存款:</span>
        <span>{{ base.money }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">可邀请否:</span>
        <span>{{ base.able_invate }}</span>
      </div>
      <div class="right">
        <span class="lable">是否租借:</span>
        <span>{{ base.lease }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">描述信息:</span>
        <span>{{ base.desc }}</span>
      </div>
      <div class="right">
        <span class="lable">Cookie:</span>
        <span class="more-text">{{ base.cookie }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献连接:</span>
        <span >{{ base.contribute_link }}</span>
      </div>
      <div class="right">
        <span class="lable">UserAgent:</span>
        <span class="more-text">{{ base.user_agent }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">作品展示:</span>
        <span>{{ base.username }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import tableApi from '@/api/table'

export default {
  name: 'BaseInfo',
  data() {
    return {
      id: '',
      base: {
        able_invate: false,
        article_number: 60,
        authentication: '',
        check_file_sha: null,
        check_link: null,
        check_status: null,
        contribute: 0,
        contribute_link: '',
        cookie: '227c9_ck_info=%2F%09;227c9_groupid=8;227c9_lastvisit=0%091672815665%09%2Flogin.php%3F;227c9_winduser=VAsDUlJUMAcBV1dZUwUDBwACWgFUWQdSXFEGVQAJCFYABFYJUQpTaA%3D%3D;',
        creat_time: '2022-12-29 19:50',
        current_money: null,
        desc: '\u6211\u60f3\u53bb\u56fd\u5916',
        email: '1024xiaoshen@gmail.com',
        grade: '\u65b0\u624b\u4e0a\u8def',
        id: 49,
        lease: false,
        money: 60,
        new_passwd: null,
        password: '1024xiaoshen@gmail.com',
        regular_money: null,
        task_file_sha: null,
        task_link: null,
        task_status: null,
        user_agent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        user_id: 632316,
        user_name: '\u6211\u60f3\u53bb\u56fd\u5916',
        weiwang: 7
      }
    }
  },
  async created() {
    const id = this.$route.params.id
    console.log('detail-id---', id)
    try {
      const res = await tableApi.getUserById({ id })
      console.log('res---', res)
      if (res.code === 200) {
        // this.$message({
        //   message: '获取用户信息成功！',
        //   type: 'success'
        // })
        this.base = res.data
      } else {
        this.$message.error('获取失败:' + res.message)
      }
    } catch (error) {
      this.$message.error('获取失败:' + error)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-box {
  padding-top: 20px;
  .inline {
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    .left {
      width: 40%;
    }
    .right {
      width: 60%;
      display: flex;
    }
    .lable {
      display: inline-block;
      min-width: 70px;
      text-align: right;
      // font-weight: 700;
      margin-right: 10px;
    }
    .more-text{
      overflow-wrap: break-word;
    }
  }
}
</style>
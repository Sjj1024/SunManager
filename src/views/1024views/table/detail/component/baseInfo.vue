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
        <span class="lable">旧密码:</span>
        <el-input
          class="input-box"
          v-model="base.password"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="right">
        <span class="lable">新密码:</span>
        <el-input
          class="input-box"
          v-model="base.new_passwd"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">租售信息:</span>
        <el-input
          class="input-box"
          v-model="base.lease"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="right">
        <span class="lable">描述信息:</span>
        <el-input
          class="input-box"
          v-model="base.desc"
        >
        </el-input>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">可否邀请:</span>
        <span style="margin-right:10px;">{{ base.able_invate }}</span>
        <el-button
          v-if="base.able_invate === '可以购买'"
          type="primary"
          size="small"
          @click="payInvcode"
        >购买邀请码</el-button>
      </div>
      <div class="right">
        <span class="lable">两步认证:</span>
        <el-input
          class="input-box"
          v-model="base.authentication"
          placeholder="请输入内容"
        ></el-input>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">等级:</span>
        <span>{{ base.grade }}</span>
      </div>
      <div class="right">
        <span class="lable">发帖数量:</span>
        <span>{{ base.article_number }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">威望:</span>
        <span>{{ base.weiwang }}</span>
      </div>
      <div class="right">
        <span class="lable">注册时间:</span>
        <span>{{ base.creat_time }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献:</span>
        <span>{{ base.contribute }}</span>
      </div>
      <div class="right">
        <span class="lable">邮箱:</span>
        <span>{{ base.email }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">金钱:</span>
        <span>{{ base.money }}</span>
      </div>
      <div class="right">
        <span class="lable">定期存款:</span>
        <span>{{ base.money }}</span>
      </div>
    </div>
    <div class="inline more-height">
      <div class="left">
        <span class="lable">活期存款:</span>
        <span>{{ base.money }}</span>
      </div>
      <div class="right">
        <span class="lable">Cookie:</span>
        <el-input
          type="textarea"
          :rows="2"
          v-model="base.cookie"
          class="more-box"
        >
        </el-input>
      </div>
    </div>
    <div class="inline more-height">
      <div class="left">
        <span class="lable">贡献连接:</span>
        <span>{{ base.contribute_link }}</span>
      </div>
      <div class="right">
        <span class="lable">UserAgent:</span>
        <el-input
          type="textarea"
          :rows="2"
          v-model="base.user_agent"
          class="more-box"
        >
        </el-input>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">已被删除:</span>
        <!-- <span>{{ base.isDeleted }}</span> -->
        <el-switch
          v-model="base.isDeleted"
          inactive-color="#13ce66"
          active-color="#ff4949"
        >
        </el-switch>
      </div>
      <div class="right">
        <span class="lable">作品展示:</span>
        <span>{{ base.username }}</span>
      </div>
    </div>
    <div class="inline">
      <el-button
        type="primary"
        @click="save"
      >保存信息</el-button>
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
        article_number: 0,
        authentication: '',
        check_file_sha: null,
        check_link: null,
        check_status: null,
        contribute: 0,
        contribute_link: '',
        cookie: '',
        creat_time: '',
        current_money: null,
        desc: '',
        email: '',
        grade: '',
        id: 49,
        lease: '',
        money: 60,
        new_passwd: null,
        password: '',
        regular_money: null,
        task_file_sha: null,
        task_link: null,
        task_status: null,
        user_agent: '',
        user_id: 0,
        user_name: '',
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
  },
  methods: {
    async save() {
      try {
        const res = await tableApi.saveUserInfo(this.base)
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '保存用户信息成功！',
            type: 'success'
          })
        } else {
          this.$message.error('获取失败:' + res.message)
        }
      } catch (error) {
        this.$message.error('获取失败:' + error)
      }
    },
    payInvcode() {
      this.$prompt('请输入购买数量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '邮箱格式不正确'
      })
        .then(({ value }) => {
          tableApi
            .payInvcodeSome({ id: this.$route.params.id, invnum: value })
            .then((response) => {
              if (response.code === 200) {
                this.$message({
                  type: 'success',
                  message: `恭喜你购买成功${value}个邀请码`
                })
                this.$emit('paySuccess')
              } else {
                this.$message.error(`错了哦，错误原因:${response.message}`)
              }
            })
            .catch((e) => {
              this.$message.error(`错了哦，错误原因:${e}`)
            })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.base-box {
  .inline {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    .left {
      width: 40%;
      height: 32px;
      line-height: 32px;
    }
    .right {
      width: 60%;
      height: 32px;
      line-height: 32px;
      display: flex;
    }
    .lable {
      display: inline-block;
      min-width: 70px;
      text-align: right;
      height: 32px;
      line-height: 32px;
      margin-right: 10px;
    }
    .more-text {
      overflow-wrap: anywhere;
      line-height: normal;
    }
    .more-box {
      font-size: 12px;
    }
    .input-box {
      width: 400px;
      padding: 5px;
      ::v-deep .el-input__inner {
        height: $inputBox;
        line-height: $inputBox;
      }
    }
  }
  .more-height {
    height: 55px;
  }
}
</style>
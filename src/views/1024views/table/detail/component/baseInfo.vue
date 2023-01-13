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
        <span
          v-if="base.original"
          class="original"
        >
          <span> / {{ base.original.dengji || base.original.grade }}</span>
        </span>
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
        <span
          v-if="base.original"
          class="grow"
        >
          <span>{{ base.weiwang - base.original.weiwang }}</span>
          <i class="el-icon-top"></i>
        </span>
      </div>
      <div class="right">
        <span class="lable">发帖/评论:</span>
        <span>{{ base.article_number }}</span>
        <span
          v-if="base.original"
          class="grow"
        >
          <span v-if="base.original.fatie">&nbsp;{{ base.article_number - base.original.fatie }}</span>
          <span v-if="base.original.article_number">&nbsp;{{ base.article_number - base.original.article_number }}</span>
          <i class="el-icon-top"></i>
        </span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献:</span>
        <span>{{ base.contribute }}</span>
        <span
          v-if="base.original"
          class="grow"
        >
          <span v-if="base.original.gongxian">{{ base.contribute - base.original.gongxian }}</span>
          <span v-if="base.original.contribute">{{ base.contribute - base.original.contribute }}</span>
          <i class="el-icon-top"></i>
        </span>
      </div>
      <div class="right">
        <span class="lable">活期存款:</span>
        <span>{{ base.money }}</span>
        <span
          v-if="base.original"
          class="grow"
        >
          <span> {{ base.money - base.original.money }}</span>
          <i class="el-icon-top"></i>
        </span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">金钱:</span>
        <span>{{ base.money }}</span>
        <span
          v-if="base.original"
          class="grow"
        >
          <span>{{ base.money - base.original.money }}</span>
          <i class="el-icon-top"></i>
        </span>
      </div>
      <div class="right">
        <span class="lable">定期存款:</span>
        <span>{{ base.money }}</span>
        <span
          v-if="base.original"
          class="grow"
        >
          <span> {{ base.money - base.original.money }}</span>
          <i class="el-icon-top"></i>
        </span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">贡献连接:</span>
        <span class="active">{{cl_home[1] }}/index.php{{ base.contribute_link.split('index.php')[1] }}</span>
      </div>
      <div class="right">
        <span class="lable">作品展示:</span>
        <span @click="openMyLink" class="active">{{ cl_home[1] }}/user/{{ base.user_name }}</span>
      </div>
    </div>
    <div class="inline">
      <div class="left">
        <span class="lable">更新时间:</span>
        <span>{{ base.update_time }}</span>
      </div>
      <div class="right">
        <span class="lable">注册时间:</span>
        <span>{{ base.regist_time }}</span>
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
        <span class="lable">账号量级:</span>
        <el-select
          v-model="base.important"
          placeholder="请选择"
          class="input-box"
        >
          <el-option
            v-for="item in important"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
    <div class="inline more-height">
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
        <span class="lable">已被删除:</span>
        <el-switch
          v-model="base.isDeleted"
          inactive-color="#13ce66"
          active-color="#ff4949"
        >
        </el-switch>
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
      <el-button
        type="primary"
        @click="getInfoBtn"
      >更新信息</el-button>
      <el-button
        type="primary"
        @click="openIndex"
      >跳到主页</el-button>
      <el-button
        type="primary"
        @click="save"
      >保存信息</el-button>
    </div>
  </div>
</template>

<script>
import tableApi from '@/api/table'
import { mapState } from 'vuex'

export default {
  name: 'BaseInfo',
  data() {
    return {
      id: '',
      important: [
        {
          value: 1,
          label: '1级:非常重要禁止售卖，列表排名靠前'
        },
        {
          value: 2,
          label: '2级:比较重要，自己大号产出自己用'
        },
        {
          value: 3,
          label: '3级:自己的三级账号，可以出邀请码'
        },
        {
          value: 4,
          label: '4级:新手级别的账号，可自动升级'
        },
        {
          value: 5,
          label: '5级:已被删除或永久禁言的账号'
        }
      ],
      base: {
        contribute_link: ''
      },
      cl_home: ''
    }
  },
  computed: {
    ...mapState('board', ['homes'])
  },
  async created() {
    this.fetchData()
    this.initHomeUrl()
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id
      console.log('detail-id---', id)
      try {
        const res = await tableApi.getUserById({ id })
        console.log('res---', res)
        if (res.code === 200) {
          this.base = res.data
        } else {
          this.$message.error('获取失败:' + res.message)
        }
      } catch (error) {
        this.$message.error('获取失败:' + error)
      }
    },
    // 初始化回家地址
    initHomeUrl() {
      if (this.homes) {
        const home = this.homes.find((item) => {
          return item.key === '1024地址'
        })
        this.cl_home = home && home.homes
        console.log('初始化cl地址', this.cl_home)
      } else {
        console.log('没有拿到homes', this.homes)
      }
    },
    openIndex() {
      const url = this.cl_home[0]
      if (url) {
        console.log('跳转到曹刘主页:' + url)
        window.open(url, '_blank')
      }
    },
    openMyLink() {
      const url = `https://cl.2059x.xyz/user/${this.base.user_name}`
      if (url) {
        console.log('跳转到曹刘主页:' + url)
        window.open(url, '_blank')
      }
    },
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
    async getInfoBtn(userInfo) {
      console.log('actionBtn---', userInfo)
      try {
        this.$message({ message: '刷新用户资料...', type: 'success' })
        const res = await tableApi.updateUserInfo(this.base)
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，更新用户信息成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message.error('更新失败:' + res.message)
        }
      } catch (error) {
        this.$message.error('更新失败:' + error)
      }
    },
    payInvcode() {
      this.$prompt('请输入购买数量', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: 1
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
  // height: 2000px;
  .grow {
    margin-left: 5px;
    color: red;
  }

  .active {
    color: #409eff;
    cursor: pointer;
  }

  .original {
    color: #aaa;
  }

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
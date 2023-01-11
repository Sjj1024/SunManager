<template>
  <!-- 添加用户 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addDialog"
    width="40%"
    top="3vh"
  >
    <el-form
      :model="addForm"
      status-icon
      :rules="rules"
      ref="addForm"
      size="medium"
      label-width="100px"
      class="add-Form"
    >
      <el-form-item
        label="账号"
        prop="username"
      >
        <el-input
          v-model.trim="addForm.username"
          autocomplete="off"
          style="width: 94%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model.trim="addForm.password"
          autocomplete="off"
          style="width: 94%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model.trim="addForm.email"
          autocomplete="off"
          style="width: 94%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="邀请码"
        prop="invcode"
      >
        <el-input
          v-model.trim="addForm.invcode"
          autocomplete="off"
          style="width: 94%"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Cookie"
        prop="email"
      >
        <el-input
          v-model.trim="addForm.cookie"
          autocomplete="off"
          style="width: 94%"
          placeholder="请输入Cookie"
          type="textarea"
          @input="getUserInfo"
          :rows="2"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="UserAgent"
        prop="invcode"
      >
        <el-input
          v-model.trim="addForm.userAgent"
          autocomplete="off"
          style="width: 94%"
          placeholder="请输入UserAgent"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号量级">
        <el-select
          v-model="addForm.important"
          placeholder="请选择"
          class="input-box"
          style="width: 94%"
        >
          <el-option
            v-for="item in important"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input
          v-model.trim="addForm.desc"
          autocomplete="off"
          style="width: 94%"
          placeholder="请输入描述信息"
        ></el-input>
      </el-form-item>
      <div class="tip-info">提示：账号密码 / 账号密码邮箱邀请码 / Token</div>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="addDialog = false"
        size="medium"
      >取 消</el-button>
      <el-button
        type="primary"
        size="medium"
        @click="addUser('addForm')"
        :loading="submitLoading"
      >添 加</el-button>
    </span>
  </el-dialog>
</template>

<script>
import tableApi from '@/api/table'

export default {
  name: 'RegistCaoliu',
  data() {
    return {
      addDialog: false,
      submitLoading: false,
      timeout: null,
      addForm: {
        username: '',
        password: '1024xiaoshen@gmail.com',
        email: '1024xiaoshen@gmail.com',
        invcode: '',
        cookie: '',
        userAgent: '',
        desc: '',
        important: 1
      },
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
      rules: {
        username: [{ validator: this.checkUsername, trigger: 'change' }],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    // 设置浏览器userAgent
    this.addForm.userAgent = navigator.userAgent
  },
  methods: {
    checkUsername(rule, value, callback) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      if (this.addForm.cookie !== '') {
        callback()
        return
      }
      this.timeout = setTimeout(async () => {
        if (value) {
          try {
            const res = await tableApi.queryUsername({ username: value })
            console.log('res----', res)
            if (res.code === 200) {
              this.$message({ message: '这个用户名很Good!', type: 'success' })
              this.addForm.desc = this.addForm.username
              callback()
            } else {
              this.$message({
                message: '这个用户名已经被注册',
                type: 'warning'
              })
              callback()
            }
          } catch (error) {
            console.log('checkUsername:error')
            callback()
          }
        }
      }, 800)
    },
    showRegist(invcode) {
      if (invcode) {
        this.addForm.invcode = invcode
      }
      this.addDialog = true
    },
    async addUser() {
      console.log('添加用户-')
      this.submitLoading = true
      try {
        const res = await tableApi.addUser(this.addForm)
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，添加用户成功',
            type: 'success'
          })
          this.cancelAdd()
          this.$emit('reFetchDate')
        } else {
          this.$message.error('创建用户失败:' + res.message)
          this.submitLoading = false
        }
      } catch (error) {
        this.submitLoading = false
      }
    },
    cancelAdd() {
      this.addDialog = false
      this.submitLoading = false
      this.addForm = {
        username: '',
        password: '1024xiaoshen@gmail.com',
        email: '1024xiaoshen@gmail.com',
        invcode: '',
        cookie: '',
        userAgent: navigator.userAgent,
        desc: '',
        important: 1
      }
      this.$refs.addForm.resetFields()
      console.log('清空表单了')
    },
    async getUserInfo(val) {
      console.log('val-------', val)
      if (val.indexOf('winduser') !== -1) {
        console.log('cookie正确，开始发送请求')
        this.$message({
          message: 'cookie正确，开始获取用户信息...',
          type: 'success'
        })
        const res = await tableApi.getUserInfoByCookie(this.addForm)
        console.log('res---', res)
        if (res.code === 200) {
          const userName = res.data.user_name
          this.addForm.username = userName
          this.addForm.desc = userName
        } else {
          this.$message({
            message: '查询用户名失败...cookie不可用',
            type: 'warning'
          })
        }
      } else {
        console.log('cookie错误，不包含winduser')
        this.$message({
          message: 'cookie错误，不包含winduser',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tip-info {
  margin-left: 60px;
  color: #999;
}
</style>
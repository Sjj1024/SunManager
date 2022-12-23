<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      size="medium"
      ref="addForm"
      class="demo-form-inline"
    >
      <el-form-item
        label="用户名"
        prop="user"
      >
        <el-input
          class="select-u"
          v-model="formInline.user"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item
        label="等级"
        prop="level"
      >
        <el-select
          v-model="formInline.level"
          placeholder="等级"
          class="select-w"
        >
          <el-option
            label="新手上路"
            value="xinshou"
          />
          <el-option
            label="侠客"
            value="xiake"
          />
          <el-option
            label="騎士"
            value="qishi"
          />
          <el-option
            label="圣騎士"
            value="shengqishi"
          />
          <el-option
            label="精靈王"
            value="jinglingwang"
          />
          <el-option
            label="風云使者"
            value="fengyun"
          />
          <el-option
            label="光明使者"
            value="guangming"
          />
          <el-option
            label="天使"
            value="tianshi"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="威望"
        prop="weiwang"
      >
        <el-input
          class="select-w"
          v-model="formInline.weiwang"
          placeholder="威望"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="yaoqing"
      >
        <el-select
          class="select-w"
          v-model="formInline.status"
          placeholder="状态"
        >
          <el-option
            label="正常"
            value="zhengchang"
          />
          <el-option
            label="临时禁言"
            value="linshi"
          />
          <el-option
            label="永久禁言"
            value="yongjiu"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="可产邀请码"
        prop="yaoqing"
      >
        <el-select
          class="select-w"
          v-model="formInline.yaoqing"
          placeholder="可产"
        >
          <el-option
            label="是"
            value="yes"
          />
          <el-option
            label="否"
            value="no"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="medium"
          @click="onSubmit"
        >查询</el-button>
        <el-button
          size="medium"
          @click="resetForm"
        >重置</el-button>
      </el-form-item>
      <el-form-item class="add-btn">
        <el-button
          class="export-btn"
          size="medium"
          icon="el-icon-plus"
          type="primary"
          @click="addDialog = true"
        >
          添加用户
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
    >
      <el-table-column
        align="center"
        label="用户名"
      >
        <template slot-scope="scope">
          <span
            class="username"
            @click="detailBtn(scope.row.id)"
          >{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="等级"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="威望"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.weiwang }} 點</span>
        </template>
      </el-table-column>
      <el-table-column
        label="贡献"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contribute }} 點</span>
        </template>
      </el-table-column>
      <el-table-column
        label="金钱"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.money }} USD</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发帖"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.article_number }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="可产邀请码"
      >
        <template slot-scope="scope"> {{ scope.row.able_invate }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.able_invate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="230"
        label="邮箱"
      >
        <template slot-scope="scope"> {{ scope.row.email }} </template>
      </el-table-column>
      <el-table-column
        label="描述信息"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="更多操作"
      >
        <template slot-scope="scope">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span @click="detailBtn(scope.row.id)">详细资料</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyUser(scope.row)">复制账号</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyLink(scope.row)">贡献连接</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyLink(scope.row)">自动升级</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyLink(scope.row)">开启监管</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="delUser(scope.row.id)">删除账号</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <span>https://cl.2718x.xyz/index.php?u=627416&ext=37b37</span> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <div class="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="11"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialog"
      width="40%"
      top="5vh"
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
            v-model="addForm.username"
            autocomplete="off"
            style="width: 94%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            autocomplete="off"
            style="width: 94%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="addForm.email"
            autocomplete="off"
            style="width: 94%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邀请码"
          prop="invcode"
        >
          <el-input
            v-model="addForm.invcode"
            autocomplete="off"
            style="width: 94%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Cookie"
          prop="email"
        >
          <el-input
            v-model="addForm.cookie"
            autocomplete="off"
            style="width: 94%"
            placeholder="请输入Cookie"
            type="textarea"
            @input="getUserInfo"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="UserAgent"
          prop="invcode"
        >
          <el-input
            v-model="addForm.userAgent"
            autocomplete="off"
            style="width: 94%"
            placeholder="请输入UserAgent"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input
            v-model="addForm.desc"
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
  </div>
</template>

<script>
import tableApi from '@/api/table'

export default {
  name: 'Table',
  data() {
    return {
      list: null,
      pageTotal: 0,
      listLoading: true,
      addDialog: false,
      submitLoading: false,
      timeout: null,
      formInline: {
        user: '',
        weiwang: '',
        level: '',
        status: '',
        yaoqing: ''
      },
      addForm: {
        username: '',
        password: '1024xiaoshen@gmail.com',
        email: '1024xiaoshen@gmail.com',
        invcode: '',
        cookie: '',
        userAgent: '',
        desc: ''
      },
      rules: {
        username: [{ validator: this.checkUsername, trigger: 'change' }],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
    // 设置浏览器userAgent
    this.addForm.userAgent = navigator.userAgent
  },
  methods: {
    fetchData() {
      this.listLoading = true
      tableApi.getList().then((response) => {
        this.list = response.data.items
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs.addForm.resetFields()
      console.log('重制查询内容')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    detailBtn(id) {
      console.log('actionBtn---', id)
      this.$router.push(`/xiaoshen/detail/${id}`)
    },
    checkUsername(rule, value, callback) {
      if (this.timeout) {
        clearTimeout(this.timeout)
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
              callback(new Error(res.message.info))
            }
          } catch (error) {
            console.log('checkUsername:error')
          }
        }
      }, 800)
    },
    async getUserInfo(val) {
      console.log('val-------', val)
      if (val.indexOf('winduser') !== -1) {
        console.log('cookie正确，开始发送请求')
        const res = await tableApi.getUserInfoByCookie(this.addForm)
        console.log('res---', res)
        if (res.code === 200) {
          const userName = res.data.user_name
          this.addForm.username = userName
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
    },
    cancelAdd() {
      this.addDialog = false
      this.addForm = {
        username: '',
        password: '1024xiaoshen@gmail.com',
        email: '1024xiaoshen@gmail.com',
        invcode: '',
        cookie: '',
        userAgent: '',
        desc: ''
      }
      this.$refs.addForm.resetFields()
      console.log('清空表单了')
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
          this.fetchData()
        } else {
          this.$message.error('创建用户失败:' + res.message)
          this.submitLoading = false
        }
      } catch (error) {
        this.submitLoading = false
      }
    },
    async delUser(id) {
      console.log('删除用户-', id)
      const res = await tableApi.delUser({ id })
      console.log('res---', res)
    },
    async handelCopyUser(val) {
      console.log('val----', val)
      try {
        const res = await this.$copyText(JSON.stringify(val))
        this.$message({ message: '复制成功', type: 'success' })
      } catch (error) {
        this.$message.error('复制失败')
      }
    },
    async handelCopyLink(val) {
      console.log('val----', val)
      try {
        const res = await this.$copyText('连接')
        this.$message({ message: '复制成功', type: 'success' })
      } catch (error) {
        this.$message.error('复制失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
  // overflow: auto;
  overflow-y: scroll;
  .add-btn {
    float: right;
  }
  ::v-deep .el-dialog__footer {
    text-align: center;
  }
  .tip-info {
    margin-left: 60px;
    color: #999;
  }
  .select-w {
    width: 110px;
  }
  .select-u {
    width: 150px;
  }
}

.username {
  color: #409eff;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.page-box {
  margin-top: 15px;
  height: 80px;
}
</style>

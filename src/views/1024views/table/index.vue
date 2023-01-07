<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      size="medium"
      ref="searchForm"
      class="demo-form-inline"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          class="select-u"
          v-model="formInline.username"
          placeholder="用户名"
          clearable
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
          clearable
        >
          <el-option
            label="新手上路"
            value="新手上路"
          />
          <el-option
            label="俠客"
            value="俠客"
          />
          <el-option
            label="騎士"
            value="騎士"
          />
          <el-option
            label="圣騎士"
            value="圣騎士"
          />
          <el-option
            label="精靈王"
            value="精靈王"
          />
          <el-option
            label="禁止發言"
            value="禁止發言"
          />
          <el-option
            label="風云使者"
            value="風云使者"
          />
          <el-option
            label="光明使者"
            value="光明使者"
          />
          <el-option
            label="天使"
            value="天使"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="威望"
        prop="weiwang"
      >
        <el-input
          class="select-w"
          v-model.number="formInline.weiwang"
          placeholder="威望"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status"
      >
        <el-select
          class="select-w"
          v-model="formInline.status"
          placeholder="状态"
          clearable
        >
          <el-option
            label="正常"
            value="正常"
          />
          <el-option
            label="临时禁言"
            value="临时禁言"
          />
          <el-option
            label="永久禁言"
            value="永久禁言"
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
          clearable
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
        <el-button
          type="primary"
          :icon="loadingIcon"
          @click="updateAllUserinfo"
        ></el-button>
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
          <span :class="{'waring': scope.row.grade === '禁止發言'}">{{ scope.row.grade }}</span>
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
      <!-- <el-table-column
        label="金钱"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.money }} USD</span>
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        label="可产邀请码"
      >
        <template slot-scope="scope"> {{ scope.row.able_invate }} </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="升级状态"
      >
        <template slot-scope="scope">
          <span
            :class="{'active':scope.row.task_status === '已开启'}"
            @click="goWorkflows(scope.row.task_link)"
          >
            {{ scope.row.task_status }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="监控状态"
      >
        <template slot-scope="scope">
          <span
            :class="{'active':scope.row.check_status === '已开启', 'waring': scope.row.desc.indexOf('广告') !== -1}"
            @click="goWorkflows(scope.row.check_link)"
          >
            {{ scope.row.check_status }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="租售状态"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.lease"
            placement="right"
          >
            <el-button class="desc-btn">
              <span class="desc-box">{{ scope.row.lease }}</span>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="描述信息"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.desc"
            placement="right"
          >
            <el-button class="desc-btn">
              <span :class="{'desc-box':true, 
              'waring': scope.row.desc.indexOf('永久禁言') !== -1
              }">
                {{ scope.row.desc }}
              </span>
            </el-button>
          </el-tooltip>
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
                <span @click="getInfoBtn(scope.row)">更新资料</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyUser(scope.row)">复制账号</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="autoUpdate(scope.row)">自动升级</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="autoCheckout(scope.row)">开启监控</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyLink(scope.row)">贡献连接</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="delTask(scope.row.id)">删除升级</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="delCheckUser(scope.row.id)">删除监控</span>
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
            :rows="4"
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
      pageNum: 1,
      pageSize: 10,
      listLoading: true,
      addDialog: false,
      submitLoading: false,
      timeout: null,
      loadingIcon: 'el-icon-video-play',
      formInline: {
        username: '',
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
    fetchData(dataPage) {
      this.listLoading = true
      const data = dataPage
        ? dataPage
        : { pageNum: this.pageNum, pageSize: this.pageSize, ...this.formInline }
      tableApi.getList(data).then((response) => {
        this.list = response.data.items
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('重新获取内容!')
      this.fetchData()
    },
    goWorkflows(url) {
      console.log('actionBtn---', url)
      if (url) {
        window.open(url, '_blank')
      }
    },
    resetForm(formName) {
      this.$refs.searchForm.resetFields()
      console.log('重制查询内容')
    },
    async updateAllUserinfo() {
      console.log('更新所有用户资料')
      this.loadingIcon = 'el-icon-loading'
      try {
        const res = await tableApi.updateAllUser()
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '更新用户信息成功',
            type: 'success'
          })
          this.fetchData()
          this.loadingIcon = 'el-icon-video-play'
        } else {
          this.$message.error('更新失败:' + res.message)
          this.loadingIcon = 'el-icon-video-play'
        }
      } catch (error) {
        this.$message.error('更新失败:' + error)
        this.loadingIcon = 'el-icon-video-play'
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.fetchData()
    },
    detailBtn(id) {
      console.log('actionBtn---', id)
      this.$router.push(`/xiaoshen/detail/${id}`)
    },
    async getInfoBtn(userInfo) {
      console.log('actionBtn---', userInfo)
      try {
        const res = await tableApi.updateUserInfo(userInfo)
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
    async autoUpdate(row) {
      try {
        this.$message({
          message: '开始创建自动升级任务...',
          type: 'success'
        })
        const params = {
          username: row.user_name,
          password: row.password,
          cookie: row.cookie,
          userAgent: row.user_agent,
          desc: row.desc
        }
        const res = await tableApi.addUpdateUser(params)
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，创建自动升级成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message.error('创建自动升级失败:' + res.message)
        }
      } catch (error) {
        this.$message.error('创建自动升级失败:' + error)
      }
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
      try {
        const res = await tableApi.delUser({ id })
        console.log('res---', res)
        this.$message({ message: '删除用户成功', type: 'success' })
        this.fetchData()
      } catch (error) {
        this.$message.error('删除用户失败')
      }
    },
    async delTask(id) {
      console.log('删除用户升级任务-', id)
      try {
        const res = await tableApi.delUpdateUser({ id })
        console.log('res---', res)
        this.$message({ message: '删除任务成功', type: 'success' })
        this.fetchData()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    async delCheckUser(id) {
      console.log('删除监控用户文件-', id)
      const res = await tableApi.delCheckUser({ id })
      console.log('res---', res)
      if (res.code === 200) {
        this.$message({ message: '删除成功', type: 'success' })
        this.fetchData()
      } else {
        this.$message.error('删除失败:' + res.message)
      }
    },
    async handelCopyUser(val) {
      console.log('val----', val)
      try {
        const user_info = `用户名: ${val.user_name}, \n密码: ${val.password}, \n提示: 严禁任何形式的留联系方式和广告内容，不但浪费你账号还害我账号也会被永久禁言！损人不利己！实时监控留言内容，一经发现封号处理并拉黑你的联系方式永不合作!`
        const res = await this.$copyText(user_info)
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
    },
    async autoCheckout(row) {
      try {
        this.$message({
          message: '开始创建账号监控任务...',
          type: 'success'
        })
        const params = {
          user_name: row.user_name,
          password: row.password,
          new_password: '1024xiaoshen@gmail.com',
          cookie: row.cookie,
          userAgent: row.user_agent
        }
        const res = await tableApi.addCheckUser(params)
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，自动监控创建成功',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message.error('创建监控失败:' + res.message)
        }
      } catch (error) {
        this.$message.error('创建监控失败:' + error)
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
  cursor: pointer;
}

.active {
  color: #409eff;
  cursor: pointer;
}

.waring {
  color: red;
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

.desc-btn {
  border: none;
  padding: 0;
}

.desc-box {
  display: block;
  width: 70px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>

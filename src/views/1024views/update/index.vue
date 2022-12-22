<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      size="medium"
      ref="updateForm"
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
        label="当前等级"
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
        label="当前威望"
        prop="weiwang"
      >
        <el-input
          class="select-w"
          v-model="formInline.weiwang"
          placeholder="威望"
        />
      </el-form-item>
      <el-form-item
        label="任务状态"
        prop="yaoqing"
      >
        <el-select
          class="select-w"
          v-model="formInline.status"
          placeholder="任务状态"
        >
          <el-option
            label="暂停中"
            value="zhengchang"
          />
          <el-option
            label="运行中"
            value="linshi"
          />
          <el-option
            label="运行失败"
            value="yongjiu"
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
          添加任务
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
        width="110"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="detailBtn(scope.row.id)"
          >{{ scope.row.user_name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="当前等级"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="当前/目标威望"
        align="center"
        width="110"
      >
        <template slot-scope="scope">
          <span>{{scope.row.weiwang}} / {{scope.row.target_weiwang}}點</span>
        </template>
      </el-table-column>
      <el-table-column
        label="当前金钱"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.money}} USD</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发帖"
      >
        <template slot-scope="scope">
          {{scope.row.article_num}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="可产邀请码"
      >
        <template slot-scope="scope">
          <span>{{scope.row.able_invate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="任务状态"
      >
        <template slot-scope="scope">

          <el-button
            v-if="scope.row.task_status === 0"
            size="medium"
            type="primary"
            icon="el-icon-loading"
          ></el-button>
          <el-button
            v-else-if="scope.row.task_status === 1"
            size="medium"
            type="primary"
            icon="el-icon-video-play"
          ></el-button>
          <el-button
            v-else-if="scope.row.task_status === 2"
            size="medium"
            type="danger"
            icon="el-icon-error"
          ></el-button>
          <span v-else>{{scope.row.task_status}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="250"
        label="任务链接"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="goWorkflows(scope.row.task_link)"
          >**/workflows/{{ scope.row.user_name }}.yml
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.creat_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述信息"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{scope.row.desc}}</span>
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
                <span @click="delTask(scope.row.id)">删除任务</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      title="添加升级任务"
      :visible.sync="addDialog"
      width="40%"
      top="9vh"
    >
      <el-form
        :model="updateForm"
        status-icon
        :rules="rules"
        ref="updateForm"
        size="medium"
        label-width="100px"
        class="add-Form"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="updateForm.username"
            autocomplete="off"
            style="width: 94%"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密 码"
          prop="password"
        >
          <el-input
            v-model="updateForm.password"
            autocomplete="off"
            style="width: 94%"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Cookie"
          prop="email"
        >
          <el-input
            v-model="updateForm.cookie"
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
            v-model="updateForm.userAgent"
            autocomplete="off"
            style="width: 94%"
            placeholder="请输入UserAgent"
            type="textarea"
            :rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述信息">
          <el-input
            v-model="updateForm.desc"
            autocomplete="off"
            style="width: 94%"
            placeholder="请输入描述信息"
          ></el-input>
        </el-form-item>
        <div class="tip-info">提示：账号密码 / Cookie</div>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="cancelAdd"
          size="medium"
        >取 消</el-button>
        <el-button
          type="primary"
          size="medium"
          :loading="submitLoading"
          @click="addUser('updateForm')"
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
      list: [],
      pageTotal: 0,
      listLoading: true,
      submitLoading: false,
      addDialog: false,
      formInline: {
        user: '',
        weiwang: '',
        level: '',
        status: '',
        yaoqing: ''
      },
      updateForm: {
        username: '',
        password: '',
        cookie: '',
        userAgent: '',
        desc: ''
      },
      rules: {
        username: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.fetchData()
    // 设置浏览器userAgent
    this.updateForm.userAgent = navigator.userAgent
  },
  methods: {
    fetchData() {
      this.listLoading = true
      tableApi.getUpdateList().then((response) => {
        this.list = response.data.items
        // Object.assign(this.list, response.data.items)
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    cancelAdd() {
      this.addDialog = false
      this.updateForm = {
        username: '',
        password: '',
        cookie: '',
        userAgent: navigator.userAgent,
        desc: ''
      }
      this.$refs.updateForm.resetFields()
      console.log('清空表单了')
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs.updateForm.resetFields()
      console.log('重制查询内容')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    async getUserInfo(val) {
      console.log('val-------', val)
      if (val.indexOf('winduser') !== -1) {
        console.log('cookie正确，开始发送请求')
        this.$message({
          message: 'cookie正确，开始获取用户信息...',
          type: 'success'
        })
        const res = await tableApi.getUserInfoByCookie(this.updateForm)
        console.log('res---', res)
        if (res.code === 200) {
          const userName = res.data.user_name
          this.updateForm.username = userName
          this.updateForm.desc = userName
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
    detailBtn(id) {
      console.log('actionBtn---', id)
      this.$router.push(`/xiaoshen/detail/${id}`)
    },
    goWorkflows(url) {
      console.log('actionBtn---', url)
      window.open(url, '_blank')
    },
    async addUser() {
      console.log('添加自动升级用户-')
      this.submitLoading = true
      try {
        const res = await tableApi.addUpdateUser(this.updateForm)
        console.log('res---', res)
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，创建自动升级成功',
            type: 'success'
          })
          this.submitLoading = false
          this.cancelAdd()
          this.fetchData()
        } else {
          this.$message.error('创建自动升级失败:' + res.message)
          this.submitLoading = false
        }
      } catch (error) {
        this.submitLoading = false
      }
    },
    async delTask(id) {
      console.log('删除用户-', id)
      try {
        const res = await tableApi.delUpdateUser({ id })
        console.log('res---', res)
        this.$message({ message: '删除成功', type: 'success' })
        this.fetchData()
      } catch (error) {
        this.$message.error('删除失败')
      }
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

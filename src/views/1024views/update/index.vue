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
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="detailBtn(scope.row.id)"
          >{{ scope.row.username }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="等级"
        width="100"
      >
        <template slot-scope="scope">
          <span>新手上路</span>
        </template>
      </el-table-column>
      <el-table-column
        label="威望"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <span>180000 點</span>
        </template>
      </el-table-column>
      <el-table-column
        label="贡献"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>2394727 點</span>
        </template>
      </el-table-column>
      <el-table-column
        label="金钱"
        width="140"
        align="center"
      >
        <template slot-scope="scope">
          <span>2137684179 USD</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="140"
        label="发帖/回复/点评"
      >
        <template slot-scope="scope">23/22/2</template>
      </el-table-column>
      <el-table-column
        align="center"
        width="130"
        label="可产邀请码"
      >
        <template slot-scope="scope"> 是/否(禁言23天) </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="130"
        label="状态"
      >
        <template slot-scope="scope">
          <span>正常</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="邮箱"
      >
        <template slot-scope="scope"> 1024sssssxiaoshen@gmail.com </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="90"
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
                <span @click="delUser(scope.row.id)">删除账号</span>
              </el-dropdown-item>
              <el-dropdown-item>不可用</el-dropdown-item>
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
      width="30%"
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
            style="width: 80%"
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
            style="width: 80%"
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
            style="width: 80%"
            placeholder="请输入Cookie"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="UserAgent"
          prop="invcode"
        >
          <el-input
            v-model="updateForm.userAgent"
            autocomplete="off"
            style="width: 80%"
            placeholder="请输入UserAgent"
          ></el-input>
        </el-form-item>
        <div class="tip-info">提示：账号密码 / Cookie</div>
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
      list: null,
      pageTotal: 0,
      listLoading: true,
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
        userAgent: ''
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
      tableApi.getList().then((response) => {
        // this.list = response.data.items
        // this.pageTotal = response.data.total
        this.listLoading = false
      })
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
    detailBtn(id) {
      console.log('actionBtn---', id)
      this.$router.push(`/xiaoshen/detail/${id}`)
    },
    async addUser() {
      console.log('添加自动升级用户-')
      this.addDialog = false
      const res = await tableApi.addUpdateUser(this.updateForm)
      console.log('res---', res)
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

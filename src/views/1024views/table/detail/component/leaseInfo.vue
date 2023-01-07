<template>
  <div>
    <!-- <div class="search-box">
      <el-form
        :inline="true"
        :model="formInline"
        size="medium"
        ref="searchForm"
        class="demo-form-inline"
      >
        <el-form-item
          label="邀请码"
          prop="username"
        >
          <el-input
            v-model.trim="formInline.invcode"
            autocomplete="off"
            style="width: 94%"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邀请码状态"
          prop="username"
        >
          <el-select
            v-model="formInline.isUsed"
            placeholder="状态"
            class="select-w"
            clearable
          >
            <el-option
              label="未使用"
              value="未使用"
            />
            <el-option
              label="已邀请"
              value="已邀请"
            />
            <el-option
              label="已过期"
              value="已过期"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="">
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
        <el-form-item
          label="购买数量"
          prop="username"
        >
          <el-input-number
            v-model="formInline.number"
            :min="1"
            :max="10"
            class="pay-box"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="onSubmit"
          >购买</el-button>
        </el-form-item>
        <el-form-item class="add-btn">
          <el-button
            class="export-btn"
            size="medium"
            type="primary"
            icon="el-icon-plus"
            @click="addDialog = true"
          >
            破解
          </el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div class="invcode-box">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="invcode"
          label="邀请码"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="paydate"
          label="购买时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="注册用户"
        >
        </el-table-column>
        <el-table-column
          prop="registdate"
          label="注册日期"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
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
                  <span @click="registUser(scope.row.id)">注册账号</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="delInvcode(scope.row)">删除这个</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <div>
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
  </div>
</template>

<script>
import tableApi from '@/api/table'

export default {
  name: 'BaseInfo',
  data() {
    return {
      formInline: {
        number: '',
        invcode: '',
        isUsed: ''
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
      tableData: [],
      addDialog: false,
      submitLoading: false,
      pageTotal: 0,
      pageNum: 1,
      pageSize: 8,
      listLoading: true,
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
  },
  methods: {
    fetchData(dataPage) {
      this.listLoading = true
      const id = this.$route.params.id
      const data = dataPage
        ? dataPage
        : {
            id,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            ...this.formInline
          }
      tableApi.getInvcodeList(data).then((response) => {
        this.tableData = response.data.items
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      this.$refs.searchForm.resetFields()
      console.log('购买邀请码')
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
      console.log('重置邀请码数量')
    },
    addUser() {
      this.$refs.searchForm.resetFields()
      console.log('添加破解')
    },
    getUserInfo() {
      this.$refs.searchForm.resetFields()
      console.log('重制查询内容')
    },
    registUser() {
      console.log('注册账号')
    },
    delInvcode() {
      console.log('删除邀请码')
    },
    handleCurrentChange() {
      console.log('页数变化')
    },
    handleSizeChange() {
      console.log('每页大小变化')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-box {
  .pay-box {
    width: 120px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.page-box {
  margin-top: 15px;
  height: 80px;
}
</style>
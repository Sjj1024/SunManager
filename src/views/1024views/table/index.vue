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
          <el-option
            label="禁止發言"
            value="禁止發言"
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
          @change=""
          clearable
        >
          <el-option
            label="1级账号"
            value=1
          />
          <el-option
            label="2级账号"
            value=2
          />
          <el-option
            label="3级账号"
            value=3
          />
          <el-option
            label="4级账号"
            value=4
          />
          <el-option
            label="5级账号"
            value=5
          />
          <el-option
            label="临时禁言"
            value="临时禁言"
          />
          <el-option
            label="永久禁言"
            value="永久禁言"
          />
          <el-option
            label="已被删除"
            value="已被删除"
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
            value="可以购买"
          />
          <el-option
            label="否"
            value="不可以"
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
          @click="addUser"
        >
          添加用户
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      class="table-box"
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
        width="200"
        label="等级 / 原级 / 量级"
      >
        <template slot-scope="scope">
          <span :class="{ 
            waring: scope.row.grade === '禁止發言',
           }">
            {{ scope.row.grade }} /
          </span>
          <span
            v-if="scope.row.original"
            class="original"
          >
            {{scope.row.original.dengji || scope.row.original.grade}}
          </span>
          <span :class="{ 
            one: scope.row.important === 1,
            two: scope.row.important === 2,
            three: scope.row.important === 3,
            fore: scope.row.important === 4,
            five: scope.row.important === 5,
           }">
            {{ scope.row.important }}级
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="威望"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.weiwang }}點</span>
          <span
            v-if="scope.row.original"
            class="grow"
          >
            <span>{{ scope.row.weiwang - scope.row.original.weiwang }}</span>
            <i class="el-icon-top"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="贡献"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contribute }}點</span>
          <span
            v-if="scope.row.original"
            class="grow"
          >
            <span v-if="scope.row.original.gongxian">{{ scope.row.contribute - scope.row.original.gongxian }}</span>
            <span v-if="scope.row.original.contribute">{{ scope.row.contribute - scope.row.original.contribute }}</span>
            <i class="el-icon-top"></i>
          </span>
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
        label="自动升级"
        width="120"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.task_status"
            active-value="已开启"
            inactive-value="未开启"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="(val) => confirmLog(updateChange, val, scope.row)"
          >
          </el-switch>
          <span
            :class="{'active':scope.row.task_status === '已开启'}"
            @click="goWorkflows(scope.row)"
          >
            {{ scope.row.task_status }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="自动监控"
        width="120"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.check_status"
            active-value="已开启"
            inactive-value="未开启"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="(val) => confirmLog(checkChange, val, scope.row)"
          >
          </el-switch>
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
        label="更新信息"
      >
        <template slot-scope="scope">
          <i
            :ref="'ref' + scope.row.user_id"
            class="el-icon-refresh refresh-info"
            @click="confirmLog(getInfoBtn, scope.row)"
          ></i>
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
                <span @click="confirmLog(getInfoBtn, scope.row)">更新资料</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="handelCopyUser(scope.row)">复制账号</span>
              </el-dropdown-item>
              <!-- <el-dropdown-item>
                <span @click="autoUpdate(scope.row)">自动升级</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="autoCheckout(scope.row)">开启监控</span>
              </el-dropdown-item> -->
              <el-dropdown-item>
                <span @click="handelCopyLink(scope.row)">贡献连接</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="confirmLog(delUser, scope.row)">删除账号</span>
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
        :page-sizes="[12, 24, 36, 48, 60, 72]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="13"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
    <!-- 添加用户 -->
    <RegistCaoliu
      ref="regist"
      @reFetchDate="fetchData"
    ></RegistCaoliu>
  </div>
</template>

<script>
import tableApi from '@/api/table'
import RegistCaoliu from '@/components/RegistCl/index.vue'

export default {
  name: 'Table',
  components: { RegistCaoliu },
  data() {
    return {
      list: null,
      pageTotal: 0,
      pageNum: 1,
      pageSize: 12,
      listLoading: true,
      timeout: null,
      loadingIcon: 'el-icon-video-play',
      isRefsh: false,
      formInline: {
        username: '',
        weiwang: '',
        level: '',
        status: '',
        yaoqing: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(dataPage) {
      this.listLoading = true
      const data = dataPage
        ? { ...dataPage, ...this.formInline }
        : { pageNum: this.pageNum, pageSize: this.pageSize, ...this.formInline }
      console.log('发送的参数是', data)
      tableApi.getList(data).then((response) => {
        this.list = response.data.items
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('重新获取内容!')
      this.fetchData({ pageNum: 1, pageSize: 12 })
    },
    goWorkflows(row) {
      console.log('actionBtn---', row)
      if (row && row.task_status === '已开启') {
        window.open(row.task_link, '_blank')
      }
      if (row && row.check_status === '已开启') {
        window.open(row.check_link, '_blank')
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
        this.$message({ message: '更新所有用户信息...', type: 'success' })
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
      console.log('actionBtn---', this.$refs[`ref${userInfo.user_id}`])
      this.$refs[`ref${userInfo.user_id}`].setAttribute(
        'class',
        'el-icon-loading refresh-info'
      )
      try {
        this.$message({ message: '更新用户资料...', type: 'success' })
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
      this.$refs[`ref${userInfo.user_id}`].setAttribute(
        'class',
        'el-icon-refresh refresh-info'
      )
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
    async updateChange(val, row) {
      console.log('升级状态改变--', val, row)
      if (val === '已开启') {
        this.autoUpdate(row)
      } else {
        this.delTask(row.id)
      }
    },
    async checkChange(val, row) {
      console.log('监控状态改变--', val, row)
    },
    confirmLog(fun, ...params) {
      this.$confirm('确定执行此操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fun(...params)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      this.fetchData()
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
    async addUser() {
      console.log('添加用户-')
      this.$refs.regist.showRegist()
    },
    async delUser(row) {
      console.log('删除用户-', row)
      try {
        const res = await tableApi.delUser(row)
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

  .refresh-info {
    display: block;
    width: 20px;
    height: 20px;
    margin-left: 34px;
    line-height: 20px;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    background-color: #409eff;
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
  }
  .select-w {
    width: 110px;
  }
  .select-u {
    width: 150px;
  }
}

.grow {
  margin-left: 5px;
  color: red;
}

.original {
  color: #aaa;
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
  color: rgb(238, 0, 0);
}

.one {
  color: red;
}

.two {
  color: rgba(240, 13, 13, 0.715);
}

.three {
  color: rgb(255, 128, 0);
}

.fore {
  color: rgb(242, 187, 8);
}

.five {
  color: #aaa;
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

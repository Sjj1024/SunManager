<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      ref="ruleForm"
      class="demo-form-inline"
    >
      <el-form-item
        label="用户名"
        prop="user"
      >
        <el-input
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
          placeholder="活动区域"
        >
          <el-option
            label="新手上路"
            value="shanghai"
          />
          <el-option
            label="侠客"
            value="beijing"
          />
          <el-option
            label="騎士"
            value="beijing"
          />
          <el-option
            label="圣騎士"
            value="beijing"
          />
          <el-option
            label="精靈王"
            value="beijing"
          />
          <el-option
            label="風云使者"
            value="beijing"
          />
          <el-option
            label="光明使者"
            value="beijing"
          />
          <el-option
            label="天使"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="威望"
        prop="weiwang"
      >
        <el-input
          v-model="formInline.weiwang"
          placeholder="威望"
        />
      </el-form-item>
      <el-form-item
        label="可产邀请码"
        prop="yaoqing"
      >
        <el-select
          v-model="formInline.yaoqing"
          placeholder="可产邀请码"
        >
          <el-option
            label="是"
            value="shanghai"
          />
          <el-option
            label="否"
            value="beijing"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >查询</el-button>
        <el-button @click="resetForm">重置</el-button>
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
        <template slot-scope="scope"> {{ scope.row.username }} </template>
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
      <!-- <el-table-column align="center" prop="created_at" label="注册时间">
        <template slot-scope="scope">
          <span>2022-11-05</span>
        </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        width="130"
        label="可产邀请码"
      >
        <template slot-scope="scope"> 是/否(禁言23天) </template>
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
                <span @click="detailBtn(scope.row.id)">文字按钮</span>
              </el-dropdown-item>
              <el-dropdown-item>复制帐号</el-dropdown-item>
              <el-dropdown-item>复制贡献连接</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
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
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: 'Table',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      pageTotal: 0,
      listLoading: true,
      formInline: {
        user: '',
        weiwang: '',
        level: '',
        yaoqing: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.list = response.data.items
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields()
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
      // this.$router.push(`/xiaoshen/manage`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.page-box {
  margin-top: 15px;
}
</style>

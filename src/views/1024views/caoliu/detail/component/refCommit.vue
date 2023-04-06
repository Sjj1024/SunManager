<template>
  <div>
    <div class="invcode-box">
      <el-table
        v-loading="listLoading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="文章名称"
          width="540"
        >
          <template slot-scope="scope">
            <span
              class="title-link"
              @click="goArticle(scope.row)"
            >{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="所在板块"
          width="100"
        >
          <template slot-scope="scope">
            <span
              class="title-link"
              @click="goCategory(scope.row)"
            >{{scope.row.category}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="re_replay"
          align="center"
          label="引用内容"
          width="120"
        >
          <template slot-scope="scope">
            <span
              class="title-link"
              @click="goCategory(scope.row)"
            >{{scope.row.re_replay}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="replay"
          label="回复内容"
          align="center"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="pub_time"
          label="回帖时间"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="edit"
          label="编辑"
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
                  <span @click="registUser(scope.row)">注册账号</span>
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
        :page-sizes="[20, 30, 40, 50, 60, 70]"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import tableApi from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'RefCommit',
  data() {
    return {
      tableData: [],
      addDialog: false,
      submitLoading: false,
      pageTotal: 0,
      pageNum: 1,
      pageSize: 20,
      listLoading: true
    }
  },
  computed: {
    ...mapGetters('board', ['clHome'])
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
      tableApi.getRefCommitList(data).then((response) => {
        this.tableData = response.data.items
        this.pageTotal = response.data.total
        this.listLoading = false
      })
    },
    goArticle(row) {
      console.log('查看文章', row)
      window.open(`${this.clHome}/${row.link}`, '_black')
    },
    goAuthor(row) {
      console.log('查看作者', row)
      window.open(`${this.clHome}/${row.author_link}`, '_black')
    },
    goCategory(row) {
      console.log('查看分类', row)
      window.open(`${this.clHome}/${row.category_link}`, '_black')
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
    registUser(row) {
      console.log('注册账号-' + row.invcode)
      this.$refs.regist.showRegist(row.invcode)
    },
    delInvcode() {
      console.log('删除邀请码')
    },
    handleCurrentChange(val) {
      console.log('页数变化：' + val)
      this.pageNum = val
      this.fetchData()
    },
    handleSizeChange() {
      console.log('每页大小变化')
    }
  }
}
</script>

<style lang="scss" scoped>
.invcode-box {
  height: 530px;
  overflow-y: scroll;
}

.title-link {
  color: #409eff;
  cursor: pointer;
}

.page-box {
  margin-top: 15px;
  height: 80px;
}
</style>
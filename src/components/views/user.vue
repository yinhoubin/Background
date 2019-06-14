<template>
  <div class="wrapper">
    <el-button type="success" round class="news" @click="see(0)">新建</el-button>
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed type="index" label="序号" width="49"></el-table-column>
        <el-table-column prop="name" label="账号" width="80"></el-table-column>
        <el-table-column prop="tel" label="电话" width="140"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50"></el-table-column>
        <el-table-column prop="idx" label="身份证号" width="250"></el-table-column>
        <el-table-column prop="des" label="备注" width="150"></el-table-column>
        <el-table-column label="生日" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.time|timeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" round @click="see(scope.row.id)">查看</el-button>
            <el-button type="danger" round @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>


<script>
import API from "../../common/js/API";
import fn from "../../common/js/fn";

export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    see(n) {
      this.$router.push("/home/user/create/" + n);
    },
    del(n) {
      // console.log(n);
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {         
          fn.httpurl(this, API.delUser, "get", { id: n }, d => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            fn.httpurl(this, API.findUser, "get", {}, d => {
              var data = d.data.data;
              this.tableData = data;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    fn.httpurl(this, API.findUser, "get", {}, d => {
      var data = d.data.data;
      this.tableData = data;
    });
  },
  beforeRouteEnter(to, from, next) {
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "0" || isAdmin == "1") {
      next();
    } else {
      window.open("/", "_self");
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  max-width: 1000px;
  padding-top: 20px;

  .news {
    margin-bottom: 20px;
  }
}
</style>
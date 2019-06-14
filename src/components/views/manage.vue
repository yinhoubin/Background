<template>
  <div class="wrapper">
    <div class="wrap">
      <el-button type="success" round class="news" @click="see(0)">新建</el-button>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="48"></el-table-column>
        <el-table-column prop="name" label="账号" width="228"></el-table-column>
        <el-table-column prop="prop" label="属性" width="228"></el-table-column>
        <el-table-column label="注册时间" width="228">
          <template slot-scope="scope">
            <span>{{scope.row.time|timeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" round @click="see(scope.row.id)">查看</el-button>
            <el-button type="danger" round @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      // console.log(n);
      this.$router.push("/home/manage/create/" + n);
    },
    del(n) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fn.httpurl(this, API.delManage, "get", { id: n }, d => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            fn.httpurl(this, API.findManage, "get", {}, d => {
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
    fn.httpurl(this, API.findManage, "get", {}, d => {
      var data = d.data.data;
      this.tableData = data;
    });
  },
  beforeRouteEnter(to, from, next) {
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "0") {
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
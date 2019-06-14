<template>
  <div class="wrapper">
    <el-button type="success" round class="news" @click="see(0)" v-if="onoff1">新建</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="48"></el-table-column>
      <el-table-column prop="tit" label="题目" width="304"></el-table-column>
      <el-table-column label="注册时间" width="304">
        <template slot-scope="scope">
          <span>{{scope.row.time|timeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" round @click="see(scope.row.id)">查看</el-button>
          <el-button type="danger" round @click="del(scope.row.id)" v-if="onoff1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      onoff1: true,
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    see(n) {
      this.$router.push("/home/news/create/" + n);
    },
    del(n) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fn.httpurl(this, API.delNews, "get", { id: n }, d => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            fn.httpurl(this, API.findNews, "get", {}, d => {
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
    fn.httpurl(this, API.findNews, "get", {}, d => {
      var data = d.data.data;
      this.tableData = data;
    });

    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "2") {
      this.onoff1 = false;
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
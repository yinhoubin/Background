<template>
  <div class="wrapper">
    <el-button type="success" round class="news" @click="see(0)" v-if="onoff1">新建</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="48"></el-table-column>
      <el-table-column prop="ip" label="ip" width="152"></el-table-column>
      <el-table-column prop="door" label="机房" width="152"></el-table-column>
      <el-table-column prop="num" label="编号" width="152"></el-table-column>
      <el-table-column prop="width" label="宽带" width="152"></el-table-column>
      <el-table-column label="使用" width="152">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">已出售</span>
          <span v-else>空闲</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            round
            @click="see(scope.row.id,look)"
            :disabled="scope.row.status == 0&& onoff1==false"
          >{{look}}</el-button>
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
      look: "查看",
      onoff1: true,
      tableData: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    see(n, s) {
      // console.log(n, s);
      if (s == "购买") {
        this.$http({
          url: API.updateDevice + "?id=" + n + "&status=0"
        }).then(d => {
          // console.log(d);
          if (d.data.code == -1) {
            fn.errCallback(this, d);
          }
          this.$message({
            message: "购买成功",
            type: "success"
          });
          this.$http({
            url: API.findDevice
          }).then(d => {
            // console.log(d.data.data);
            if (d.data.code == -1) {
              fn.errCallback(this, d);
            }
            var data = d.data.data;
            this.tableData = data;
            // console.log(this.tableData);
          });
        });
      } else {
        this.$router.push("/home/device/create/" + n);
      }
    },
    del(n) {
      // console.log(n);
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          fn.httpurl(this, API.delDevice, "get", { id: n }, d => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            fn.httpurl(this, API.findDevice, "get", {}, d => {
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
    fn.httpurl(this, API.findDevice, "get", {}, d => {
      var data = d.data.data;
      this.tableData = data;
    });

    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "2") {
      this.look = "购买";
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
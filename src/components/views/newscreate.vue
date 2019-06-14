<template>
  <div class="wrapper1">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="题目">
        <el-input v-model="form.tit" :disabled="onoff1==false"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.con" :disabled="onoff1==false"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-col>
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.time"
            style="width: 100%;"
            :disabled="onoff1==false"
          ></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="create(manage)" :disabled="onoff1==false">{{manage}}</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
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
      manage: "注册",
      form: {
        id: "",
        tit: "",
        con: "",
        time: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    create(n) {
      //注册
      if (n == "注册") {
        fn.httpurl(this, API.addNews, "get", this.form, d => {
          if (d.data.code == 0) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.push("/home/news");
          } else {
            this.$message({
              message: d.data.info,
              type: "warning"
            });
          }
        });
      } else {
        fn.httpurl(
          this,
          API.updateNews,
          "get",
          {
            id: this.form.id,
            tit: this.form.tit,
            con: this.form.con,
            time: this.form.time
          },
          d => {
            if (d.data.code == 0) {
              this.$message({
                message: d.data.info,
                type: "success"
              });
              this.$router.push("/home/news");
            }
          }
        );
      }
    }
  },
  mounted() {
    this.form.id = this.$route.params.id;
    if (this.$route.params.id != 0) {
      this.manage = "修改";

      fn.httpurl(
        this,
        API.findNews + "?id=" + this.$route.params.id,
        "get",
        {},
        d => {
          this.form = d.data.data[0];
        }
      );
    }
    var isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == "2") {
      this.look = "购买";
      this.onoff1 = false;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
<template>
  <div class="wrapper1">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="属性">
        <el-input v-model="form.prop"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-col>
          <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="create(manage)">{{manage}}</el-button>
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
      manage: "注册",
      form: {
        id: "",
        name: "",
        pass: "",
        prop: "",
        time: ""
      },
      disabled: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    create(n) {
      // console.log(this.form);
      //注册
      if (n == "注册") {
        fn.httpurl(this, API.addManage, "get", this.form, d => {
          if (d.data.code == 0) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.push("/home/manage");
          } else {
            this.$message({
              message: d.data.info,
              type: "warning"
            });
          }
        });
      } else {
        fn.httpurl(this, API.updateManage, "get", this.form, d => {
          if (d.data.code == 0) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.push("/home/manage");
          }
        });
      }
    }
  },
  mounted() {
    // console.log(this.$route.params.id);
    this.form.id = this.$route.params.id;
    //查看
    if (this.$route.params.id != 0) {
      this.disabled = true;
      this.manage = "修改";

      fn.httpurl(
        this,
        API.findManage + "?id=" + this.$route.params.id,
        "get",
        {},
        d => {
          this.form.name = d.data.data[0].name;
          this.form.pass = d.data.data[0].pass;
          this.form.prop = d.data.data[0].prop;
          this.form.time = d.data.data[0].time;
        }
      );
    }
  }
};
</script>

<style lang="stylus" scoped></style>
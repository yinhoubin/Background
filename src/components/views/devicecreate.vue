<template>
  <div class="wrapper1">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="ip">
        <el-input v-model="form.ip"></el-input>
      </el-form-item>
      <el-form-item label="机房">
        <el-input v-model="form.door"></el-input>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="宽带">
        <el-input v-model="form.width"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio label="1">空闲</el-radio>
          <el-radio label="0">已售出</el-radio>
        </el-radio-group>
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
        ip: "",
        door: "",
        num: "",
        width: "",
        status: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    create(n) {
      //注册
      if (n == "注册") {
        fn.httpurl(this, API.addDevice, "get", this.form, d => {
          if (d.data.code == 0) {
            this.$message({
              message: d.data.info,
              type: "success"
            });
            this.$router.push("/home/device");
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
          API.updateDevice,
          "get",
          {
            id: this.form.id,
            door: this.form.door,
            num: this.form.num,
            width: this.form.width,
            status: this.form.status
          },
          d => {
            if (d.data.code == 0) {
              this.$message({
                message: d.data.info,
                type: "success"
              });
              this.$router.push("/home/device");
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
        API.findDevice + "?id=" + this.$route.params.id,
        "get",
        {},
        d => {
          this.form = d.data.data[0];
        }
      );
    }
  }
};
</script>

<style lang="stylus" scoped></style>
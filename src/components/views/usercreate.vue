<template>
  <div class="wrapper1">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.name" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="form.pass" autocomplete="off" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm" v-if="onoff">
        <el-input type="password" v-model="confirm" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="form.tel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex" :disabled="disabled">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.idx" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.des"></el-input>
      </el-form-item>
      <el-form-item label="生日">
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

var pattern = {
  tel: /^((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
};

export default {
  components: {},
  props: {},
  data() {
    return {
      manage: "注册",
      onoff: true,
      confirm: "",
      form: {
        id: "",
        name: "",
        pass: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        des: "",
        time: ""
      },
      disabled: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    create(n) {
      //注册
      if (n == "注册") {
        // console.log(this.form);
        if (this.form.pass != this.confirm) {
          this.$message({
            message: "密码和确认密码不一致",
            type: "warning"
          });
          return;
        } else if (!pattern.tel.test(this.form.tel)) {
          this.$message({
            message: "请填写正确的电话哦~",
            type: "warning"
          });
          return;
        } else if (!pattern.email.test(this.form.email)) {
          this.$message({
            message: "请填写正确的邮箱哦~",
            type: "warning"
          });
          return;
        } else {
          fn.httpurl(this, API.addUser, "get", this.form, d => {
            if (d.data.code == 0) {
              this.$message({
                message: d.data.info,
                type: "success"
              });
              this.$router.push("/home/user");
            } else {
              this.$message({
                message: d.data.info,
                type: "warning"
              });
            }
          });
        }
      } else {
        // console.log(this.form)
        if (!pattern.tel.test(this.form.tel)) {
          this.$message({
            message: "请填写正确的电话哦~",
            type: "warning"
          });
          return;
        } else if (!pattern.email.test(this.form.email)) {
          this.$message({
            message: "请填写正确的邮箱哦~",
            type: "warning"
          });
          return;
        } else {
          fn.httpurl(
            this,
            API.updateUser,
            "get",
            {
              id: this.form.id,
              name: this.form.name,
              pass: this.form.pass,
              tel: this.form.tel,
              email: this.form.email,
              des: this.form.des
            },
            d => {
              if (d.data.code == 0) {
                this.$message({
                  message: d.data.info,
                  type: "success"
                });
                this.$router.push("/home/user");
              }
            }
          );
        }
      }
    }
  },
  mounted() {
    this.form.id = this.$route.params.id;
    if (this.$route.params.id != 0) {
      this.disabled = true;
      this.onoff = false;
      this.manage = "修改";
      fn.httpurl(
        this,
        API.findUser + "?id=" + this.$route.params.id,
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
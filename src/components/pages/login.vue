<template>
  <div class="wrapper">
    <div class="el-row">
      <div class="el-col el-col-6 el-col-offset-9">
        <div class="el-card box-card is-always-shadow">
          <div class="el-card__header">登录</div>
          <div class="el-card__body">
            <div class="inp">
              <el-select v-model="user.type" placeholder="请选择" class="sel">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="inp">
              <el-input v-model="user.name" placeholder="用户名" clearable></el-input>
            </div>
            <div class="inp">
              <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
            </div>
            <div class="dengru inp">
              <el-button type="primary" plain @click="login()">登录</el-button>
            </div>
          </div>
        </div>
      </div>
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
      user: {
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        },
        {
          value: "2",
          label: "用户"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    login() {
      var data = this.user;
      data = this.$qs.stringify(data);

      fn.httpurl(this, API.login, "post", data, d => {
        if (d.data.code == 0) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          localStorage.setItem("username", this.user.name);
          localStorage.setItem("isAdmin", d.data.isAdmin);
          this.$router.replace("/home");
        } else {
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.wrapper {
  background: #e5e9f2;
  height: 100vh;
  position: relative;

  .el-col {
    margin-top: 30vh;

    .el-card {
      border: 1px solid #ebeef5;
      background-color: #fff;
      color: #303133;
      transition: 0.3s;
      border-radius: 4px;
      overflow: hidden;
    }

    .is-always-shadow {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .el-card__header {
    text-align: center;
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
  }

  .el-card__body {
    padding: 20px;
  }

  .sel {
    width: 100%;
  }

  .inp {
    margin-top: 10px;
  }

  .dengru {
    text-align: center;
  }
}
</style>
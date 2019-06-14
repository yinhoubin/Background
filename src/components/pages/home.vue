<template>
  <div class="wrapper">
    <el-container>
      <el-header>
        <div class="myHeader">
          <img src="../../../static/images/icon.ece29c4.jpg" alt>
          <h3>
            <span>{{username}}</span>
            <div class="box-card" @click="tuichu()">退出登录</div>
          </h3>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <router-link to="/home/manage" active-class="select" v-if="onoff1">管理员管理</router-link>
          <router-link to="/home/user" active-class="select" v-if="onoff2">用户管理</router-link>
          <router-link to="/home/news" active-class="select">通知</router-link>
          <router-link to="/home/device" active-class="select">设备管理</router-link>
        </el-aside>
        <el-main>
          <h3>{{$route.name}}</h3>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      username:'',
      onoff1:true,
      onoff2:true
    };
  },
  watch: {},
  computed: {},
  methods: {
    tuichu() {
      this.$http({
        url: "/api/exit",
        method: "get"
      }).then(d => {
        // console.log(d);
        this.$router.replace("/login");
        this.$message({
          message: '亲，请先登录',
          type: 'warning'
        });
      });
    }
  },
  mounted() {
    this.username=localStorage.getItem('username')
    var isAdmin=localStorage.getItem('isAdmin')
    if(isAdmin=='1'){
      this.onoff1=false
    }
    if(isAdmin=='2'){
      this.onoff1=false
      this.onoff2=false
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  .el-container{
   height 100%vh
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #666;

    .myHeader {
      float: right;

      img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        border-radius: 50%;
        float: left;
      }

      h3 {
        float: left;
        line-height: 60px;
        margin-left: 20px;
        position: relative;
        cursor: pointer;
        width: 100px;
        text-align: center;

        .box-card {
          position: absolute;
          width: 120px;
          left: -20px;
          top: 60px;
          background: #fff;
          text-align: center;
          border-radius: 3px;
          display: none;
          border: 1px solid #e5e9f2;
        }

        &:hover {
          background-color: #fff;

          .box-card {
            display: block;
          }
        }
      }
    }
  }

  .el-aside {
    background-color: #D3DCE6;
    text-align: center;
    line-height: 40px;
    color: #333;
    

    a {
      display: block;
      color: #333;

      &:hover {
        background-color: #fff;
      }
    }

    .select {
      background: #b3c0d1;
    }
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    
    h3 {
      padding-bottom: 20px;
      font-size: 28px;
      color: #333;
    }
  }
}
</style>
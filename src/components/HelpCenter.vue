<template>
  <div id="Help">
    <van-nav-bar
      title="帮助中心"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="mainItem">
        <div class="topItem">
          <h2><van-icon name="play" />使用帮助：</h2>
          <p @click="mag">常见问题</p>
          <p @click="mag">DNS设置</p>
          <p @click="mag">客户端设置</p>
        </div>
        <div class="topItem">
          <h2><van-icon name="play" />疑惑解决：</h2>
          <p @click="mag">登录问题</p>
          <p @click="mag">其他问题</p>
          <p @click="mag">管理员账号密码</p>
        </div>
        <div>
          <h2><van-icon name="play" />联系我们：</h2>
          <div class="imgItem">
            <van-icon name="phone" size="2.7rem" />
            <div class="right">
              <p>联系电话</p>
              <h3>0441-22333444</h3>
            </div>
          </div>
          <div class="imgItem">
            <van-icon name="envelop-o" size="2.7rem" class="email" />
            <div class="right">
              <p>联系邮箱</p>
              <h3>ncvtqqquanquan@.net</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    mag(){
        this.$toast({
        message: "不用点了，都一样的，你都是靓仔！",
      });
    }
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: white;
  margin: 0 auto;
  .mainItem {
    width: 92%;
    margin: 0 auto;
    .topItem {
      h2 {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }
      p {
        margin: 10px;
        color: rgb(0, 181, 253);
      }
    }
    h2 {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
    }
    .imgItem {
      display: flex;
      border: steelblue 3px solid;
      margin: 10px 0;
      padding: 5px 10px;
      .email {
        transform: rotate(-10deg);
      }
      .right {
        margin-left: 10px;
        h3 {
          color: steelblue;
          padding: 5px 0;
        }
      }
    }
  }
}
</style>
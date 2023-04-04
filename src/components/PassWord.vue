<template>
  <div id="Help">
    <van-nav-bar
      title="修改密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="form">
        <div class="inputItem">
          <div class="left">请输入旧密码：</div>
          <div class="right">
            <input
              type="password"
              v-model="Opassword"
              placeholder="输入原来密码"
            />
          </div>
        </div>
         <div class="inputItem" v-show="active11">
          <div class="active">新密码不能和旧密码一样</div>
        </div>
        <div class="inputItem">
          <div class="left">请输入新密码：</div>
          <div class="right">
            <input
              type="password"
              v-model="Npassword"
              @blur="NN11"
              @focus="AA11"
              placeholder="输入新密码"
            />
          </div>
        </div>
        <div class="inputItem" v-show="active">
          <div class="active">两次填写新密码不一样！</div>
        </div>
        <div class="inputItem">
          <div class="left">请确认新密码：</div>
          <div class="right">
            <input
              type="password"
              v-model="NNpassword"
              @blur="NN"
              @focus="AA"
              placeholder="确认新密码"
            />
          </div>
        </div>
        <div class="bottom">
          <van-button type="info" @click="submit">确认修改</van-button>
          <van-button type="default" @click="onClickLeft">取消</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/network/index.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      Opassword: "",
      Npassword: "",
      NNpassword: "",
      active: false,
      active11: false,
      id: Cookies.get("id"),
      timer: 0,
      PageId: Cookies.get("parentId"),
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    AA11() {
      this.active11 = false;
    },
    AA() {
      this.active = false;
    },
    NN11() {
      if (this.Opassword == this.Npassword) {
         this.active11 = true;
        
      } else {
       this.$toast({
          message: "请输入新密码",
        });
      }
    },
    NN() {
      if (this.NNpassword == "") {
        this.$toast({
          message: "请再次输入新密码",
        });
      } else if (this.NNpassword != this.Npassword) {
        this.active = true;
      }
    },
    submit() {
      if (this.Opassword == "") {
        this.$toast({
          message: "原密码不能为空",
        });
      } else if (this.Npassword == "") {
        this.$toast({
          message: "请输入新密码",
        });
      } else if (this.NNpassword == "") {
        this.$toast({
          message: "请确认您的新密码",
        });
      } else if (this.NNpassword != this.Npassword) {
        this.$toast({
          message: "两次密码不相同",
        });
      } else {
        network
          .put(`updatedPws/${this.id}`, {
            old_password: this.Opassword,
            new_password: this.Npassword,
          })
          .then((data) => {
            if (data.data.status === 200) {
              this.$toast.success({
                message: "修改成功",
              });
              clearTimeout(this.timer); //清除延迟执行
              this.timer = setTimeout(() => {
                //设置延迟执行
                this.$router.push("/Me");
              }, 2000);
            }
            if (data.data.status === 401) {
              this.$toast({
                message: "原来密码错误",
              });
              this.Opassword = "";
              this.Npassword = "";
              this.NNpassword = "";
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  background: white;
  overflow: scroll;
  margin: 0 auto;
  .form {
    width: 95%;
    margin: 20px auto;
    padding: 20px auto;
    background: rgb(224, 224, 224);
    border-radius: 10px;
    overflow: hidden;
    .inputItem {
      width: 90%;
      margin: 20px auto;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-items: center;
      .right {
        input {
          padding: 5px 10px;
        }
      }
      .active {
        color: crimson;
      }
    }
    .bottom {
      text-align: center;
      button {
        margin: 20px;
      }
    }
  }
}
</style>
<template>
  <div id="login-layout">
    <div class="main">
      <div class="nav">
        <h1>双高任务系统登录</h1>
        <p class="nav-p">南宁职业技术学院</p>
      </div>
      <div class="form">
        <div class="form-top">
          使用
          <span>教职工号</span>登录
        </div>
        <form @submit.prevent="submit">
          <div class="inputs">
            <input
                id="username"
                class="username"
                v-model="username"
                type="text"
                placeholder=" "
                required
            />
            <label for="username">教职工号、用户名</label>
          </div>
          <div class="inputs">
            <input
                id="password"
                class="password"
                v-model="password"
                type="password"
                placeholder=" "
                required
            />
            <label for="password">密码</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" v-model="remember" name id="remember" />
            <label for="remember">记住登录状态</label>
          </div>
          <input class="submit" type="submit" value="登录" />
          <div class="bottom">
            登录遇到问题？
            <span>点击了解</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import network from "../network/index.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      // input value
      username: "",
      password: "",
      remember: false,
    };
  },
  methods: {
    submit() {
      //登录验证
      function trim(str) {
        if (str == null) {
          str = "";
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }

      this.username = trim(this.username);
      this.password = trim(this.password);
      if (this.username === "" || this.username.indexOf(" ") !== -1) {
         this.$toast({
            message: "用户名错误",
          });
        return false;
      } else if (this.password === "" || this.password.indexOf(" ") !== -1) {
            this.$toast({
            message: "密码错误",
          });
        return false;
      }

      //通过后发送网络请求
      network
        .post("login", {
          workerNumber: this.username,
          password: this.password,
        })
        .then((data) => {
          // console.log(data);
          const status = data.data;
          if (status.status === 200) {
            if (this.remember) {
              setCookies(status.data, 7);
            } else {
              setCookies(status.data, 1);
            }
            this.$router.push("/");
          }
        })
        .catch((error) => {
          if (error.response) {
            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
            if (error.response.status === 400) {
                       this.$toast({
            message: "账号或密码错误",
          });
            }
          } else if (error.request) {
            // 请求已经成功发起，但没有收到响应
                     this.$toast({
            message: "服务器请求失败",
          });
            console.log(error.request);
          } else {
            // 发送请求时出了点问题
                    this.$toast({
            message: "致命错误！！！",
          });
            console.log("Error", error.message);
          }
        });

      function setCookies(data, time) {
        Cookies.set(
          "position",
          (function () {
            if (data.data.position) {
              return data.data.position.name;
            } else {
              return " ";
            }
          })(),
          {
            expires: time,
          }
        );
        Cookies.set(
          "rofessional",
          (function () {
            if (data.data.rofessional) {
              return data.data.rofessional.name;
            } else {
              return " ";
            }
          })(),
          {
            expires: time,
          }
        );
        Cookies.set("token", data.token, {
          expires: time,
        });
        Cookies.set("name",data.data.name,{
          expires: time
        });
        Cookies.set("phone",data.data.phone,{
          expires: time
        });
        Cookies.set("email",data.data.email,{
          expires: time
        });
        Cookies.set("image",data.data.image,{
          expires: time
        });
        Cookies.set("id",data.data._id,{
          expires: time
        });
        Cookies.set("parentId", data.data.parentId, {
          expires: time,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
#login-layout {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.main {
  padding-top: 30px;
}
.nav {
  overflow: hidden;
  text-align: center;
}
.nav h1 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 20px;
  overflow: hidden;
}
.nav p {
  font-size: 1em;
  font-weight: bold;
  margin: 20px;
}
.form {
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
}
.form-top {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 7px;
}
.form-top span {
  margin: 0 13px;
}
.inputs {
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
}

.inputs > input {
  width: 100%;
  border: 0;
  outline: 0;
  border: 0.1rem solid #ccc;
  padding: 0.5rem;
  transition: 0.2s ease-in-out;
  border-radius: 4px;
  height: 50px;
  color: #000!important;
}
.inputs > input:focus,
.inputs > input:focus + label {
  border-color: #1892F9;
  color: #1892F9;
}
.inputs > input:focus + label,
.inputs > input:not(:placeholder-shown) + label{
  font-weight: bold;
  top: 0;
  font-size: 0.8rem;
}
.inputs > label {
  padding-left: 5px;
  padding-right: 5px;
  transition: 0.2s ease-in-out;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #000;
}
.checkbox {
  width: 100%;
  margin: 15px 0;
  position: relative;
}
.checkbox input {
  display: inline-block;
  height: 18px;
  width: 18px;
}
.checkbox label {
  position: absolute;
  margin-top: -1px;
  padding: 0 8px;
  font-weight: bold;
}
.submit {
  width: 100%;
  margin: 30px 0;
  background: #1A73E8;
  color: white;
  display: block;
  font-weight: bold;
  height: 40px;
  border-radius: 4px;
}
.submit:hover {
  background-color: #2B7DE9;
}
.bottom {
  margin-top: 20px;
  color: black;
  text-align: center;
  font-size: 1.1em;
  font-weight: bold;
}
.bottom span {
  color: #1892f9;
}
</style>
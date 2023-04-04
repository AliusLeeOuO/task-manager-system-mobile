<template>
  <div id="Calendar">
    <div class="MrTopBox">
      <div class="MrTop">
        <div class="userimg">
          <img :src="img" alt="头像" />
        </div>
        <div class="MrTop-r">
          <p class="username">{{name}}-{{ position }}</p>
          <p>{{ rofessional }}</p>
          <p class="userphone">{{ phone }}</p>
        </div>
      </div>
      <div class="alert">
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
          请及时查看任务进程。
        </van-notice-bar>
      </div>
    </div>

    <div v-show="PageId == 0">
      <Dean></Dean>
    </div>
    <div v-show="PageId == 1">
      <Major></Major>
    </div>
    <div v-show="PageId == 2">
      <Teacher></Teacher>
    </div>

    <div class="personal">
      <router-link to="/PassWord"
        ><div class="personal-item">
          <div class="personal-item-l">
            <van-icon name="manager-o" />
            <p>修改密码</p>
          </div>
          <div class="personal-item-r"><van-icon name="arrow" /></div></div
      ></router-link>
      <router-link to="/Personal"
        ><div class="personal-item">
          <div class="personal-item-l">
            <van-icon name="manager-o" />
            <p>基本信息</p>
          </div>
          <div class="personal-item-r"><van-icon name="arrow" /></div></div
      ></router-link>
      <router-link to="/HelpCenter"
        ><div class="personal-item">
          <div class="personal-item-l">
            <van-icon name="question-o" />
            <p>帮助中心</p>
          </div>
          <div class="personal-item-r"><van-icon name="arrow" /></div></div
      ></router-link>
    </div>
    <div class="loginout" @click="exit">
      <div class="loginout-item">
        <div class="loginout-item-l">
          <van-icon name="revoke" />
          <p>退出登录</p>
        </div>
        <div class="loginout-item-r"><van-icon name="arrow" /></div>
      </div>
    </div>

    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/HomePage" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/Statistics" icon="bar-chart-o" dot
        >统计</van-tabbar-item
      >
      <van-tabbar-item replace to="/Calendar" icon="envelop-o"
        >消息</van-tabbar-item
      >
      <van-tabbar-item replace to="/Me" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Dean from "../components/Me/Dean";
import Major from "../components/Me/Major";
import Teacher from "../components/Me/Teacher";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      id: Cookies.get("id"),
      PageId: Cookies.get("parentId"),
      position: Cookies.get("position"),
      rofessional: Cookies.get("rofessional"),
      img: Cookies.get("image"),
      phone: Cookies.get("phone"),
      name: Cookies.get("name"),
      ExamineItem:0,
    };
  },
  
  methods: {
    exit() {
      Cookies.remove("img");
      Cookies.remove("phone");
      Cookies.remove("position");
      Cookies.remove("rofessional");
      Cookies.remove("token");
      Cookies.remove("parentId");
      this.$router.push("/login");
    },
  },
  components: {
    Dean,
    Major,
    Teacher,
  },
};
</script>


<style lang="less" scoped>
#Calendar {
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background: rgba(228, 228, 228, 0.527);
}

.MrTopBox {
  height: 210px;
  width: 100%;
  background: rgba(45, 124, 189, 0.541);
  border-bottom-right-radius: 40%;
  border-bottom-left-radius: 40%;
  padding-top: 14px;
  overflow: hidden;
  .MrTop {
    width: 95%;
    margin: 0 auto;
    height: 65px;
    display: flex;
    overflow: hidden;
    margin-bottom: 15px;
    .userimg {
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .MrTop-r {
      flex: 1;
      margin: 5px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .username {
        font-size: 17px;
        font-weight: bold;
      }
      .userphone {
        font-size: 13px;
      }
    }
  }
  .alert {
    width: 90%;
    margin: 0 auto;
    @notice-bar-height: "30px";
  }
}

.personal {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  background: white;
  .personal-item {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    border-bottom: solid 1px rgba(204, 204, 204, 0.5);
    .personal-item-l {
      display: flex;
      p {
        margin-left: 7px;
      }
    }
    .personal-item-r {
      margin-right: 15px;
    }
  }
}
.loginout {
  width: 95%;
  margin: 20px auto;
  border-radius: 10px;
  background: white;
  .loginout-item {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    border-bottom: solid 1px rgba(204, 204, 204, 0.5);
    .loginout-item-l {
      display: flex;
      p {
        margin-left: 7px;
      }
    }
    .loginout-item-r {
      margin-right: 15px;
    }
  }
}
</style>
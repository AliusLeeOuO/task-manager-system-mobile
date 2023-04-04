<template>
  <div id="modify">
    <van-nav-bar
      title="子任务"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="Crumbs" v-for="(item, index) in task" :key="index">
      <span @click="HomePage">首页</span> &nbsp;>&nbsp;
      <span @click="Suntask">{{ item.taskname }}</span>
    </div>
    <div class="Alltask" v-for="(val, index) in task" :key="index + '-info'">
      <div
        v-for="(item, index) in val.children"
        :key="index"
        @click="Detailed(item._id, index)"
        class="Alltaskitem"
      >
        <div class="top">
          <p class="title">
            {{ item.taskname }}
          </p>
          <van-button plain id="buttom" :type="item.status | StyleType">{{
            item.status | TaskStatus
          }}</van-button>
        </div>
        <div class="center">
          <div class="center-left">
            <p>任务简述：{{ item.describe }}</p>
            <p>
              任务负责人：<span
                v-for="(value, index) in item.worker"
                :key="index"
                >{{ value.name }}&nbsp;&nbsp;</span
              >
            </p>
            <p class="time">截止时间：{{ item.endtime | fliterTime }}</p>
            <p
              class="linkChildren"
              @click="Detailed(item._id, index)"
              v-show="item.children != undefined"
            >
              查看子任务 > >
            </p>
          </div>
          <van-circle
            v-model="item.process"
            :rate="item.process"
            layer-color="#ebedf0"
            :stroke-width="60"
            :text="'进度' + item.process + '%'"
          />
        </div>

        <div class="CreateTask">
          <div class="View" @click.stop="ViewTask(item._id, item.taskname)">
            查看任务
          </div>
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
      roleTwo: Cookies.get("parentId"),
      task: [],
    };
  },
  created() {
    const roleTwo = Cookies.get("parentId");
    if (roleTwo === "0") {
      network.get(`dean/getTask/${this.$route.query.id}`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.task = status.data;
          // console.log(this.task);
        }
      });
    } else if (roleTwo === "1") {
      network.get(`major/getTask/${this.$route.query.id}`, {}).then((data) => {
        const status = data.data;
        // console.log(status);
        if (status.status === 200) {
          this.task = status.data;
        }
      });
    } else if (roleTwo === "2") {
      network
        .get(`teacher/getTask/${this.$route.query.id}`, {})
        .then((data) => {
          const status = data.data;
          // console.log(status);
          if (status.status === 200) {
            this.task = status.data;
          }
        });
    } else {
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goBack() {
      this.$router.replace({ path: "/" });
      //replace替换原路由，作用是避免回退死循环
    },
    Detailed(id, index) {
      const suntask = this.task[0].children[index].children;
      // console.log(suntask);
      // console.log(this.task[0].taskname)
      // console.log(this.task[0]._id)
      const Uid = this.task[0]._id;
      const Utaskname = this.task[0].taskname;
      if (suntask != undefined) {
        this.$router.push({
          path: "Third",
          name: "Third",
          query: {
            id: id,
            Uid: Uid,
            Uname: Utaskname,
          },
        });
      } else {
        this.$toast({
          message: "没有子任务了哟(＾Ｕ＾)ノ~ＹＯ",
        });
      }
    },
    HomePage() {
      this.$router.replace(`/HomePage`);
    },
    Suntask() {
      this.$toast({
        message: "就是本页面啦！",
      });
    },
    ViewTask(id, taskname) {
      this.$router.push({
        path: "ViewTask",
        name: "ViewTask",
        query: {
          id: id,
        },
      });
    },
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
};
</script>

<style lang="less" scoped>
#modify {
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background: white;
}
.Crumbs {
  width: 100%;
  background: rgb(240, 240, 240);
  padding: 10px 20px;
  span {
    color: rgb(0, 140, 255);
  }
}
@import url("../../assets/css/HomePage.less");
</style>

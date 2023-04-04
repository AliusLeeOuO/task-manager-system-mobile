<template>
  <div id="Search">
    <van-nav-bar
      title="查找任务"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div v-show="Show" class="Show">没有相关的任务</div>
    <div class="Alltask">
      <div
        v-for="(item, index) in taskItem"
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
            <div
              class="View"
              @click.stop="ViewTask(item._id, item.taskname)"
            >
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
      Search: [],
      id: Cookies.get("id"),
      taskItem: [],
      Show: false,
    };
  },
  created() {
    network
      .get("search", {
        params: {
          taskname: this.$route.query.SearchName,
          userId: this.id,
        },
      })
      .then((data) => {
        const status = data.data;
        // console.log(status.status)
        if (status.status === 200) {
          this.taskItem = status.data;
          //   console.log(this.taskItem);
          if (this.taskItem == "") {
            this.Show = true;
          }
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    Detailed(id, index) {
      const suntask = this.taskItem[index].children;
      // console.log(suntask);
      if (suntask != undefined) {
        this.$router.replace(`/Suntask?id=${id}`);
      } else {
        this.$toast({
          message: "该任务没有子任务了哟(＾Ｕ＾)ノ~ＹＯ",
        });
      }
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
};
</script>

<style lang="less" scoped>
#Search {
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background: rgba(228, 228, 228, 0.527);
}
.Show {
  text-align: center;
  margin: 50px auto;
  font-size: 18px;
}
@import url("../assets/css/HomePage.less");
</style>
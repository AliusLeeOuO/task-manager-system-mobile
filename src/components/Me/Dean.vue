<template>
  <div class="suntask">
    <!-- <router-link to="/TaskListVV"
        ><div class="suntask-item">
          <div class="suntask-item-l">
            <van-icon name="edit" />
            <p>查看任务</p>
             <van-badge />
          </div>
          <div class="suntask-item-r"><van-icon name="arrow" /></div></div
      ></router-link>
    <router-link to="/TaskList"
      ><div class="suntask-item">
        <div class="suntask-item-l">
          <van-icon name="delete-o" />
          <p>删除/修改任务</p>
        </div>
        <div class="suntask-item-r"><van-icon name="arrow" /></div></div
    ></router-link>
     -->
  </div>
</template>

<script>
import network from "@/network/index.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      id: Cookies.get("id"),
      ExamineItem: 0,
    };
  },
  created() {
    network.get(`examine/unread/${this.id}`, {}).then((data) => {
      // console.log(data);
      if (data.data.status === 200) {
        this.ExamineItem = data.data.data.count;
      }
    });
  },
};
</script>

<style lang="less" scoped>
.suntask {
  width: 95%;
  margin: 0 auto;
  border-radius: 10px;
  background: white;
  margin-top: -50px;
  .suntask-item {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    border-bottom: solid 1px rgba(204, 204, 204, 0.5);
    .suntask-item-l {
      display: flex;
      p {
        margin-left: 7px;
      }
    }
    .suntask-item-r {
      margin-right: 15px;
    }
  }
}
</style>
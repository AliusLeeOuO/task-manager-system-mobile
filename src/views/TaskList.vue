<template>
  <div id="delete">
    <van-nav-bar
      title="删除/修改任务"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
      请选择任务并右滑进行删除/修改。
    </van-notice-bar>

    <div
      class="tasklist"
      v-show="PageId == 0"
      v-for="(value, index) in task"
      :key="index + '-info'"
    >
      <van-collapse v-model="value._id" accordion>
        <van-collapse-item :title="value.taskname" name="value._id">
          <div v-for="(item, index) in value.children" :key="index">
            <van-swipe-cell>
              <template #left>
                <van-button square type="primary" text="查看" />
              </template>
              <van-cell
                :border="false"
                :title="item.taskname"
                :value="item.status | TaskStatus"
              >
              </van-cell>
              <template #right>
                <van-button
                  square
                  type="danger"
                  text="删除"
                  @click="taskDelete(item._id, index)"
                />
                <van-button
                  square
                  type="primary"
                  text="修改"
                  @click="UpDataTask(item._id)"
                />
              </template>
            </van-swipe-cell>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <div
      class="tasklist"
      v-for="(item, index) in task"
      :key="index"
      v-show="PageId == 1 || PageId == 2"
    >
      <van-swipe-cell>
        <template #left>
          <van-button square type="primary" text="查看" />
        </template>
        <van-cell
          :border="false"
          :title="item.taskname"
          :value="item.status | TaskStatus"
        >
        </van-cell>
        <template #right>
          <van-button
            square
            type="danger"
            text="删除"
            @click="taskDelete(item._id, index)"
          />
          <van-button
            square
            type="primary"
            text="修改"
            @click="UpDataTask(item._id)"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import network from "@/network/index.js";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      PageId: Cookies.get("parentId"),
      id: Cookies.get("id"),
      task: [],
      taskId: "",
    };
  },
  created() {
    if (this.PageId == 0) {
      network.get("dean/getTasks", {}).then((data) => {
        const status = data.data;
        // console.log(status.data.task);
        if (status.status === 200) {
          this.task = status.data.task;
        }
      });
    }
    if (this.PageId == 1) {
      network.get(`major/getTasks/${this.id}`, {}).then((data) => {
        const status = data.data;
        // console.log(status.data.task);
        if (status.status === 200) {
          // console.log(status.data);
          this.task = status.data.creatorTask;
        }
      });
    }
    if (this.PageId == 2) {
      network.get(`teacher/getTasks/${this.id}`, {}).then((data) => {
        const status = data.data;
        // console.log(status.data.task);
        if (status.status === 200) {
          this.task = status.data.creatorTask;
        }
      });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    taskDelete(id, index) {
      // console.log(id);
      if (this.PageId == 0) {
        network
          .delete(`dean/deleteTask/${id}`, {
           data: {
              userId: this.id,
            },
          })
          .then((data) => {
            // console.log(data);
            if (data.status === 200) {
              this.$toast({
                message: "删除成功",
              });
              this.task.splice(index, 1);
            } else if (data.status === 400) {
              this.$toast({
                message: "删除失败",
              });
            } else {
              this.$toast({
                message: "服务器请求失败",
              });
            }
          });
      }
      if (this.PageId == 1) {
        network
          .delete(`major/deleteTask/${id}`, {
            data: {
              userId: this.id,
            },
          })
          .then((data) => {
            // console.log(data);
            if (data.status === 200) {
              this.$toast({
                message: "删除成功",
              });
              this.task.splice(index, 1);
            } else if (data.status === 400) {
              this.$toast({
                message: "删除失败",
              });
            } else {
              this.$toast({
                message: "服务器请求失败",
              });
            }
          });
      }
      if (this.PageId == 2) {
        network
          .delete(`dean/deleteTask/${id}`, {
            data: {
              userId: this.id,
            },
          })
          .then((data) => {
            // console.log(data);
            if (data.status === 200) {
              this.$toast({
                message: "删除成功",
              });
              this.task.splice(index, 1);
            } else if (data.status === 400) {
              this.$toast({
                message: "删除失败",
              });
            } else {
              this.$toast({
                message: "服务器请求失败",
              });
            }
          });
      }
    },
    UpDataTask(id) {
      this.$router.replace(`/UpDataTask?id=${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
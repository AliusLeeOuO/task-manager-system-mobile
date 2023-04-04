<template>
  <div id="Major">
    <van-tabs v-model="active" class="top-tab">
      <van-tab title="自己的任务">
        <div class="Alltask">
          <div
            v-for="(item, index) in workerTask"
            :key="index"
            @click="Detailed(item._id, index)"
            class="Alltaskitem"
          >
            <div class="top">
              <p class="title">
                {{ item.taskname }}
              </p>
               <van-button plain  id="buttom" :type="item.status | StyleType">{{
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
                 <p class="linkChildren" @click="Detailed(item._id, index)" v-show="item.children!=undefined">查看子任务 > ></p>     
              </div>
              <van-circle
                v-model="item.process"
                :rate="item.process"
                layer-color="#ebedf0"
                :stroke-width="60"
                :text="'进度' + item.process + '%'"
              />
            </div>
            <div class="CreateTask1">
              <div
                class="Newtask"
                @click.stop="ViewTask(item._id, item.taskname)"
              >
                查看任务
              </div>
              <div
                class="Newtask"
                @click.stop="ReferTask(item._id, item.taskname)"
              >
                提交任务
              </div>
              <div
                @click.stop="CreateTask(item._id, item.taskname, item.grade)"
              >
                添加子任务
              </div>
            </div>
          </div>

          <div class="more">
            <div v-if="moreShowBoolen" @click="WorkerTask" class="moreShow">
              点击查询更多
            </div>
            <div v-else>已无更多</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我创建的任务">
        <div class="Alltask">
          <div
            v-for="(item, index) in creatorTask"
            :key="index"
            @click="Detailed(item._id, index)"
            class="Alltaskitem"
          >
            <div class="top">
              <p class="title">
                {{ item.taskname }}
              </p>
               <van-button plain  id="buttom" :type="item.status | StyleType">{{
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
              <div class="Newtask" @click.stop="taskDelete(item._id, index)">
                删除任务
              </div>
              <div
                class="UpDataTask"
                @click.stop="UpDataTask(item._id, item.taskname)"
              >
                更改任务
              </div>
            </div>
          </div>
          <div class="more">
            <div v-if="moreShowBoolen1" @click="moreShow" class="moreShow">
              点击查询更多
            </div>
            <div v-else>已无更多</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
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
      moreShowBoolen: false,
      moreShowBoolen1: false,
      //	创建的任务
      creatorTask: [],
      //  负责的任务
      workerTask: [],
      active: 0,
      skipNumber: 0,
      limitNumber: 2,
      WorkerMoreSkip: 0,
      WorkerMoreLimit: 2,
      CreateMoreSkip: 0,
      CreateMoreLimit: 2,
    };
  },
  created() {
    if (this.PageId == 1) {
      network
        .get(`major/getTasks/${this.id}`, {
          params: {
            skipNumber: this.skipNumber,
            limitNumber: this.limitNumber,
          },
        })
        .then((data) => {
          const status = data.data;
          // console.log(status.data);
          this.creatorTask = status.data.creatorTask;
          this.workerTask = status.data.workerTask;
          if (status.data.workerTask.length > 1) {
            this.moreShowBoolen = true;
          } else {
            this.moreShowBoolen = false;
          }
          if (status.data.creatorTask.length > 1) {
            this.moreShowBoolen1 = true;
          } else {
            this.moreShowBoolen1 = false;
          }
        });
    }
  },
  methods: {
    WorkerTask() {
      this.WorkerMoreSkip = this.WorkerMoreSkip + 2;
      this.WorkerMoreLimit = this.WorkerMoreLimit + 2;
      network
        .get(`major/getTasks/${this.id}`, {
          params: {
            skipNumber: this.WorkerMoreSkip,
            limitNumber: this.WorkerMoreLimit,
          },
        })
        .then((data) => {
          const status = data.data;
          // console.log(status.data);
          this.workerTask = this.workerTask.concat(status.data.workerTask);
          // console.log(this.workerTask);
          if (status.data.workerTask.length > 1) {
            this.moreShowBoolen = true;
          } else {
            this.moreShowBoolen = false;
          }
        });
    },
    moreShow() {
      this.CreateMoreSkip = this.CreateMoreSkip + 2;
      this.CreateMoreLimit = this.CreateMoreLimit + 2;
      network
        .get(`major/getTasks/${this.id}`, {
          params: {
            skipNumber: this.CreateMoreSkip,
            limitNumber: this.CreateMoreLimit,
          },
        })
        .then((data) => {
          const status = data.data;
          // console.log(status.data);
          this.creatorTask = this.creatorTask.concat(status.data.creatorTask);
          // console.log(this.creatorTask);
          if (status.data.creatorTask.length > 1) {
            this.moreShowBoolen1 = true;
          } else {
            this.moreShowBoolen1 = false;
          }
        });
    },
    Detailed(id, index) {
      const suntask = this.workerTask[index].children;
      // console.log(suntask)
      if (suntask != undefined) {
        this.$router.replace(`/Suntask?id=${id}`);
      } else {
        this.$toast({
          message: "该任务没有子任务了哟(＾Ｕ＾)ノ~ＹＯ",
        });
      }
    },
    ReferTask(id, taskname) {
      this.$router.push({
        path: "ReferTask",
        name: "ReferTask",
        query: {
          id: id,
          taskname: taskname,
        },
      });
    },
    CreateTask(id, taskname) {
      this.$router.push({
        path: "TaskCreate",
        name: "TaskCreate",
        query: {
          id: id,
          taskname: taskname,
        },
      });
    },
    UpDataTask(id, taskname) {
      this.$router.push({
        path: "UpDataTask",
        name: "UpDataTask",
        query: {
          id: id,
          taskname: taskname,
        },
      });
    },
    taskDelete(id, index) {
      if (this.PageId == 1) {
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
              this.creatorTask.splice(index, 1);
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
    ViewTask(id) {
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
@import url("../../assets/css/HomePage.less");
.CreateTask1 {
  margin-top: 15px;
  padding-top: 8px;
  border-top: 1px solid #ccc;
  color: #1989fa;
  text-align: center;
  font-size: 16px;
  display: flex;
  div {
    flex-basis: 33.3%;
  }
  .Newtask {
    border-right: #1989fa 2px solid;
  }
}
</style>
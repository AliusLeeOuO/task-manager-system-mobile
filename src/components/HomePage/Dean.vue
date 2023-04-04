<template>
  <van-tabs v-model="active">
    <van-tab title="全部任务">
      <div class="Alltask">
        <div
          v-for="(item, index) in datatask"
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
              class="Newtask"
              @click.stop="UpDataTask(item._id, item.taskname)"
            >
              查看任务
            </div>
            <div @click.stop="CreateTask(item._id, item.taskname, item.grade)">
              添加子任务
            </div>
          </div>
        </div>

        <div class="more">
          <div v-if="moreShowBoolen" @click="moreShow" class="moreShow">
            点击查询更多
          </div>
          <div v-else>已无更多</div>
        </div>
      </div>
    </van-tab>
    <van-tab title="审核中">
      <div class="Alltask">
        <div
          v-for="(item, index) in filter0"
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
              class="Newtask"
              @click.stop="UpDataTask(item._id, item.taskname)"
            >
              查看任务
            </div>
            <div @click.stop="CreateTask(item._id, item.taskname, item.grade)">
              添加子任务
            </div>
          </div>
        </div>

        <div class="more">
          <div v-if="0" @click="moreShow" class="moreShow">点击查询更多</div>
          <div v-else>已无更多</div>
        </div>
      </div>
    </van-tab>
    <van-tab title="进行中">
      <div class="Alltask">
        <div
          v-for="(item, index) in filter1"
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
              class="Newtask"
              @click.stop="UpDataTask(item._id, item.taskname)"
            >
              查看任务
            </div>
            <div @click.stop="CreateTask(item._id, item.taskname, item.grade)">
              添加子任务
            </div>
          </div>
        </div>

        <div class="more">
          <div v-if="moreShowBoolen" @click="moreShow" class="moreShow">
            点击查询更多
          </div>
          <div v-else>已无更多</div>
        </div>
      </div>
    </van-tab>
    <van-tab title="已完成">
      <div class="Alltask">
        <div
          v-for="(item, index) in filter2"
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
              class="Newtask"
              @click.stop="UpDataTask(item._id, item.taskname)"
            >
              查看任务
            </div>
            <div @click.stop="CreateTask(item._id, item.taskname, item.grade)">
              添加子任务
            </div>
          </div>
        </div>

        <div class="more">
          <div v-if="0" @click="moreShow" class="moreShow">点击查询更多</div>
          <div v-else>已无更多</div>
        </div>
      </div>
    </van-tab>
  </van-tabs>
</template>

<script>
import network from "@/network/index.js";
export default {
  data() {
    return {
      moreShowBoolen: true,
      datatask: [],
      active: 0,
      skipNumber: 0,
      limitNumber: 2,
    };
  },
  created() {
    network
      .get("dean/getTasks", {
        params: {
          skipNumber: this.skipNumber,
          limitNumber: this.limitNumber,
        },
      })
      .then((data) => {
        const status = data.data;
        this.datatask = status.data.task;
        // console.log(this.datatask);
        if (status.data.task.length > 1) {
          this.moreShowBoolen = true;
        } else {
          this.moreShowBoolen = false;
        }
      });
  },
  computed: {
    filter0() {
      let { datatask } = this;
      let a = datatask.filter((data) => {
        return data.status === 1;
      });
      return a;
    },
    filter1() {
      let { datatask } = this;
      let a = datatask.filter((data) => {
        return data.status === 0;
      });
      return a;
    },
    filter2() {
      let { datatask } = this;
      let a = datatask.filter((data) => {
        return data.status === 3;
      });
      return a;
    },
  },
  methods: {
    moreShow() {
      this.skipNumber = this.skipNumber + 2;
      network
        .get("dean/getTasks", {
          params: {
            skipNumber: this.skipNumber,
            limitNumber: this.limitNumber,
          },
        })
        .then((data) => {
          const status = data.data;
          this.datatask = this.datatask.concat(status.data.task);
          if (status.data.task.length > 1) {
            this.moreShowBoolen = true;
          } else {
            this.moreShowBoolen = false;
          }
        });
    },
    Detailed(id, index) {
      const suntask = this.datatask[index].children;
      // console.log(suntask);
      if (suntask != undefined) {
        this.$router.replace(`/Suntask?id=${id}`);
      } else {
        this.$toast({
          message: "该任务没有子任务了哟(＾Ｕ＾)ノ~ＹＯ",
        });
      }
    },
    CreateTask(id, taskname, grade) {
      this.$router.push({
        path: "TaskCreate",
        name: "TaskCreate",
        query: {
          id: id,
          taskname: taskname,
          grade: grade,
        },
      });
    },
    UpDataTask(id) {
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
</style>
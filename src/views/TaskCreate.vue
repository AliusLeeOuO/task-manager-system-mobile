<template>
  <div id="suntask">
    <van-nav-bar
      title="新建任务"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="form">
      <div class="formitem">
        <p>父级任务：</p>
        <div class="parentTask">
          {{ this.$route.query.taskname }}
        </div>
      </div>
      <div class="formitem">
        <p>任务名称：</p>
        <div class="parentTask">
          <input
            type="text"
            placeholder="请输入任务名称"
            v-model="taskname"
            required
          />
        </div>
      </div>
      <div class="formitem">
        <p>任务简述：</p>
        <div class="parentTask">
          <textarea
            type="text"
            class="bili"
            placeholder="请输入任务简介"
            v-model="describe"
          />
        </div>
      </div>
      <div class="formitem">
        <p>结束时间：</p>
        <div class="parentTask1">
          <van-cell @click="showPopupEnd">{{ end_time }}</van-cell>
          <van-popup
            v-model="showEnd"
            position="bottom"
            :style="{ height: '50%' }"
          >
            <van-datetime-picker
              v-model="currentDateEnd"
              type="date"
              v-show="showEnd"
              title="选择年月日"
              :min-date="minDateEnd"
              :max-date="maxDateEnd"
              @cancel="showEnd = false"
              @confirm="confirmEnd"
            />
          </van-popup>
        </div>
      </div>
      <div class="formitem">
        <p>派发给：</p>
        <div class="checkbox">
          <van-collapse v-model="activeName" accordion>
            <van-collapse-item title="专业带头人" name="1" v-show="PageId==0 || PageId==1">
              <van-checkbox-group
                v-model="result"
                v-for="(item, index) in listmajor"
                :key="index"
                class="checkboxItem"
                ref="checkboxGroup"
              >
                <van-checkbox
                  :name="item._id"
                  shape="square"
                  @click="Checkbox(item._id)"
                  >{{ item.name }}</van-checkbox
                >
              </van-checkbox-group>
            </van-collapse-item>
            <van-collapse-item title="普通老师" name="2">
              <van-checkbox-group
                v-model="result"
                v-for="(item, index) in list"
                :key="index"
                class="checkboxItem"
                ref="checkboxGroup"
              >
                <van-checkbox
                  :name="item._id"
                  shape="square"
                  @click="Checkbox(item._id)"
                  >{{ item.name }}</van-checkbox
                >
              </van-checkbox-group>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <div class="bottom">
        <van-button type="info" @click="submit">提交</van-button>
        <van-button type="default" @click="onClickLeft">取消</van-button>
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
      minDateEnd: new Date(),
      maxDateEnd: new Date(2025, 10, 1),
      currentDateEnd: new Date(),
      end_time: "选择结束时间", //结束时间
      showEnd: false,
      parentTaskname: "",
      taskname: "",
      describe: "",
      worker: [],
      list: [],
      listmajor: [],
      result: [],
      checked: 0,
      id: Cookies.get("id"),
      timer: 0,
      PageId: Cookies.get("parentId"),
      activeName: 0,
    };
  },
  created() {
    if (this.PageId == 0) {
      network.post("dean/position", {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.listmajor = status.data;
        }
      });
      network.post(`major/position`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.list = status.data;
        }
      });
    } else if (this.PageId == 1) {
      network.post(`major/position`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.list = status.data;
        }
      });
      network.post("dean/position", {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.listmajor = status.data;
        }
      });
    } else if (this.PageId == 2) {
      network.post(`teacher/position`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.list = status.data;
        }
      });
    } else {
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopupEnd() {
      this.showEnd = true;
    },
    confirmEnd(val1) {
      let year = val1.getFullYear(); //年
      let month = val1.getMonth() + 1; //月
      let day = val1.getDate(); //日
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      this.end_time = `${year}-${month}-${day}`;
      this.showEnd = false;
    },
    submit() {
      if (this.taskname == "") {
        this.$toast({
          icon: "weapp-nav",
          message: "请设置任务名称",
        });
        return false;
      } else if (this.describe == "") {
        this.$toast({
          icon: "comment",
          message: "填写任务简介",
        });
        return false;
      } else if (this.end_time == "选择结束时间") {
        this.$toast({
          icon: "clock",
          message: "请设置任务结束时间",
        });
        return false;
      } else if (this.worker == "") {
        this.$toast({
          icon: "friends",
          message: "请选择分配对象",
        });
        return false;
      } else {
        if (this.PageId == 0) {
          network
            .post("dean/createTask", {
              taskname: this.taskname,
              describe: this.describe,
              endtime: this.end_time,
              userId: this.id,
              creator: this.id,
              worker: this.worker,
              parentId: this.$route.query.id,
              grade: this.$route.query.grade + 1,
            })
            .then((data) => {
              // console.log(data);
              if (data.status === 200) {
                this.$toast.success({
                  message: "新建成功",
                });
                clearTimeout(this.timer); //清除延迟执行
                this.timer = setTimeout(() => {
                  //设置延迟执行
                  this.$router.push("/HomePage");
                }, 2000);
              }
            });
        } else if (this.PageId == 1) {
          // console.log(this.$route.query.id);
          network
            .post("major/submitTask", {
              taskname: this.taskname,
              describe: this.describe,
              endtime: this.end_time,
              userId: this.id,
              creator: this.id,
              worker: this.worker,
              parentId: this.$route.query.id,
            })
            .then((data) => {
              // console.log(data);
              // return false
              if (data.status === 200) {
                this.$toast.success({
                  message: "新建成功",
                });
                clearTimeout(this.timer); //清除延迟执行
                this.timer = setTimeout(() => {
                  //设置延迟执行
                  this.$router.push("/HomePage");
                }, 2000);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (this.PageId == 2) {
          network
            .post("teacher/submitTask", {
              taskname: this.taskname,
              describe: this.describe,
              endtime: this.end_time,
              userId: this.id,
              creator: this.id,
              worker: this.worker,
              parentId: this.$route.query.id,
              grade: this.$route.query.grade + 1,
            })
            .then((data) => {
              // console.log(data);
              if (data.status === 200) {
                this.$toast.success({
                  message: "新建成功",
                });
                clearTimeout(this.timer); //清除延迟执行
                this.timer = setTimeout(() => {
                  //设置延迟执行
                  this.$router.push("/HomePage");
                }, 2000);
              }
            });
        } else {
        }
      }
    },
    Checkbox(id) {
      const status = this.worker.indexOf(id);
      if (status == -1) {
        this.worker.push(id);
      }
      if (status > -1) {
        const status = this.worker.indexOf(id);
        this.worker.splice(status, 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  width: 95%;
  margin: 20px auto;
  background: rgb(224, 224, 224);
  border-radius: 10px;
  overflow: hidden;
  .formitem {
    width: 90%;
    margin: 20px auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-items: center;
    p {
      text-align: right;
      flex-basis: 25%;
    }
    .parentTask {
      flex: 1;
      padding: 10px;
      background: white;
      input {
        width: 100%;
      }
      textarea {
        width: 100%;
      }
    }
    .parentTask1 {
      flex: 1;
    }
    .checkbox {
      flex: 1;
      padding: 10px;
      background: white;
    }
  }
  .bottom {
    text-align: center;
    button {
      margin: 20px;
    }
  }
}
</style>


<template>
  <div id="modify">
    <van-nav-bar
      title="修改任务"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form" v-for="(item, index) in task" :key="index">
      <div class="formitem">
        <p>任务名称：</p>
        <div>
          <input type="text" v-model="taskname" required />
        </div>
      </div>
      <div class="formitem">
        <p>任务简述：</p>
        <div>
          <textarea type="text" class="bili" v-model="describe" />
        </div>
      </div>

      <div class="formitem">
        <p>结束时间：</p>
        <div>
          <van-cell @click="showPopupEnd">{{ endtime | fliterTime }}</van-cell>
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
        <p>任务附件：</p>
        <div class="files">
          <div
            class="filesItem"
            v-for="(value, index) in item.fileAddress"
            :key="index + '- info'"
            v-show="ShowFiles"
          >
            <div class="fileName">
              <a
                v-for="(valitem, index) in value.files"
                :key="'-' + index"
                :href="
                  'https://quanquan.asia/' +
                  valitem.path +
                  '-' +
                  valitem.originalname
                "
                class="link"
                title="点击下载"
                >{{ valitem.originalname }}&nbsp;、&nbsp;</a
              >
            </div>
          </div>
          <div class="filesItem" v-show="!ShowFiles">
            <p>暂无提交附件</p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <van-button type="info" @click="submit">修改 </van-button>
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
      PageId: Cookies.get("parentId"),
      id: this.$route.query.id,
      task: [],
      minDateEnd: new Date(),
      maxDateEnd: new Date(2025, 10, 1),
      currentDateEnd: new Date(),
      endtime: "", //结束时间
      showEnd: false,
      taskname: "",
      describe: "",
      worker: [],
      creator: Cookies.get("id"),
      timer: 0,
      ShowFiles: true,
    };
  },
  created() {
    if (this.PageId == 0) {
      network.get(`dean/getTask/${this.$route.query.id}`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.task = status.data;
          this.taskname = status.data[0].taskname;
          this.describe = status.data[0].describe;
          this.endtime = status.data[0].endtime;
          if (
            status.data[0].fileAddress == undefined ||
            status.data[0].fileAddress == 0
          ) {
            this.ShowFiles = false;
          }
        }
      });
    }
    if (this.PageId == 1) {
      network.get(`major/getTask/${this.$route.query.id}`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.task = status.data;
          this.taskname = status.data[0].taskname;
          this.describe = status.data[0].describe;
          this.endtime = status.data[0].endtime;
          if (
            status.data[0].fileAddress == undefined ||
            status.data[0].fileAddress == 0
          ) {
            this.ShowFiles = false;
          }
        }
      });
    }
    if (this.PageId == 2) {
      network
        .get(`teacher/getTask/${this.$route.query.id}`, {})
        .then((data) => {
          const status = data.data;
          if (status.status === 200) {
            this.task = status.data;
            this.taskname = status.data[0].taskname;
            this.describe = status.data[0].describe;
            this.endtime = status.data[0].endtime;
            if (
              status.data[0].fileAddress == undefined ||
              status.data[0].fileAddress == 0
            ) {
              this.ShowFiles = false;
            }
          }
        });
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
      this.endtime = `${year}-${month}-${day}`;
      this.showEnd = false;
    },
    submit() {
      if (this.PageId == 0) {
        network
          .put(`dean/updataTask/${this.id}`, {
            taskname: this.taskname,
            describe: this.describe,
            endtime: this.endtime,
            userId: this.creator,
          })
          .then((data) => {
            // console.log(data);
            this.$router.replace(`/HomePage`);
            if (data.status === 200) {
              this.$toast.success({
                message: "修改成功",
              });
              clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                this.$router.push("/HomePage");
              }, 2000);
            }
          });
      }
      if (this.PageId == 1) {
        network
          .put(`major/updataTask/${this.id}`, {
            userId: this.creator,
            endtime: this.endtime,
            taskname: this.taskname,
            describe: this.describe,
          })
          .then((data) => {
            // console.log(data);
            this.$router.replace(`/HomePage`);
            if (data.status === 200) {
              this.$toast.success({
                message: "修改成功",
              });
              clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                this.$router.push("/HomePage");
              }, 2000);
            }
          });
      }
      if (this.PageId == 2) {
        network
          .put(`teacher/updataTask/${this.id}`, {
            task: {
              data: {
                userId: this.creator,
                taskname: this.taskname,
                describe: this.describe,
                endtime: this.endtime,
              },
            },
          })
          .then((data) => {
            // console.log(data);
            this.$router.replace(`/HomePage`);
            if (data.status === 200) {
              this.$toast.success({
                message: "修改成功",
              });
              clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                this.$router.push("/HomePage");
              }, 2000);
            }
          });
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
    div {
      flex: 1;
      input {
        width: 100%;
        padding: 10px;
      }
      textarea {
        padding: 10px;
        width: 100%;
        height: 60px;
      }
      .van-dropdown-menu {
        width: 100%;
        .van-dropdown-menu-item {
          width: 500%;
          margin: 0 auto;
        }
      }
    }
    p {
      text-align: right;
      flex-basis: 25%;
    }
    .files {
      flex-basis: 75%;
      width:75%;
      flex-wrap: wrap;
      .fileName {
        .link,
        .link:visited {
          margin: 5px 0;
          color: #1989fa;
        }
      }
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


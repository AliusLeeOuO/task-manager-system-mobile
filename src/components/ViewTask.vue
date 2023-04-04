<template>
  <div id="modify">
    <van-nav-bar
      title="任务详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="form" v-for="(item, index) in task" :key="index" action="">
      <div class="formitem">
        <div class="left">任务名称：</div>
        <div class="formdiv">
          {{ item.taskname }}
        </div>
      </div>
      <div class="formitem">
        <div class="left">任务简介：</div>
        <div class="formdiv">
          {{ item.describe }}
        </div>
      </div>
      <div class="formitem">
        <div class="left">负责人：</div>
        <div class="worker">
          <span v-for="(value, index) in item.worker" :key="index"
            >{{ value.name }} &nbsp;</span
          >
        </div>
      </div>
      <div class="formitem">
        <div class="left">当前进度：</div>
        <div class="formdiv">{{ item.process }}%</div>
        <van-button
          type="info"
          style="height: 36.6px; width: 70px"
          @click="remindTask(item._id)"
          >督办</van-button
        >
      </div>
      <div class="formitem">
        <div class="left">结束时间：</div>
        <div class="formdiv">
          {{ item.endtime | fliterTime }}
        </div>
      </div>
      <div class="filesDiv">
        <div class="file-left">任务附件：</div>
        <div class="files">
          <div
            class="filesItem"
            v-for="(value, index) in item.fileAddress"
            :key="index + '- info'"
            v-show="ShowFiles"
          >
            <div class="title">
              <p>第{{ index + 1 }}次提交</p>
              <van-button
                type="info"
                id="repulse"
                @click="repulse(value._id)"
                size="mini"
                v-show="creator==PrincipalID || PageId==0"
                >打回</van-button
              >
            </div>
            <div class="describe">
              <p>提交简述：{{ value.describe }}</p>
              <p>提交时间：{{ value.createdAt | fliterTime }}</p>
              <p>提交人：{{ value.name }}</p>
              <div class="process">
                <p>进度：</p>
                <van-progress :percentage="value.process" stroke-width="3" />
              </div>
              <div class="fff">
                <p>附件：</p>
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
                    :download="
                      'https://quanquan.asia/' +
                      valitem.path +
                      '-' +
                      valitem.originalname
                    "
                    class="link"
                    title="点击下载"
                    >{{ valitem.originalname }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="filesItem" v-show="!ShowFiles">
            <h3>暂无提交附件</h3>
          </div>
        </div>
      </div>
      <div type="primary" id="export" block @click="ExportFiles(item._id)" v-show="ShowFiles">
        导出全部文件
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/network/index.js";
import Cookies from "js-cookie";
import axios from "axios";
export default {
  data() {
    return {
      PageId: Cookies.get("parentId"),
      id: this.$route.query.id,
      task: [],
      creator: Cookies.get("id"),
      timer: 0,
      fileList: [],
      files: [],
      name: "",
      ShowFiles: true,
      timer: 0,
      PrincipalID: "",
    };
  },
  created() {
    if (this.PageId == 0) {
      network.get(`dean/getTask/${this.$route.query.id}`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.task = status.data;
          // console.log(this.task);
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
          // console.log(this.task);
           this.PrincipalID = status.data[0].creator._id;
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
            this.PrincipalID = status.data[0].parentId._id;
            // console.log(this.PrincipalID);
            // console.log(this.creator)
            // console.log(this.task);
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
    repulse(id) {
      // console.log(id);
      network
        .put(`examine/returnAudit/${id}`, {
          userId: this.creator,
        })
        .then((data) => {
          const statsus = data.data;
          if (statsus.status === 200) {
            this.$toast.success({
              message: "打回成功",
            });
            clearTimeout(this.timer); //清除延迟执行
            this.timer = setTimeout(() => {
              //设置延迟执行
              this.$router.push(`/ViewTask?id=${this.$route.query.id}`);
            }, 2000);
          } else if (statsus.status === 401 || statsus.status === 402) {
            this.$toast({
              message: "任务已被打回，请勿重复操作！！",
            });
            clearTimeout(this.timer); //清除延迟执行
            this.timer = setTimeout(() => {
              //设置延迟执行
              this.$router.push(`/ViewTask?id=${this.$route.query.id}`);
            }, 2000);
          } else if (statsus.status === 404) {
            this.$toast({
              message: "找不到审核任务",
            });
            clearTimeout(this.timer); //清除延迟执行
            this.timer = setTimeout(() => {
              //设置延迟执行
              this.$router.push(`/ViewTask?id=${this.$route.query.id}`);
            }, 2000);
          }
        });
    },
    remindTask(id) {
      // console.log(id);
      network
        .post(`notice/remindTask/${id}`, {
          userId: this.creator,
        })
        .then((data) => {
          // console.log(data);
          const statsus = data.data;
          if (statsus.status === 200) {
            this.$toast.success({
              message: "催办成功",
            });
            clearTimeout(this.timer); //清除延迟执行
            this.timer = setTimeout(() => {
              //设置延迟执行
              this.$router.push(`/ViewTask?id=${this.$route.query.id}`);
            }, 1000);
          }
        });
    },
    ExportFiles(id) {
      // console.log(id);
      axios
        .get(`https://quanquan.asia/admin/api/export/download/${id}`, {
          responseType: "blob",
        })
        .then((res) => {
          let blob = new Blob([res.data]);
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = `数据导出.zip`;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        });
    },
  },
};
</script>


<style lang="less" scoped>
#modify {
  height: auto;
}
.form {
  width: 95%;
  margin: 20px auto;
  margin-bottom: 30px;
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
    .left {
      text-align: right;
      display: block;
      flex-basis: 25%;
    }
    .formdiv {
      flex: 1;
      background: white;
      padding: 10px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .worker {
      flex: 1;
      background: white;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .filesDiv {
    width: 90%;
    margin: 20px auto;
    overflow: hidden;
    display: flex;
    justify-items: center;
    .file-left {
      text-align: right;
      flex-basis: 25%;
    }
    .files {
      flex: 1;
      background: white;
      padding: 10px;
      .filesItem {
        margin-bottom: 10px;
        .title {
          font-size: 17px;
          padding-bottom: 5px;
          width: 100%;
          display: block;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: space-between;
          #repulse {
            width: 50px;
            height: 18px;
          }
        }
        .describe {
          word-wrap: break-word;
          word-break: break-all;
          .process {
            display: flex;
            align-items: center;
            .van-progress {
              flex: 1;
            }
          }
          .fff {
            display: flex;
            p {
              flex-basis: 20%;
            }
            .fileName {
              flex-basis: 75%;
              .link,
              .link:visited {
                display: block;
                color: #1989fa;
              }
            }
          }
        }
      }
    }
  }
  #export {
    width: 90%;
    height: 40px;
    margin: 10px auto;
    padding: 5px;
    color: white;
    background: #07c160;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>


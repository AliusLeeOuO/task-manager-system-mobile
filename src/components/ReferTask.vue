<template>
  <div id="xiugai">
    <van-nav-bar
      title="提交任务"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div  class="formBox">
      <div class="top">
        <div class="task" v-for="(item, index) in task" :key="index">
          <h2>任务名称：{{ item.taskname }}</h2>
          <h3>任务简介：{{ item.describe }}</h3>
          <h3>原来进度：{{ item.process }}</h3>
          <div class="filesDiv">
            <div class="file-left">已有附件：</div>
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
        </div>
        <div class="formBoxItem">
          <div class="left">进度简述：</div>
          <div class="right">
            <textarea v-model="textarea"></textarea>
          </div>
        </div>
        <div class="formBoxItem" v-show="Children">
          <div class="left">新的进度：</div>
          <div class="right">
            <van-slider v-model="processNew" @change="onChange" id="slider">
              <template #button>
                <div class="custom-button">{{ processNew }}%</div>
              </template>
            </van-slider>
          </div>
        </div>
        <div class="formBoxItem">
          <div class="files-left">添加附件：</div>
          <div class="right" id="primary">
            <van-uploader
              v-model="fileList"
              multiple
              accept=".doc,.docx,.xml,application/msword,image/*,video/*,audio/*,.zip,.rar,.arj,*.css,*.js,*.json,.txt,application/vnd.ms-excel"
              :after-read="afterRead"
              bind:delete="delete"
            >
              <van-button icon="plus" type="primary">添加文件</van-button>
            </van-uploader>
          </div>
        </div>
      </div>

      <div class="bottom">
        <van-button type="info" @click="ReferTask">提交</van-button>
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
      processNew: 0,
      timer: 0,
      textarea: "",
      fileList: [],
      files: [],
      Children: true,
      ShowFiles: true,
      creator: Cookies.get("id"),
    };
  },
  created() {
    if (this.PageId == 1) {
      network.get(`major/getTask/${this.id}`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.task = status.data;
          this.processNew = status.data[0].process;
          const children = status.data[0].children;
          if (children != undefined) {
            this.Children = false;
          }
          if (
            status.data[0].fileAddress == undefined ||
            status.data[0].fileAddress == 0
          ) {
            this.ShowFiles = false;
            // console.log(this.ShowFiles);
          }
        }
      });
    }
    if (this.PageId == 2) {
      network.get(`teacher/getTask/${this.id}`, {}).then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.task = status.data;
          this.processNew = status.data[0].process;
          const children = status.data[0].children;
          if (children != undefined) {
            this.Children = false;
          }
          if (
            status.data[0].fileAddress == undefined ||
            status.data[0].fileAddress == 0
          ) {
            this.ShowFiles = false;
            // console.log(this.ShowFiles);
          }
        }
      });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    afterRead(fileObj) {
      // console.log(fileObj);
      // 上传状态
      fileObj.status = "uploading";
      // 状态提示
      fileObj.message = "上传中...";
      // 声明form表单数据
      const formData = new FormData();
      // 添加文件信息
      formData.append("files", fileObj.file);
      // 上传接口调用
      network
        .post("upload", formData)
        .then((res) => {
          // 上传成功
          fileObj.status = "done";
          // 存储返回数据
          fileObj.addInfo = res.data;
          this.files.push(fileObj.addInfo.data[0]);
          //  console.log(fileObj.addInfo.data[0])
          // console.log(this.files);
        })
        .catch(() => {
          // 上传失败
          fileObj.status = "failed";
          // 失败状态提示
          fileObj.message = "上传失败";
        });
    },
    onChange(value) {
      this.processNew = value;
      // console.log(this.processNew);
    },
    ReferTask() {
      if (this.PageId == 1) {
        network
          .post(`major/referTask/${this.id}`, {
            process: this.processNew,
            describe: this.textarea,
            files: this.files,
            userId: this.creator,
          })
          .then((data) => {
            if (data.status === 200) {
              this.$toast.success({
                message: "提交成功",
              });
              clearTimeout(this.timer); //清除延迟执行
              this.timer = setTimeout(() => {
                //设置延迟执行
                this.$router.push("/HomePage");
              }, 2000);
            }
          });
      }
      if (this.PageId == 2) {
        network
          .post(`teacher/referTask/${this.id}`, {
            process: this.processNew,
            describe: this.textarea,
            files: this.files,
            userId: this.creator,
          })
          .then((data) => {
            if (data.status === 200) {
              this.$toast.success({
                message: "提交成功",
              });
              clearTimeout(this.timer); //清除延迟执行
              this.timer = setTimeout(() => {
                //设置延迟执行
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
.formBox {
  width: 94%;
  padding: 30px auto;
  margin: 20px auto;
  background: rgb(224, 222, 222);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-items: center;
  box-shadow: 5px -7px 5px rgb(95, 95, 95);
  .task {
    margin: 20px;
    h2,
    h3 {
      margin: 10px 0;
      word-wrap: break-word;
      word-break: break-all;
    }
    .filesDiv {
      display: flex;
      justify-items: center;
      .file-left {
        flex-basis: 25%;
      }
      .files {
        flex: 1;
        .fileName {
          flex-basis: 75%;
          .link,
          .link:visited {
            display: block;
            margin: 5px 0;
            color: #1989fa;
          }
        }
      }
    }
  }
  .formBoxItem {
    margin: 20px auto;
    overflow: hidden;
    display: flex;
    width: 90%;
    .left {
      flex-basis: 25%;
      display: flex;
      align-items: center;
    }
    .files-left {
      flex-basis: 25%;
      display: flex;
    }
    .right {
      flex-basis: 68%;
      display: flex;
      align-items: center;
      #slider {
        width: 90%;
        margin-left: 10px;
        .custom-button {
          width: 26px;
          color: #fff;
          font-size: 10px;
          line-height: 18px;
          text-align: center;
          background-color: #1989fa;
          border-radius: 100px;
        }
      }
      textarea {
        background: rgb(255, 255, 255);
        width: 95%;
        padding: 10px;
        height: 50px;
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
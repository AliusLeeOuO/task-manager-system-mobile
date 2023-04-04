<template>
  <div id="Calendar">
    <div class="top">消息</div>

    <van-tabs v-model="activeName">
      <van-tab title="收到通知" name="a" class="activeName">
        <van-notice-bar mode="closeable" v-show="msg"
          >今天没有通知内容！！！</van-notice-bar
        >
        <div v-show="!msg">
          <div
            v-for="(item, index) in NoticeItem"
            :key="index"
            class="NoticeItem"
          >
            <div class="NoticeLeft">
              <van-icon name="chat-o" size="2.5rem" />
            </div>
            <div class="NoticeRight">
              <div class="NoticeItem-top">
                <h3>{{ item.userId.name }}</h3>
                <p>{{ item.createdAt | fliterTime }}</p>
              </div>
              <div class="content">
                <div class="content-p">{{ item.tips | delHtmlTag }}</div>
                <van-tag type="success">已读</van-tag>
              </div>
            </div>
          </div>
          <div class="more" v-show="!loading">
            <div v-if="moreShowBoolen" @click="moreShow" class="moreShow">
              点击查询更多
            </div>
            <div v-else style="color: black">已无更多</div>
          </div>
          <van-loading size="24px" vertical color="#0094ff" v-show="loading"
            >加载中...</van-loading
          >
        </div>
      </van-tab>
      <van-tab title="发送消息" name="b" class="activeName">
        <div class="Message">
          <div class="MessageUser">
            <h2>
              发送对象：<span v-for="(item, index) in username" :key="index"
                >{{ item }}、</span
              >
            </h2>
            <div class="checkbox">
              <van-collapse v-model="activeName1" accordion>
                <van-collapse-item title="专业带头人" name="major">
                  <van-checkbox-group
                    v-model="result"
                    v-for="(item, index) in majorList"
                    :key="index"
                    id="checkboxItem"
                    ref="checkboxGroup"
                  >
                    <van-checkbox
                      :name="item._id"
                      shape="square"
                      @click="Checkbox(item._id, item.name)"
                      >{{ item.name }}</van-checkbox
                    >
                  </van-checkbox-group>
                </van-collapse-item>
                <van-collapse-item title="普通老师" name="teacher">
                  <van-checkbox-group
                    v-model="result"
                    v-for="(item, index) in teacherList"
                    :key="index"
                    class="checkboxItem"
                    ref="checkboxGroup"
                  >
                    <van-checkbox
                      :name="item._id"
                      shape="square"
                      @click="Checkbox(item._id, item.name)"
                      >{{ item.name }}</van-checkbox
                    >
                  </van-checkbox-group>
                </van-collapse-item>
              </van-collapse>
            </div>
          </div>
          <div class="MessageText">
            <h2>请输入需要发送内容：</h2>
            <div>
              <textarea
                v-model="MessageText"
                name="MessageText"
                id="Text"
                rows="7"
              ></textarea>
            </div>
          </div>

          <van-button
            type="primary"
            native-type=""
            id="submit"
            block
            @click="Massage()"
            >发送消息</van-button
          >
        </div>
      </van-tab>
    </van-tabs>

    <van-tabbar route placeholder>
      <van-tabbar-item replace to="/HomePage" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/Statistics" icon="bar-chart-o" dot
        >统计</van-tabbar-item
      >
      <van-tabbar-item replace to="/Calendar" icon="envelop-o"
        >消息</van-tabbar-item
      >
      <van-tabbar-item replace to="/Me" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
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
      activeName: "a",
      activeName1: "",
      majorList: [],
      teacherList: [],
      result: [],
      NoticeItem: [],
      isRead: "",
      worker: [],
      username: [],
      MessageText: "",
      timer: 0,
      msg: false,
      pagenum: 0,
      pagesize: 10,
      loading: false,
      moreShowBoolen: true,
    };
  },
  created() {
    network
      .get(`notice/pageNoticeList/${this.id}`, {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      })
      .then((data) => {
        const status = data.data;
        if (status.status === 200) {
          this.NoticeItem = status.data.notices;
          if (status.data.notices.length > 9) {
            this.moreShowBoolen = true;
          } else {
            this.moreShowBoolen = false;
          }
        }
        if (status.status === 201) {
          this.msg = true;
        }
      });
    network.post("dean/position", {}).then((data) => {
      if (data.data.status === 200) {
        this.majorList = data.data.data;
      }
    });
    network.post("major/position", {}).then((data) => {
      if (data.data.status === 200) {
        this.teacherList = data.data.data;
        // console.log(this.teacherList);
      }
    });
  },
  methods: {
    change(id, name) {
      this.$router.push({
        path: "Message",
        name: "Message",
        query: {
          id: id,
          name: name,
        },
      });
    },
    Checkbox(id, name) {
      const status = this.worker.indexOf(id);
      const username = name;
      if (status == -1) {
        this.worker.push(id);
        this.username.push(username);
        // console.log(this.username);
        // console.log(this.worker);
      }
      if (status > -1) {
        this.worker.splice(status, 1);
        this.username.splice(username, 1);
        // console.log(this.username);
        // console.log(this.worker);
      }
    },
    Massage() {
      if (this.worker == "") {
        this.$toast({
          message: "请选择发送的对象",
        });
      } else if (this.MessageText == "") {
        this.$toast({
          message: "请输入发送的内容",
        });
      } else {
        network
          .post(`notice/chat/${this.id}`, {
            tips: this.MessageText,
            notifier: this.worker,
          })
          .then((data) => {
            const status = data.status;
            // console.log(status);
            if (status === 200) {
              this.$toast.success({
                message: "发送成功",
              });
              this.MessageText = "";
              this.worker = [];
              this.username = [];
            }
          });
      }
    },
    moreShow() {
      this.loading = true;
      this.pagenum = this.pagenum + 1;
      this.pagesize = this.pagesize + 8;
      clearTimeout(this.timer); //清除延迟执行
      this.timer = setTimeout(() => {
        network
          .get(`notice/pageNoticeList/${this.id}`, {
            params: {
              pagenum: this.pagenum,
              pagesize: this.pagesize,
            },
          })
          .then((data) => {
            const status = data.data;
            if (status.status === 200) {
              this.NoticeItem = status.data.notices;
              if (status.data.notices.length > 7) {
                this.moreShowBoolen = true;
              } else {
                this.moreShowBoolen = false;
              }
            }
            console.log(moreShowBoolen);
            this.loading = false;
          });
      }, 2000);
    },
  },
  filters:{
    delHtmlTag(str) {
  return str.replace(/<[^>]+>/g, "");
}
  }
};
</script>


<style lang="less" scoped>
#Calendar {
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
}
.top {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: rgb(0, 0, 0);
  text-align: center;
  background: white;
  border-bottom: 1px solid rgb(226, 226, 226);
  position: relative;
  z-index: 1111;
}
.activeName {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background: rgba(238, 236, 236, 0.527);
  .NoticeItem {
    background: white;
    height: 100%;
    border-top: 1px solid rgb(228, 228, 228);
    display: flex;
    padding: 5px 4%;
    justify-content: space-between;
    align-items: center;
    .NoticeLeft {
      padding-right: 13px;
    }
    .NoticeRight {
      flex: 1;
      .NoticeItem-top,
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 5px;
        .content-p {
          flex-basis: 80%;

          h3 {
            display: inline-block;
            color: coral;
          }
        }
      }
    }
  }
  .more {
    text-align: center;
    color: #1989fa;
    font-size: 16px;
    padding: 15px 0;
  }
  .Message {
    width: 100%;
    height: 100%;
    padding: 5px 4%;
    background: rgb(241, 241, 241);
    h2 {
      border: 1px 0 solid #ccc;
      margin: 5px 0;
      padding: 5px 0;
    }
    .MessageText {
      #Text {
        display: block;
        width: 100%;
        padding: 10px 15px;
      }
    }
    #submit {
      margin: 20px 0;
    }
  }
}
</style>
<template>
  <div id="HomePage">
    <div class="top">首页</div>
    <van-search
      v-model="IndexSearch"
      placeholder="查找项目"
      background="rgb(228, 228, 228)"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="Page0" v-show="PageId == 0">
      <Dean></Dean>
    </div>
    <div class="Page0" v-show="PageId == 1">
      <Major></Major>
    </div>
    <div class="Page0" v-show="PageId == 2">
      <Teacher></Teacher>
    </div>
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
import Dean from "../components/HomePage/Dean";
import Major from "../components/HomePage/Major";
import Teacher from "../components/HomePage/Teacher";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      PageId: Cookies.get("parentId"),
      IndexSearch: "",
      active: "HomePage",
    };
  },
  mounted() {},
  methods: {
    onSearch(val) {
      this.IndexSearch = val;
      this.$router.push({
        path: "Search",
        name: "Search",
        query: {
          SearchName: this.IndexSearch,
        },
      });
      // console.log(this.IndexSearch);
    },
    onCancel() {
      this.$toast("取消");
    },
  },
  components: {
    Dean,
    Major,
    Teacher,
  },
};
</script>


<style lang="less" scoped>
#HomePage {
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background: rgba(228, 228, 228, 0.733);;
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
}
</style>
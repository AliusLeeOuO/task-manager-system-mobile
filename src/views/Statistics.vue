<template>
  <div id="Statistics">
    <div class="top">统计</div>
    <div id="main" style="width: 100%; height: 550px"></div>
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
import echarts from "echarts";
import network from "@/network/index.js";
export default {
  data() {
    return {
      data: [], //所有分类信息
      name: [], //分类名称
      percentage: [],
    };
  },
  mounted() {
    network.get("dean/statistical").then((req) => {
      this.data = req.data.data;
      // console.log(this.data);
      let series = [];
      let Datalenthd = [];
      req.data.data.map((item) => {
        let process = [];
        let date = [];
        let year = 0
        let month = 0
        item.journal.map((val) => {
          process.push(val.process);
          year = val.month.slice(0, 4);
          month = val.month.slice(5);
          date.push(`${year}年${month}月`);
        });
        Datalenthd.push(date);
        series.push({
          name: item.taskname,
          type: "line",
          label: {
            show: true,
            formatter: "{c}%",
          },
          data: process,
        });
      });
      myChart.setOption({
        series: series,
        xAxis: {
          data: Datalenthd[0],
        },
      });
    });

    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    myChart.setOption({
      title: {
        text: "各类任务每月进度",
        textStyle: {
          fontSize: 20,
          width: 500,
        },
      },
      legend: {
        show: true,
        top: "6%",
      },
      tooltip: {
        trigger: "axis",
        label: {
          show: true,
        },
      },

      grid: {
        top: "22%",
        left: "3%",
        right: "5%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          formatter: "{c}%",
        },
        axisLabel: {
          interval: 0, //横轴信息全部显示
          rotate: -80, //-30度角倾斜显示
        },
      },
      yAxis: {
        type: "value",
        name: "任务进度",
        left: "3%",
        max: 100,
        // min: 1,
        nameTextStyle: {
          color: "rgba(255, 0, 0, 1)",
          fontStyle: "italic",
        },
        axisLabel: {
          formatter: "{value}%",
        },
      },
      series: [],
    });
  },
};
</script>

<style lang="less" scoped>
#Statistics {
  padding-bottom: 15px;
  width: 100%;
  height: 100%;
  background: rgba(228, 228, 228, 0.527);
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

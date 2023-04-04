import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入清除样式
import "@/assets/css/ClearStyle.css"
// 按需引入vant包
import "@/assets/js/vant.js"
// 引入moment
import moment from "moment";
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
require('echarts/lib/component/title');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/grid');
require('echarts/lib/component/legend');
require('echarts/lib/chart/line');
Vue.prototype.$echarts = echarts


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



//vue 过滤器做字数限制并显示省略号{{value | ellipsis(15)}}
Vue.filter('TextFilter', (value, num) => {
  const nums = num || '8';// 设置限定字数8,  
  if (!value) return '';
  if (value.length > nums) {
    return value.slice(0, nums) + '...';
  }
  return value;
});
// 根据status判断任务状态
Vue.filter('TaskStatus',(taskStatus) => {
      if (taskStatus === 0) {
        return "进行中";
      }
      if (taskStatus === 1) {
        return "审核中";
      }
      if (taskStatus === 2) {
        return "被打回";
      }
      if (taskStatus === 3) {
        return "已完成";
      }
})
// 样式过滤
Vue.filter('StyleType',(aa) => {
  if (aa === 0) {
    return "primary";
  }
  if (aa === 1) {
    return "warning";
  }
  if (aa === 2) {
    return "danger";
  }
  if (aa === 3) {
    return "info";
  }
})
// 时间格式
Vue.filter('fliterTime', function (i) {
  if(i == '' || i == null){
    return "无截止时间"
  }else{
    return moment(i).format("YYYY年MM月DD日");
  }

})



import moment from "moment";
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
      return "忘记设置了就"
    }else{
      return moment(i).format("YYYY年MM月DD日");
    }
  
  })
  
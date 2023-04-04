import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/index",
  },
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: {
      title: "登录",
    },
  },
  // 首页
  {
    path: "/HomePage",
    name: "HomePage",
    component: () => import("../views/HomePage.vue"),
    meta: {
      title: "首页",
    },
  },
  // 统计
  {
    path: "/Statistics",
    name: "Statistics",
    component: () => import("../views/Statistics.vue"),
    meta: {
      title: "统计",
    },
  },
  // 信息
  {
    path: "/Calendar",
    name: "Calendar",
    component: () => import("../views/Calendar.vue"),
    meta: {
      title: "信息",
    },
  },
  // 我的
  {
    path: "/Me",
    name: "Me",
    component: () => import("../views/Me.vue"),
    meta: {
      title: "我的",
    },
  },
  // 查找任务
  {
    path: "/Search",
    name: "Search",
    component: () => import("../views/Search.vue"),
    meta: {
      title: "查找任务",
    },
  },
  // 子任务
  {
    path: "/SunTask",
    name: "SunTask",
    component: () => import("../components/SunTask/Second.vue"),
    meta: {
      title: "子任务",
    },
  },
  {
    path: "/Third",
    name: "Third",
    component: () => import("../components/SunTask/Third.vue"),
    meta: {
      title: "子任务",
    },
  },
  {
    path: "/Fourth",
    name: "Fourth",
    component: () => import("../components/SunTask/Fourth.vue"),
    meta: {
      title: "子任务",
    },
  },
  {
    path: "/Fifth",
    name: "Fifth",
    component: () => import("../components/SunTask/Fifth.vue"),
    meta: {
      title: "子任务",
    },
  },
  
  // 新建任务
  {
    path: "/TaskCreate",
    name: "TaskCreate",
    component: () => import("../views/TaskCreate.vue"),
    meta: {
      title: "新建任务",
    },
  },
  // 任务列表
  {
    path: "/TaskList",
    name: "TaskList",
    component: () => import("../views/TaskList.vue"),
    meta: {
      title: "任务列表",
    },
  },
  // 修改任务
  {
    path: "/UpDataTask",
    name: "UpDataTask",
    component: () => import("../components/UpDataTask.vue"),
    meta: {
      title: "修改任务",
    },
  },
  // 查看任务
  {
    path: "/ViewTask",
    name: "ViewTask",
    component: () => import("../components/ViewTask.vue"),
    meta: {
      title: "查看任务",
    },
  },
  // 提交任务
  {
    path: "/ReferTask",
    name: "ReferTask",
    component: () => import("../components/ReferTask.vue"),
    meta: {
      title: "提交任务",
    },
  },
  // 个人资料
  {
    path: "/PassWord",
    name: "PassWord",
    component: () => import("../components/PassWord.vue"),
    meta: {
      title: "修改密码",
    },
  },
  {
    path: "/Personal",
    name: "Personal",
    component: () => import("../components/Personal.vue"),
    meta: {
      title: "个人资料",
    },
  },
  // 帮助中心
  {
    path: "/HelpCenter",
    name: "HelpCenter",
    component: () => import("../components/HelpCenter.vue"),
    meta: {
      title: "帮助中心",
    },
  },

];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(function (to, form, next) {
  document.title = `${to.meta.title} | 双高任务管理系统`;
  const roleOne = Cookies.get("token");
  if (!roleOne && to.path !== "/login") {
    next("/login");
  } else {
    if (to.path === "/index") {
      next("/HomePage")
    } else {
      next();
    }
  }
});

// 解决 Vue 重复点击相同路由，出现 Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation 问题
// push 方法
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// replace 方法
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
  return RouterReplace.call(this, to).catch(err => err)
}



export default router;
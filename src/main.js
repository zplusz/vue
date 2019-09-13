// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// npm 第三方套件內容
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap'; //載入bootstrap套件
import Loading from 'vue-loading-overlay'; //全螢幕讀取動畫
import 'vue-loading-overlay/dist/vue-loading.css'; //全螢幕讀取動畫的CSS
import VeeValidate from 'vee-validate'; //驗證功能
import zhTW from 'vee-validate/dist/locale/zh_TW'; //驗證功能中文化
import VueI18n from 'vue-i18n';


//自定義 套件內容
import router from './router';
import App from './App';
import './bus';
import currencuFilter from './filters/currency';
import dateFilter from './filters/date';

//全域方式啟用
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading',Loading); //全螢幕讀取動畫
Vue.filter('currency',currencuFilter ); //千分號
Vue.filter('date', dateFilter); //日期轉換
Vue.use(VueI18n);


axios.defaults.withCredentials = true; //跨域請求攜帶Cookie

//VeeValidate中文語系
const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});


/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
});


router.beforeEach((to, from, next) => {
  //頁面登入驗證
  if(to.meta.requiresAuth){
    //如果要to的頁面有meta.requiresAuth的變數為ture的話就執行
    const api =`${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
    console.log(response.data);
    if(response.data.success){
      next();  //如果成功的話 將頁面從from(Login頁面)轉移到next(products，Login頁面轉移的設定)
    }else{
      next({
        path:'/login',  //如果驗證不成功的話 停留在Login頁面
      })
    }
    });
  }else{
    next();  //如果不需要查看meta.requiresAuth的變數就直接放行轉移頁面
  }




})

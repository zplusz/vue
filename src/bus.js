import Vue from 'vue';

Vue.prototype.$bus = new Vue();  //將套件掛載在原型下 可以直接呼叫

// Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式
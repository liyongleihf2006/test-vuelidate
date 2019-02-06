import Vue from 'vue';
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuelidate from 'vuelidate';
import store from "./store/index";
import App from './App.vue';
const router = new VueRouter({
  routes: [
    { 
      path: '/', 
      component: () => import('./components/user/UserList.vue'),
      meta:{"userList":true}
    },
    { path: '/user-edit/:id',
      component: () => import('./components/user/UserEdit.vue'),
      props: true,
      meta: { "userEdit": true }
    }
  ]
})
Vue.use(VueRouter);
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
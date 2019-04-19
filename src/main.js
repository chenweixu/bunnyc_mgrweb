import Vue from 'vue';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import left_page from './components/left_page.vue'
import App from './app.vue';
import VueRouter from 'vue-router'

import blank from './components/blank.vue'

import hostcmd from './components/host/remotecmd.vue'
import hostshow from './components/host/show.vue'

import networkping from './components/network/ping.vue'
import networkurltest from './components/network/urltest.vue'
import networkportcheck from './components/network/portcheck.vue'

import weblogic from './components/service/weblogic.vue'
import nginx from './components/service/nginx.vue'
import memcached from './components/service/memcached.vue'

import confhost from './components/conf/host.vue'

import other from './components/other.vue'

// Vue.use(ElementUI, { size: 'medium', zIndex: 2000 });
Vue.use(VueRouter)
Vue.use(ElementUI);


const routes = [
  { path: '/', component: blank },
  { path: '/index', component: blank },
  { path: '/hostcmd', component: hostcmd },
  { path: '/networkping', component: networkping },
  { path: '/urltest', component: networkurltest },
  { path: '/portcheck', component: networkportcheck },
  { path: '/hostshow', component: hostshow },
  { path: '/weblogic', component: weblogic },
  { path: '/nginx', component: nginx },
  { path: '/memcached', component: memcached },
  { path: '/other', component: other },
  { path: '/confhost', component: confhost },
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

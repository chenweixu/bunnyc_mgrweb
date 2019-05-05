import Vue from 'vue';


// import ElementUI from 'element-ui';

import { Container, Main, Aside, Tabs, TabPane, Menu, MenuItem, Row, Col } from 'element-ui';
import { Button, Submenu, Input } from 'element-ui';
import { Select, Option, OptionGroup } from 'element-ui';
import { Form, FormItem, Table, TableColumn, Dialog, Upload} from 'element-ui';
import { Message, Notification, MessageBox } from 'element-ui';



import 'element-ui/lib/theme-chalk/index.css';
// import '../static/css/theme-green/index.css';       // 浅绿色主题

// import left_page from './components/left_page.vue'
import App from './app.vue';
import VueRouter from 'vue-router'

import blank from './components/blank.vue'

// import hostcmd from './components/host/remotecmd.vue'
// import hostshow from './components/host/show.vue'

// import networktest from './components/network/networktest.vue'

// import weblogic from './components/service/weblogic.vue'
// import nginx from './components/service/nginx.vue'
// import memcached from './components/service/memcached.vue'

// import confhost from './components/conf/host.vue'

// import other from './components/other.vue'

const hostcmd = () => import('./components/host/remotecmd.vue')
const hostshow = () => import('./components/host/show.vue')

const networktest = () => import('./components/network/networktest.vue')

const weblogic = () => import('./components/service/weblogic.vue')
const nginx = () => import('./components/service/nginx.vue')
const memcached = () => import('./components/service/memcached.vue')

const confhost = () => import('./components/conf/host.vue')
const other = () => import('./components/other/other.vue')
const file = () => import('./components/host/file.vue')



// import testui from './components/test/test-ui.vue'
// import testapi from './components/test/test-api.vue'

// Vue.use(ElementUI, { size: 'medium', zIndex: 2000 });
Vue.use(VueRouter)

// Vue.use(ElementUI);

Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Container);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Upload);
// 为 Vue.component(Button.name, Button); 的简写
// Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


const routes = [
  { path: '/', component: blank },
  { path: '/index', component: blank },
  { path: '/hostcmd', component: hostcmd },
  { path: '/networktest', component: networktest },
  { path: '/hostshow', component: hostshow },
  { path: '/weblogic', component: weblogic },
  { path: '/nginx', component: nginx },
  { path: '/memcached', component: memcached },
  { path: '/other', component: other },
  { path: '/confhost', component: confhost },
  { path: '/file', component: file },
  { path: '*', redirect: '/' },
  // { path: '/testui', component: testui },
  // { path: '/testapi', component: testapi },
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})

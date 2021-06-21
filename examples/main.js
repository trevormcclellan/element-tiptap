import Vue from 'vue';
import {
  // layout
  Container,
  Header,
  Main,
  Footer,
  Button,
} from 'element-ui';
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { ElementTiptapPlugin } from 'element-tiptap';
import App from './App.vue';
import router from './router';

Vue.use(BootstrapVue)

Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Button);

Vue.use(ElementTiptapPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

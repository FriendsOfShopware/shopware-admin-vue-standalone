// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import SW from 'administration';
import 'administration/dist/assets/sw-6.4.2.1/css/app.css';
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.use(SW);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})

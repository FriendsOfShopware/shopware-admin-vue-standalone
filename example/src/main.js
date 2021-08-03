// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Shopware from 'administration';
import 'administration/dist/main.css';
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages: {
  }
});

Vue.use(Shopware, {
  translate: {
    t: () => {return 'test'},
    tc: () => {return 'test'},
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

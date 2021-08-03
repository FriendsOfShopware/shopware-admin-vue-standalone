// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Shopware from 'administration';
import 'administration/dist/main.css';
import de from 'administration/dist/snippet/de-DE.json';
import en from 'administration/dist/snippet/en-GB.json';
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    de,
    en
  }
});

Vue.use(Shopware, {
  translate: {
    t: (key, values) => i18n.t(key, values),
    tc: (key, choice, values) => i18n.tc(key, choice, values),
    te: (key, locale) => i18n.te(key, locale),
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

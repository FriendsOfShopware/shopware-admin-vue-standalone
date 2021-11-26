import Main from './load';
import Shopware from 'src/core/shopware';

const VueShopwareAdminStandalone = {
  install(Vue, options) {
    const main = new Main()
    const components = main.initComponents(options);

    for (const [componentName, component] of Object.entries(components)) {
      component.prototype.$t = options?.translate?.t || (() => '');
      component.prototype.$tc = options?.translate?.tc || (() => '');
      component.prototype.$te = options?.translate?.te || (() => false);

      Vue.component(componentName, component);
    }
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueShopwareAdminStandalone);
}

export { Shopware };
export default VueShopwareAdminStandalone;

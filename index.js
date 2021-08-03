import Main from './src';

export default {
  install(Vue, options) {
    const main = new Main()
    const components = main.initComponents();

    for (const [componentName, component] of Object.entries(components)) {
      component.prototype.$t = options?.translate?.t || (() => {});
      component.prototype.$tc = options?.translate?.tc || (() => {});
      component.prototype.$te = options?.translate?.te || (() => {});

      Vue.component(componentName, component);
    }
  }
};

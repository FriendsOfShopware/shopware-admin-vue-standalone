import Main from './src';

export default {
  install(Vue, options) {
    const main = new Main()
    const components = main.initComponents();

    for (const [componentName, component] of Object.entries(components)) {
      component.prototype.$t = options?.translate?.t || (() => {});
      component.prototype.$tc = options?.translate?.tc || (() => {});

      Vue.component(componentName, component);
    }
  }
};

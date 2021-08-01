import Main from './src';

export default {
  install(Vue) {
    const main = new Main()
    const components = main.initComponents();

    for (const [componentName, component] of Object.entries(components)) {
      console.log(componentName, component);
      Vue.component(componentName, component);
    }
  }
};

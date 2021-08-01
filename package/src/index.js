import Shopware from './core/shopware';

const { Component } = Shopware;

class Main {

  constructor() {
    this.vueComponents = {};
    this.componentFactory = Component;
  }

  /**
   * Initializes all core components as Vue components.
   *
   * @returns {Object}
   */
  initComponents() {
    const componentRegistry = this.componentFactory.getComponentRegistry();
    this.componentFactory.resolveComponentTemplates();

    componentRegistry.forEach((component) => {
      this.createComponent(component.name);
    });

    return this.vueComponents;
  }

  /**
   * Returns the component as a Vue component.
   * Includes the full rendered template with all overrides.
   *
   * @param componentName
   *
   * @returns {Function}
   */
  createComponent(componentName) {
    const componentConfig = Component.build(componentName);

    if (!componentConfig) {
      return false;
    }

    //this.resolveMixins(componentConfig);

    const vueComponent = Vue.component(componentName, componentConfig);
    this.vueComponents[componentName] = vueComponent;

    return vueComponent;
  }

  getComponents() {
    return this.vueComponents;
  }
}

export default Main;

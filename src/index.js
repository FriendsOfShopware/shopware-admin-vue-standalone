import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Shopware from './core/shopware';
import ComponentFactory from './core/factory/component.factory';
import initializers from 'src/app/init';

Vue.use(VueI18n);

const { Component, Mixin } = Shopware;

import '~scss/global';

initializers.coreMixin();
initializers.baseComponents();
initializers.svgIcons();

class Main {

  constructor() {
    this.vueComponents = {};
    this.componentFactory = ComponentFactory;
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

    this.resolveMixins(componentConfig);

    const vueComponent = Vue.component(componentName, componentConfig);
    this.vueComponents[componentName] = vueComponent;

    return vueComponent;
  }

  getComponents() {
    return this.vueComponents;
  }

  /**
   * Recursively resolves mixins referenced by name
   *
   * @private
   * @memberOf module:app/adapter/view/vue
   */
  resolveMixins(componentConfig) {
    // If the mixin is a string, use our mixin registry
    if (componentConfig.mixins?.length) {
      componentConfig.mixins = componentConfig.mixins.map((mixin) => {
        if (typeof mixin === 'string') {
          return Mixin.getByName(mixin);
        }

        return mixin;
      });
    }

    if (componentConfig.extends) {
      this.resolveMixins(componentConfig.extends);
    }
  }
}

export default Main;

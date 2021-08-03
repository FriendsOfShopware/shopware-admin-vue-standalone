import Vue from 'vue';
import Shopware from 'src/core/shopware';
import ComponentFactory from 'src/core/factory/component.factory';
import DirectiveFactory from 'src/core/factory/directive.factory';
import initializers from 'src/app/init';
import VuePlugins from 'src/app/plugin';

const { Component, Mixin } = Shopware;

import '~scss/global';

initializers.coreMixin();
initializers.coreDirectives();
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
    this.initPlugins();
    this.initDirectives();

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

  /**
   * Initialises all plugins for VueJS
   *
   * @private
   * @memberOf module:app/adapter/view/vue
   */
  initPlugins() {
    // Add the community plugins to the plugin list
    VuePlugins.forEach((plugin) => {
      Vue.use(plugin);
    });

    return true;
  }

  /**
   * Initializes all custom directives.
   *
   * @private
   * @memberOf module:app/adapter/view/vue
   * @returns {Boolean}
   */
  initDirectives() {
    const registry = DirectiveFactory.getDirectiveRegistry();

    registry.forEach((directive, name) => {
      Vue.directive(name, directive);
    });

    return true;
  }
}

export default Main;

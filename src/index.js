import Vue from 'vue';
import Shopware from './core/shopware';
import ComponentFactory from './core/factory/component.factory';

const { Component, Mixin } = Shopware;


import './app/mixin/form-field.mixin'
import './app/mixin/index'
import './app/mixin/listing.mixin'
import './app/mixin/notification.mixin'
import './app/mixin/placeholder.mixin'
import './app/mixin/remove-api-error.mixin'
import './app/mixin/rule-container.mixin'
import './app/mixin/salutation.mixin'
import './app/mixin/sw-inline-snippet.mixin'
import './app/mixin/validation.mixin'


import './test/sw-pagination';
import './test/form/field-base/sw-base-field';
import './test/form/field-base/sw-block-field';
import './test/form/field-base/sw-contextual-field';
import './test/form/field-base/sw-field-error';
import './test/form/select/base/sw-multi-select';
import './test/form/select/base/sw-multi-tag-ip-select';
import './test/form/select/base/sw-multi-tag-select';
import './test/form/select/base/sw-select-base';
import './test/form/select/base/sw-select-result';
import './test/form/select/base/sw-select-result-list';
import './test/form/select/base/sw-select-selection-list';
import './test/form/select/base/sw-single-select';
import './test/form/sw-boolean-radio-group';
import './test/form/sw-checkbox-field';
import './test/form/sw-code-editor';
import './test/form/sw-colorpicker';
import './test/form/sw-compact-colorpicker';
import './test/form/sw-confirm-field';
import './test/form/sw-datepicker';
import './test/form/sw-email-field';
import './test/form/sw-field';
import './test/form/sw-field-copyable';
import './test/form/sw-file-input';
import './test/form/sw-gtc-checkbox';
import './test/form/sw-list-price-field';
import './test/form/sw-maintain-currencies-modal';
import './test/form/sw-number-field';
import './test/form/sw-password-field';
import './test/form/sw-price-field';
import './test/form/sw-purchase-price-field';
import './test/form/sw-radio-field';
import './test/form/sw-select-field';
import './test/form/sw-select-number-field';
import './test/form/sw-select-option';
import './test/form/sw-switch-field';
import './test/form/sw-tagged-field';
import './test/form/sw-text-editor/sw-text-editor-table-toolbar';
import './test/form/sw-text-editor/sw-text-editor-toolbar';
import './test/form/sw-text-editor/sw-text-editor-toolbar-button';
import './test/form/sw-text-editor/sw-text-editor-toolbar-table-button';
import './test/form/sw-text-editor';
import './test/form/sw-text-field';
import './test/form/sw-textarea-field';
import './test/form/sw-url-field';

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

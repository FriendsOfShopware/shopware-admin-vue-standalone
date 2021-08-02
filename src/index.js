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

import './test/base/sw-address';
import './test/base/sw-alert';
import './test/base/sw-button';
import './test/base/sw-button-group';
import './test/base/sw-button-process';
import './test/base/sw-card';
import './test/base/sw-card-filter';
import './test/base/sw-card-section';
import './test/base/sw-circle-icon';
import './test/base/sw-collapse';
import './test/base/sw-container';
import './test/base/sw-description-list';
import './test/base/sw-empty-state';
import './test/base/sw-help-text';
import './test/base/sw-highlight-text';
import './test/base/sw-icon';
import './test/base/sw-inheritance-switch';
import './test/base/sw-label';
import './test/base/sw-modal';
import './test/base/sw-price-preview';
import './test/base/sw-product-image';
import './test/base/sw-product-variant-info';
import './test/base/sw-radio-panel';
import './test/base/sw-rating-stars';
import './test/base/sw-simple-search-field';
import './test/base/sw-tabs';
import './test/base/sw-tabs-item';
import './test/base/sw-user-card';

import './test/data-grid/sw-data-grid';
import './test/data-grid/sw-data-grid-column-boolean';
import './test/data-grid/sw-data-grid-inline-edit';
import './test/data-grid/sw-data-grid-settings';
import './test/data-grid/sw-data-grid-skeleton';

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

import './test/grid/sw-grid';
import './test/grid/sw-grid-column';
import './test/grid/sw-grid-row';
import './test/grid/sw-pagination';

import './test/modal/sw-confirm-modal';

import './test/sidebar/sw-sidebar';
import './test/sidebar/sw-sidebar-collapse';
import './test/sidebar/sw-sidebar-item';
import './test/sidebar/sw-sidebar-navigation-item';

import './test/utils/sw-color-badge';
import './test/utils/sw-external-link';
import './test/utils/sw-inherit-wrapper';
import './test/utils/sw-internal-link';
import './test/utils/sw-loader';
import './test/utils/sw-overlay';
import './test/utils/sw-popover';
import './test/utils/sw-progress-bar';
import './test/utils/sw-step-display';
import './test/utils/sw-step-item';
import './test/utils/sw-text-preview';
import './test/utils/sw-vnode-renderer';

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

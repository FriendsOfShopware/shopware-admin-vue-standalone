import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Shopware from './core/shopware';
import ComponentFactory from './core/factory/component.factory';

Vue.use(VueI18n);

const { Component, Mixin } = Shopware;

import '~scss/global';

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

import './app/component/base/sw-address';
import './app/component/base/sw-alert';
import './app/component/base/sw-button';
import './app/component/base/sw-button-group';
import './app/component/base/sw-button-process';
import './app/component/base/sw-card';
import './app/component/base/sw-card-filter';
import './app/component/base/sw-card-section';
import './app/component/base/sw-circle-icon';
import './app/component/base/sw-collapse';
import './app/component/base/sw-container';
import './app/component/base/sw-description-list';
import './app/component/base/sw-empty-state';
import './app/component/base/sw-help-text';
import './app/component/base/sw-highlight-text';
import './app/component/base/sw-icon';
import './app/component/base/sw-inheritance-switch';
import './app/component/base/sw-label';
import './app/component/base/sw-modal';
import './app/component/base/sw-price-preview';
import './app/component/base/sw-product-image';
import './app/component/base/sw-product-variant-info';
import './app/component/base/sw-radio-panel';
import './app/component/base/sw-rating-stars';
import './app/component/base/sw-simple-search-field';
import './app/component/base/sw-tabs';
import './app/component/base/sw-tabs-item';
import './app/component/base/sw-user-card';

import './app/component/data-grid/sw-data-grid';
import './app/component/data-grid/sw-data-grid-column-boolean';
import './app/component/data-grid/sw-data-grid-inline-edit';
import './app/component/data-grid/sw-data-grid-settings';
import './app/component/data-grid/sw-data-grid-skeleton';

import './app/component/form/field-base/sw-base-field';
import './app/component/form/field-base/sw-block-field';
import './app/component/form/field-base/sw-contextual-field';
import './app/component/form/field-base/sw-field-error';
import './app/component/form/select/base/sw-multi-select';
import './app/component/form/select/base/sw-multi-tag-ip-select';
import './app/component/form/select/base/sw-multi-tag-select';
import './app/component/form/select/base/sw-select-base';
import './app/component/form/select/base/sw-select-result';
import './app/component/form/select/base/sw-select-result-list';
import './app/component/form/select/base/sw-select-selection-list';
import './app/component/form/select/base/sw-single-select';
import './app/component/form/sw-boolean-radio-group';
import './app/component/form/sw-checkbox-field';
import './app/component/form/sw-code-editor';
import './app/component/form/sw-colorpicker';
import './app/component/form/sw-compact-colorpicker';
import './app/component/form/sw-confirm-field';
import './app/component/form/sw-email-field';
import './app/component/form/sw-field';
import './app/component/form/sw-field-copyable';
import './app/component/form/sw-file-input';
import './app/component/form/sw-gtc-checkbox';
import './app/component/form/sw-list-price-field';
import './app/component/form/sw-maintain-currencies-modal';
import './app/component/form/sw-number-field';
import './app/component/form/sw-password-field';
import './app/component/form/sw-price-field';
import './app/component/form/sw-purchase-price-field';
import './app/component/form/sw-radio-field';
import './app/component/form/sw-select-field';
import './app/component/form/sw-select-number-field';
import './app/component/form/sw-select-option';
import './app/component/form/sw-switch-field';
import './app/component/form/sw-tagged-field';
import './app/component/form/sw-text-editor/sw-text-editor-table-toolbar';
import './app/component/form/sw-text-editor/sw-text-editor-toolbar';
import './app/component/form/sw-text-editor/sw-text-editor-toolbar-button';
import './app/component/form/sw-text-editor/sw-text-editor-toolbar-table-button';
import './app/component/form/sw-text-editor';
import './app/component/form/sw-text-field';
import './app/component/form/sw-textarea-field';
import './app/component/form/sw-url-field';

import './app/component/grid/sw-grid';
import './app/component/grid/sw-grid-column';
import './app/component/grid/sw-grid-row';
import './app/component/grid/sw-pagination';

import './app/component/modal/sw-confirm-modal';

import './app/component/sidebar/sw-sidebar';
import './app/component/sidebar/sw-sidebar-collapse';
import './app/component/sidebar/sw-sidebar-item';
import './app/component/sidebar/sw-sidebar-navigation-item';

import './app/component/utils/sw-color-badge';
import './app/component/utils/sw-external-link';
import './app/component/utils/sw-inherit-wrapper';
import './app/component/utils/sw-internal-link';
import './app/component/utils/sw-loader';
import './app/component/utils/sw-overlay';
import './app/component/utils/sw-popover';
import './app/component/utils/sw-progress-bar';
import './app/component/utils/sw-step-display';
import './app/component/utils/sw-step-item';
import './app/component/utils/sw-text-preview';
import './app/component/utils/sw-vnode-renderer';

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

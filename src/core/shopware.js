const ClassesFactory = require('src/core/factory/classes-factory').default;
const MixinFactory = require('src/core/factory/mixin.factory').default;
const ComponentFactory = require('../core/factory/component.factory').default;
const TemplateFactory = require('../core/factory/template.factory').default;
const utils = require('../core/service/util.service').default;
const data = require('src/core/data/index').default;
const ShopwareError = require('src/core/data/ShopwareError').default;

const Shopware = function Shopware() {

    /**
     * @memberOf module:Shopware
     * @type {Object}
     */
    this.Component = {
        register: ComponentFactory.register,
        extend: ComponentFactory.extend,
        override: ComponentFactory.override,
        build: ComponentFactory.build,
        getTemplate: ComponentFactory.getComponentTemplate,
        getComponentRegistry: ComponentFactory.getComponentRegistry,
        getComponentHelper: ComponentFactory.getComponentHelper,
        registerComponentHelper: ComponentFactory.registerComponentHelper
    };

    /**
     * @memberOf module:Shopware
     * @type {Object}
     */
    this.Template = {
        register: TemplateFactory.registerComponentTemplate,
        extend: TemplateFactory.extendComponentTemplate,
        override: TemplateFactory.registerTemplateOverride,
        getRenderedTemplate: TemplateFactory.getRenderedTemplate,
        find: TemplateFactory.findCustomTemplate,
        findOverride: TemplateFactory.findCustomTemplate
    };

    /**
     * @memberOf module:Shopware
     * @type {module:core/service/utils}
     */
    this.Utils = utils;

    /**
     * @memberOf module:Shopware
     * @type {Object}
     */
    this.Mixin = {
        register: MixinFactory.register,
        getByName: MixinFactory.getByName
    };

    /**
     * @memberOf module:Shopware
     * @type {Object}
     */
    this.Data = data;

    /**
     * @memberOf module:Shopware
     * @type {Object}
     */
    this.Classes = ClassesFactory(
      {
          ShopwareError: ShopwareError
      },
      {
          _private: {}
      }
    );
};

const ShopwareInstance = new Shopware();

window.Shopware = ShopwareInstance;
exports.default = ShopwareInstance;
module.exports = exports.default;

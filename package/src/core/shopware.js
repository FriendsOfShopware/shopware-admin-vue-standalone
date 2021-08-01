const ComponentFactory = require('../core/factory/component.factory').default;
const TemplateFactory = require('../core/factory/template.factory').default;

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
     * @type {Object}
     */
    /*this.Mixin = {
        register: MixinFactory.register,
        getByName: MixinFactory.getByName
    };*/
};

const ShopwareInstance = new Shopware();

window.Shopware = ShopwareInstance;
exports.default = ShopwareInstance;
module.exports = exports.default;

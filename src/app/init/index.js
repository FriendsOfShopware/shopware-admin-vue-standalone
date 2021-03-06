/**
 * These types of initializers are called in the middle of the initialization process.
 * They are not allowed to depend on another initializers to suppress circular references.
 */
import initMixin from 'src/app/init/mixin.init';
import initComponents from 'src/app/init/component.init';
import initDirectives from 'src/app/init/directive.init';
import initSvgIcons from 'src/app/init/svg-icons.init';

export default {
    coreMixin: initMixin,
    coreDirectives: initDirectives,
    baseComponents: initComponents,
    svgIcons: initSvgIcons
};

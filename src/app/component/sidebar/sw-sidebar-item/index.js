import template from './sw-sidebar-item.html.twig';
import './sw-sidebar-item.scss';

const { Component } = Shopware;

/**
 * @public
 * @status ready
 * @example-type code-only
 * @component-example
 * <sw-sidebar-item title="Product" icon="default-symbol-products">
 *     Product in sidebar
 * </sw-sidebar-item>
 */
Component.register('sw-sidebar-item', {
    template,

    props: {
        title: {
            type: String,
            required: true
        },

        icon: {
            type: String,
            required: true
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false
        },

        position: {
            type: String,
            required: false,
            default: 'top',
            validator(value) {
                return ['top', 'bottom'].includes(value);
            }
        },

        // FIXME: add default value for property
        // eslint-disable-next-line vue/require-default-prop
        badge: {
            type: Number,
            required: false
        }
    },

    data() {
        return {
            isActive: false
        };
    },

    computed: {
        sidebarItemClasses() {
            return {
                'is--active': this.showContent,
                'is--disabled': this.disabled
            };
        },

        hasDefaultSlot() {
            return !!this.$slots.default;
        },

        showContent() {
            return this.hasDefaultSlot && this.isActive;
        }
    },

    watch: {
        disabled(newDisabledState) {
            if (newDisabledState) {
                this.closeContent();
            }
        }
    },

    // This is the quick fix to use this component as NPM package. Changed from "created" to "mounted".
    mounted() {
        this.mountedComponent();
    },

    methods: {
        mountedComponent() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.name === 'sw-sidebar') {
                    parent.registerSidebarItem(this);
                    return;
                }

                // This is the quick fix to use this component as NPM package.
                const sidebar = parent?.$refs['sw-sidebar'];
                if (sidebar && sidebar.$options._componentTag === 'sw-sidebar') {
                    sidebar.registerSidebarItem(this);
                    return;
                }

                parent = parent.$parent;
            }

            throw new Error('Component sw-sidebar-item must be registered as a (indirect) child of sw-sidebar');
        },

        openContent() {
            if (this.showContent) {
                return;
            }

            this.$emit('toggle-active', this);
        },

        closeContent() {
            if (this.isActive) {
                this.isActive = false;

                this.$emit('close-content');
            }
        },

        sidebarButtonClick(sidebarItem) {
            if (this === sidebarItem) {
                this.isActive = !this.isActive;
                this.$emit('click');
                return;
            }

            if (sidebarItem.hasDefaultSlot) {
                this.isActive = false;
            }
        }
    }
});

import template from './sw-existence-filter.html.twig';

const { Component } = Shopware;

/**
 * @private
 */
Component.register('sw-existence-filter', {
    template,

    props: {
        title: {
            type: String,
            required: true
        },

        value: {
            type: Boolean,
            required: true
        },

        placeholder: {
            type: String,
            default: null
        },

        active: {
            type: Boolean,
            required: true
        }
    },

    methods: {
        changeValue(newValue) {
            if (!newValue) {
                this.resetFilter();
                return;
            }

            this.$emit('input', newValue);
        },

        resetFilter() {
            this.$emit('filter-reset');
        }
    }
});

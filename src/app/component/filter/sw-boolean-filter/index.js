import template from './sw-boolean-filter.html.twig';

const { Component } = Shopware;

/**
 * @private
 */
Component.register('sw-boolean-filter', {
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

    computed: {
        strValue() {
            if (this.value === true) {
                return 'true';
            }

            if (this.value === false) {
                return 'false';
            }

            return this.value;
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

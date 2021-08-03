import template from './sw-number-filter.html.twig';
import './sw-number-filter.scss';

const { Component } = Shopware;

/**
 * @private
 */
Component.register('sw-number-filter', {
    template,

    props: {
        title: {
            type: String,
            required: true
        },

        value: {
            type: Object,
            required: true
        },

        fromPlaceholder: {
            type: String,
            default: null
        },

        toPlaceholder: {
            type: String,
            default: null
        },

        active: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            numberValue: {
                from: null,
                to: null
            }
        };
    },

    watch: {
        value: {
            handler() {
                if (this.value) {
                    this.numberValue = { ...this.value };
                }
            }
        }
    },

    methods: {
        updateFilter() {
            if (!this.numberValue.from && !this.numberValue.to) {
                this.$emit('filter-reset');
                return;
            }

            if (this.value && this.value.from === this.numberValue.from && this.value.to === this.numberValue.to) {
                return;
            }

            this.$emit('filter-update', this.numberValue);
        },

        resetFilter() {
            this.$emit('filter-reset');
        }
    }
});

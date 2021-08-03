import template from './sw-date-filter.html.twig';
import './sw-date-filter.scss';

const { Component } = Shopware;

/**
 * @private
 */
Component.register('sw-date-filter', {
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
        },

        dateType: {
            type: String,
            default: 'date',
            validate: (value) => ['time', 'date', 'datetime', 'datetime-local'].includes(value)
        }
    },

    data() {
        return {
            dateValue: {
                from: null,
                to: null
            }
        };
    },

    computed: {
        isDateTimeType() {
            return this.dateType === 'datetime' || this.dateType === 'datetime-local';
        }
    },

    watch: {
        value: {
            handler() {
                if (this.value) {
                    this.dateValue = { ...this.value };
                }
            }
        }
    },

    methods: {
        updateFilter() {
            if (!this.dateValue.from && !this.dateValue.to) {
                this.$emit('filter-reset');
                return;
            }

            if (this.value && this.value.from === this.dateValue.from && this.value.to === this.dateValue.to) {
                return;
            }

            this.$emit('input', this.dateValue);
        },

        resetFilter() {
            this.$emit('filter-reset');
        }
    }
});

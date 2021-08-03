import template from './sw-range-filter.html.twig';
import './sw-range-filter.scss';

const { Component } = Shopware;

Component.register('sw-range-filter', {
    template,

    props: {
        value: {
            type: Object,
            required: true
        },

        isShowDivider: {
            type: Boolean,
            required: false,
            default: true
        }
    },

    computed: {
        columns() {
            return this.isShowDivider ? '1fr 12px 1fr' : '1fr';
        },

        gap() {
            return this.isShowDivider ? '4px' : '12px';
        }
    },

    watch: {
        value: {
            deep: true,
            handler(newValue) {
                this.updateFilter(newValue);
            }
        }
    },

    methods: {
        updateFilter(range) {
            const params = {
                ...(range.from ? { gte: range.from } : {}),
                ...(range.to ? { lte: range.to } : {})
            };

            this.$emit('input', params);
        }
    }
});

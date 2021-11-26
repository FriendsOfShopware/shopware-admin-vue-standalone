# Shopware Admin Vue Standalone
Use Shopware admin components outside of Shopware itself. Handy for developing 
Shopware cloud apps where the backend is integrated via iFrame.

## Installation

```shell
npm install shopware-admin-vue-standalone
```

## Usage

```javascript
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueShopwareAdminStandalone from 'shopware-admin-vue-standalone';
import 'shopware-admin-vue-standalone/dist/shopware-admin-vue-standalone.css';

Vue.use(VueShopwareAdminStandalone);
```

Using Shopware global instance

```javascript
import { Shopware } from 'shopware-admin-vue-standalone';
```

### With vue-i18n

If you want to use the existing translations, you need to install vue-18n.
```javascript
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueShopwareAdminStandalone from 'shopware-admin-vue-standalone';
import 'shopware-admin-vue-standalone/dist/shopware-admin-vue-standalone.css';
import adminDe from 'shopware-admin-vue-standalone/dist/snippet/de-DE.json';
import adminEn from 'shopware-admin-vue-standalone/dist/snippet/en-GB.json';

Vue.use(VueI18n);
  
const i18 = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        de: adminDe,
        en: adminEn
    }
});

Vue.use(VueShopwareAdminStandalone, {
    translate: {
        t: (key, values) => i18n.t(key, values),
        tc: (key, choice, values) => i18n.tc(key, choice, values),
        te: (key, locale) => i18n.te(key, locale),
    }
});
```

## Contributing
This project is a first prototype that provides the admin components of Shopware 6.4.1.2.

To provide more version in the future and also remove bugs, any support is welcome.

<template>
    <sw-page class="sw-product-list" :showSmartBar="false" :showSearchBar="false">
      <template #content>
        <sw-data-grid
          fullPage
          :dataSource="[
          { id: 'uuid1', company: 'Wordify', name: 'Portia Jobson' },
          { id: 'uuid2', company: 'Twitternation', name: 'Baxy Eardley' },
          { id: 'uuid3', company: 'Skidoo', name: 'Arturo Staker' },
          { id: 'uuid4', company: 'Meetz', name: 'Dalston Top' },
          { id: 'uuid5', company: 'Photojam', name: 'Neddy Jensen' }
      ]"
          :columns="[
           { property: 'name', label: 'Name' },
           { property: 'company', label: 'Company' }
      ]">
          <template #actions="{item}">
            <sw-context-menu-item>
              Example item
            </sw-context-menu-item>
          </template>
          <template #pagination>
            <sw-pagination :total="500" :limit="25" :page="1"></sw-pagination>
          </template>
        </sw-data-grid>
      </template>
      <template #sidebar>
        <sw-sidebar>
          <sw-sidebar-item
            icon="default-arrow-360-left"
            :title="$tc('sw-product.list.titleSidebarItemRefresh')">
          </sw-sidebar-item>

          <sw-sidebar-filter-panel entity="product">
          </sw-sidebar-filter-panel>
        </sw-sidebar>
      </template>
    </sw-page>
</template>

<script>
export default {
  name: 'App',

  methods: {
    onClick() {
      alert('Test')
    }
  }
}
</script>

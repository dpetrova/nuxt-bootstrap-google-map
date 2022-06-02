<template>
  <div>
    <b-navbar type="dark" variant="primary">
      <b-button-close v-b-toggle.sidebar-menu class="mx-3"
        ><b-icon
          icon="list"
          aria-label="Toggle Sidebar"
          text-variant="white"
        ></b-icon
      ></b-button-close>
      <b-navbar-brand href="#">Postal Codes Location App</b-navbar-brand>
    </b-navbar>
    <b-sidebar id="sidebar-menu" title="Location Search" shadow>
      <SearchByCode />
    </b-sidebar>
    <Nuxt />
  </div>
</template>

<script>
import SearchByCode from '@/components/SearchByCode.vue'

export default {
  head: {
    titleTemplate: '%s - Find location',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Where you can find a place by seraching by postal code',
      },
    ],
  },
  components: {
    SearchByCode,
  },
}
</script>

<style lang="scss" scoped>
.close {
  color: white;
}
</style>

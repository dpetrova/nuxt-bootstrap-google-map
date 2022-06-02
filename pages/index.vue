<template>
  <div>
    <p>Some info...</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  head() {
    return {
      title: 'Map page',
    }
  },
  async fetch({ store, error }) {
    try {
      await store.dispatch('countries/fetchCountries')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch countries events at this time',
      })
    }
  },
})
</script>

<template>
  <b-card :title="country" class="mb-2">
    <b-card-text>
      {{ place['place name'] }}
    </b-card-text>
    <hr />
    <b-card-text>
      <b-list-group>
        <b-list-group-item>{{
          `postal code: ${postalCode}`
        }}</b-list-group-item>
        <b-list-group-item>{{ `lat: ${place.latitude}` }}</b-list-group-item>
        <b-list-group-item>{{ `lng: ${place.longitude}` }}</b-list-group-item>
      </b-list-group>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'LocationInfo',
  props: {
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: '',
    },
    place: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>

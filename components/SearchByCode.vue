<template>
  <b-form @submit="onSubmit" @reset="onReset">
    <b-form-group
      id="input-group-1"
      label="Select a country"
      label-for="country"
    >
      <b-form-select
        id="country"
        v-model="form.country"
        :options="countries"
        value-field="code"
        text-field="name"
        required
        ><template #first>
          <b-form-select-option :value="null" disabled
            >Country</b-form-select-option
          >
        </template></b-form-select
      >
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="Type a postal code"
      label-for="postalcode"
    >
      <b-form-input
        id="country"
        v-model="form.postalcode"
        type="text"
        placeholder="Postal code"
        required
      ></b-form-input>
    </b-form-group>
    <b-row class="text-center">
      <b-col cols="6"
        ><b-button block type="reset" variant="danger">Reset</b-button></b-col
      >
      <b-col cols="6"
        ><b-button block type="submit" variant="primary"
          >Submit</b-button
        ></b-col
      >
    </b-row>
  </b-form>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SearchByCode',
  data() {
    return {
      form: {
        country: null,
        postalcode: '',
      },
    }
  },
  // computed: mapState({
  //   countries: (state) => state.countries.countries,
  // }),
  computed: {
    // userName() {
    //   return this.$store.state.user.name
    // },
    // userId() {
    //   return this.$store.state.user.id
    // },
    // ...mapState({
    //   countries: (state) => state.countries.countries,
    // }),
    ...mapGetters({
      countries: 'countries/countries',
    }),
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault()
      await this.$store.dispatch('place/locate', this.form)
      this.$bus.$emit('refreshMap')
    },
    onReset(event) {
      event.preventDefault()
      this.form.country = null
      this.form.postalcode = ''
    },
  },
}
</script>

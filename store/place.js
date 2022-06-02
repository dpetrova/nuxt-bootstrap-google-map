import CountriesService from '~/services/countries'

export const state = () => ({
  countries: [],
})

export const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = countries
  },
}

export const actions = {
  fetchCountries({ commit }) {
    return CountriesService.getCountries().then((response) => {
      commit('SET_COUNTRIES', response.data)
    })
  },
  locatePlace({ commit }) {
    return CountriesService.getCountries().then((response) => {
      commit('SET_COUNTRIES', response.data)
    })
  },
}

export const getters = {
  countries: (state) => {
    return state.countries.map(({ name, cca2: code }) => {
      return {
        name: name.common,
        code,
      }
    })
  },
}

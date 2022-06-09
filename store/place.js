import PlaceService from '~/services/zip-code'

export const state = () => ({
  location: null,
  loading: false,
})

export const mutations = {
  SET_LOCATION(state, location) {
    state.location = location
  },
  RESET_LOCATION(state) {
    state.location = null
  },
  SET_LOADING(state, status) {
    state.loading = status
  },
}

export const actions = {
  locate({ commit }, { country, postalcode }) {
    commit('SET_LOADING', true) //hack to reload the map with new found location
    return PlaceService.getPlace(country, postalcode)
      .then((response) => {
        commit('SET_LOCATION', response.data)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('RESET_LOCATION')
        commit('SET_LOADING', false)
      })
  },
}

export const getters = {
  location: (state) => state.location,
  loading: (state) => state.loading,
  center: (state) => {
    return {
      lat: +state.location?.places?.[0]?.latitude,
      lng: +state.location?.places?.[0]?.longitude,
    }
  },
  markers: (state) => {
    const places = state.location?.places
    return places?.map((item, index) => {
      return {
        ...item,
        id: index,
        position: {
          lat: +item.latitude,
          lng: +item.longitude,
        },
      }
    })
  },
}

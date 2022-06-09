import Vue from 'vue'

const bus = new Vue()

Vue.prototype.$bus = bus //event bus to emit/listen events through the app

import Vue from 'vue'

export default new Vue({
  data: {
    showSnack: false,
    darkTheme: Boolean(localStorage.getItem('theme'))
  }
})

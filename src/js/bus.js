import Vue from 'vue'

export default new Vue({
  data: {
    snackbar: {
      showSnack: false,
      message: ''
    },
    darkTheme: Boolean(localStorage.getItem('theme'))
  }
})

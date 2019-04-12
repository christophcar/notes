const inputComponent = {
  template: `<input :placeholder="placeholder" class="input is-small" type="text" />`
}

new Vue({
  el: '#app',
  components: {
    'input-component': inputComponent
  },
  data() {
    return {
      notes: [],
      timestamps: [],
      placeholder: 'Enter a note'
    }
  }
})

// Vue child component

const inputComponent = {
  template: `<input 
    :placeholder="placeholder"
    v-model="input"
    @keyup.enter="monitorEnterKey"
    class="input is-small" 
    type="text" />`,
  props: ['placeholder'],
  data() {
    return {
      input: ''
    }
  },
  methods: {
    monitorEnterKey() {
      this.$emit('add-note', {
        note: this.input,
        timestamp: new Date().toLocaleString()
      })
      this.input = ''
    }
  }
}

// Vue parent component (root instance)

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

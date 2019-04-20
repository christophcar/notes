// state
const state = {
  notes: [],
  timestamps: []
}

// mutations
const mutations = {
  ADD_NOTE(state, payload) {
    let newNote = payload
    state.notes.push(newNote)
  },
  ADD_TIMESTAMP(state, payload) {
    let newTimeStamp = payload
    state.timestamps.push(newTimeStamp)
  }
}

// actions
const actions = {
  addNote(context, payload) {
    context.commit('ADD_NOTE', payload)
  },
  addTimestamp(context, payload) {
    context.commit('ADD_TIMESTAMP', payload)
  }
}

// getters
const getters = {
  getNotes: state => state.notes,
  getTimestamps: state => state.timestamps,
  getNoteCount: state => state.notes.length
}

// Vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// input-component
const inputComponent = {
  template: `<input
      placeholder='Enter a note'
      v-model="input"
      @keyup.enter="monitorEnterKey"
      class="input is-small" type="text" />`,
  data() {
    return {
      input: ''
    }
  },
  methods: {
    monitorEnterKey() {
      this.$store.dispatch('addNote', this.input)
      this.$store.dispatch('addTimestamp', new Date().toLocaleString())
      this.input = ''
    }
  }
}

// note-count-component
const noteCountComponent = {
  template: `<div class="note-count">
      Note count: <strong>{{ noteCount }}</strong>
    </div>`,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount
    }
  }
}

// root instance (parent)
new Vue({
  el: '#app',
  store,
  computed: {
    notes() {
      return this.$store.getters.getNotes
    },
    timestamps() {
      return this.$store.getters.getTimestamps
    }
  },
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent
  }
})

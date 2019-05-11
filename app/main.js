// state => like data object
const state = {
  notes: [],
  timestamps: []
}

// mutations => functions that mutate store state
const mutations = {
  // receive payload from actions and push to notes array
  ADD_NOTE(state, payload) {
    let newNote = payload
    state.notes.push(newNote)
  },
  ADD_TIMESTAMP(state, payload) {
    let newTimeStamp = payload
    state.timestamps.push(newTimeStamp)
  }
}

// actions => like methods, call mutations
const actions = {
  // commit payload to ADD_NOTE mutation
  addNote(context, payload) {
    context.commit('ADD_NOTE', payload)
  },
  addTimestamp(context, payload) {
    context.commit('ADD_TIMESTAMP', payload)
  }
}

// getters => like computed
const getters = {
  getNotes: state => state.notes,
  getTimestamps: state => state.timestamps,
  getNoteCount: state => state.notes.length
}

// Vuex store => reactive container that integrates Vuex into app
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
    // dispatch to action called 'addNote' with payload this.input
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
    // display number of notes
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

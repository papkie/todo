<template>
  <div>
    <b-form>
      <b-form-group>
        <h4>Title</h4>
        <b-form-input v-model="title" placeholder="New year, new me!" />
      </b-form-group>

      <b-form-group>
        <h4>Description</h4>
        <b-form-textarea rows="5" v-model="desc" placeholder="Study, exercise and eat well everyday!" />
      </b-form-group>

      <b-button variant="success" @click="create()">Create</b-button>
      <b-button variant="outline-dark" class="ml-2" @click="close()">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit'

export default {
  name: 'new-task',

  data() {
    return {
      title: '',
      desc: '',
    }
  },

  methods: {
    close() {
      this.$root.$emit('bv::hide::modal', 'new-task')
    },
    create() {
      db
        .collection('users')
        .doc('alexjondiaz@gmail.com')
        .collection('tasks')
        .add({
          title: this.title,
          desc: this.desc,
        })
        .then(() => {
          this.$root.$emit('bv::hide::modal', 'new-task')
        })
    },
  },
}
</script>

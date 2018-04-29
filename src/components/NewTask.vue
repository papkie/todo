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

      <b-button variant="success" @click.prevent="create()">Create</b-button>
      <b-button variant="outline-dark" class="ml-2" @click.prevent="close()">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit'
import swal from 'sweetalert2'
import firebase from 'firebase'

export default {
  name: 'new-task',
  props: ['tasks'],

  data() {
    return {
      title: '',
      desc: '',
      id: null,
    }
  },

  methods: {
    close() {
      this.$root.$emit('bv::hide::modal', 'new-task')
    },
    create() {
      const id = String(new Date().getTime())
      const task = {
        title: this.title,
        desc: this.desc,
        id,
      }

      db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('tasks')
        .doc(id)
        .set(task)
        .then(() => {
          swal(`${this.title} successfully added!`)
          this.$emit('new-task', task)
          this.title = ''
          this.desc = ''
          this.close()
        })
        .catch(err => swal(err))
    },
  },
}
</script>

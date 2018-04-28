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

      <b-button variant="success" @click="updateTask()">Update</b-button>
      <b-button variant="outline-danger" class="ml-2" @click="deleteTask()">Delete</b-button>
      <b-button variant="outline-dark" class="ml-2" @click="close()">Cancel</b-button>

    </b-form>
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit'
import swal from 'sweetalert2'

export default {
  name: 'edit-task',
  props: ['title', 'desc', 'id'],

  data() {
    return {
      newTitle: this.title,
      newDesc: this.desc,
    }
  },

  methods: {
    close() {
      this.$root.$emit('bv::hide::modal', 'edit-task')
    },

    updateTask() {
      swal({
        title: 'Are you sure?',
        html: `Your task <i>${this.title}</i> is about to be updated`,
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'UPDATE',
        cancelButtonText: 'CANCEL',
        confirmButtonColor: '#5cb85c',
      }).then(result => {
        if (result.value) {
          db
            .collection('users')
            .doc('alexjondiaz@gmail.com')
            .collection('tasks')
            .doc(this.id)
            .set({
              id: this.id,
              title: this.newTitle,
              desc: this.newDesc,
            })
            .then(() => {
              swal('Your task was successfully updated!').then(result => {
                if (result.value) {
                  this.close()
                }
              })
            })
        }
      })
    },

    deleteTask() {
      swal({
        title: 'Are you sure?',
        html: `Your task <i>${this.title}</i> is about to be deleted`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'DELETE',
        cancelButtonText: 'CANCEL',
        confirmButtonColor: '#d9534f',
      }).then(result => {
        if (result.value) {
          const delTask = this.title
          db
            .collection('users')
            .doc('alexjondiaz@gmail.com')
            .collection('tasks')
            .doc(this.id)
            .delete()
            .then(() => {
              swal(`${delTask} was successfully deleted!`).then(result => {
                if (result.value) {
                  this.close()
                }
              })
            })
        }
      })
    },

    createTask() {
      db
        .collection('users')
        .doc('alexjondiaz@gmail.com')
        .collection('tasks')
        .add({
          title: this.title,
          desc: this.desc,
        })
        .then(() => {
          this.$root.$emit('bv::hide::modal', 'edit-task')
        })
    },
  },
}
</script>

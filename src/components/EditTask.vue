<template>
  <div>
    <b-form>
      <b-form-group>
        <h4>Title</h4>
        <b-form-input v-model="newTitle" placeholder="New year, new me!" />
      </b-form-group>

      <b-form-group>
        <h4>Description</h4>
        <b-form-textarea rows="5" v-model="newDesc" placeholder="Study, exercise and eat well everyday!" />
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
import firebase from 'firebase'

export default {
  name: 'edit-task',
  props: ['task'],

  data() {
    return {
      newTitle: this.task.title,
      newDesc: this.task.desc,
    }
  },

  methods: {
    close() {
      this.$root.$emit('bv::hide::modal', 'edit-task')
    },

    updateTask() {
      swal({
        title: 'Are you sure?',
        html: `Your task <i>${this.task.title}</i> is about to be updated`,
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'UPDATE',
        cancelButtonText: 'CANCEL',
        confirmButtonColor: '#5cb85c',
      }).then(result => {
        if (result.value) {
          const updatedTask = {
            title: this.newTitle,
            desc: this.newDesc,
            id: this.task.id,
          }
          db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('tasks')
            .doc(this.task.id)
            .set(updatedTask)
            .then(() => {
              this.$emit('task-updated', updatedTask)
              swal('Your task was successfully updated!').then(result => {
                if (result.value) {
                  this.close()
                }
              })
            })
            .catch(err => swal(err))
        }
      })
    },

    deleteTask() {
      swal({
        title: `Remove <i>${this.task.title}</i>?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'REMOVE',
        cancelButtonText: 'CANCEL',
        confirmButtonColor: '#d33',
      }).then(result => {
        if (result.value) {
          db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('tasks')
            .doc(String(this.task.id))
            .delete()
            .then(() => {
              this.$emit('task-removed', this.task)
              swal(`${this.task.title} has been removed!`)
            })
            .catch(err => swal(err))
        }
      })
    },
  },
}
</script>

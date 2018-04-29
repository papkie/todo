<template>
  <b-card>
    <b-card-body bg-variant="light" text-variant="dark" :title=currentTask.title>
      <hr>
      <p class="card-text">{{ currentTask.desc }}</p>
    </b-card-body>

    <b-button variant="link" id="btn" @click.prevent="clearTask()">
      <i class="fa fa-check" style="color: green" />
    </b-button>

    <b-button variant="link" id="btn" @click.prevent="editTask()">
      <i class="fa fa-cog" style="color: grey" />
    </b-button>

    <b-modal hide-footer title="Edit Task" ref="editTask" id="edit-task">
      <EditTask @task-removed="removeTask" @task-updated="updateTask" :task="task" />
    </b-modal>

  </b-card>
</template>

<script>
import EditTask from '@/components/EditTask'
import db from '@/firebase/firebaseInit'
import swal from 'sweetalert2'
import firebase from 'firebase'

export default {
  name: 'task-card',
  props: ['task'],
  components: {
    EditTask,
  },
  data() {
    return {
      currentTask: this.task,
    }
  },

  methods: {
    updateTask(task) {
      this.currentTask = task
    },
    clearTask() {
      swal({
        title: `Clear <i>${this.currentTask.title}</i>?`,
        type: 'success',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'CLEAR',
        confirmButtonClass: 'btn btn-success',
        cancelButtonText: 'CANCEL',
        cancelButtonClass: 'btn btn-outline-dark ml-3',
      }).then(result => {
        if (result.value) {
          db
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('tasks')
            .doc(this.currentTask.id)
            .delete()
            .then(() => {
              this.$emit('task-removed', this.currentTask)
              swal(`${this.currentTask.title} has been cleared!`)
            })
            .catch(err => swal(err))
        }
      })
    },
    removeTask(task) {
      this.$emit('task-removed', task)
    },
    editTask() {
      this.$refs.editTask.show()
    },
  },
}
</script>

<style lang="scss" scoped>
#btn {
  position: relative;
  left: 10px;
  margin: -5px;
}
</style>


<template>
  <b-card>
    <b-card-body bg-variant="light" text-variant="dark" :title=currentTask.title>
      <hr v-if="currentTask.desc">
      <p class="card-text">{{ currentTask.desc }}</p>
    </b-card-body>

    <b-button variant="link" id="btn" @click.prevent="clearTask()">
      <i class="fa fa-check glow" style="color: green" />
    </b-button>

    <b-button variant="link" id="btn" @click.prevent="editTask()">
      <i class="fas fa-cog spin" style="color: grey" />
    </b-button>

    <b-modal hide-footer title="Edit Task" ref="editTask" id="edit-task">
      <EditTask @task-removed="removeTask" @task-updated="updateTask" :task="task" />
    </b-modal>

  </b-card>
</template>

<script>
import EditTask from '@/components/EditTask'
import swal from 'sweetalert2'
import db from '@/firebase/firebaseInit'
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
        confirmButtonClass: 'btn btn-success shadowEffect',
        cancelButtonText: 'CANCEL',
        cancelButtonClass: 'btn btn-outline-dark ml-3 shadowEffect',
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
              swal({
                type: 'success',
                title: `<i>${this.currentTask.title}</i> has been cleared!`,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success shadowEffect p-2 px-4',
              })
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

.glow {
  transition: opacity 0.5s ease;
  opacity: 1;

  &:hover {
    transition: opacity 0.5s ease;
    opacity: 0.6;
  }
}

.spin {
  transition: ease-out 0.3s;
  &:hover {
    animation-direction: alternate;
    transform: rotate(90deg);
    transition: ease 0.5s;
  }
}
</style>


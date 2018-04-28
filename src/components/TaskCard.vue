<template>
  <div>
    <b-card>
      <b-card-body bg-variant="light" text-variant="dark" :title=task.title>
        <hr>
        <p class="card-text ">{{ task.desc }}</p>
      </b-card-body>

      <b-button variant="link" id="btn" @click="clearTask()">
        <i class="fa fa-check" style="color: green" />
      </b-button>

      <b-button variant="link" id="btn" @click="editTask()">
        <i class="fa fa-cog" style="color: grey" />
      </b-button>

      <b-modal hide-footer title="Edit Task" ref="editTask" id="edit-task">
        <EditTask :title="task.title" :desc="task.desc" :id="task.id" />
      </b-modal>

    </b-card>
  </div>
</template>

<script>
import EditTask from '@/components/EditTask'
import db from '@/firebase/firebaseInit'
import swal from 'sweetalert2'

export default {
  name: 'task-card',
  props: ['task'],
  components: {
    EditTask,
  },
  methods: {
    clearTask() {
      swal({
        title: `Clear <i>${this.task.title}</i>?`,
        type: 'success',
        showCancelButton: true,
        confirmButtonText: 'YES',
        cancelButtonText: 'CANCEL',
        confirmButtonColor: '#5cb85c',
      }).then(result => {
        if (result.value) {
          db
            .collection('users')
            .doc('alexjondiaz@gmail.com')
            .collection('tasks')
            .doc(this.task.id)
            .delete()
        }
      })
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


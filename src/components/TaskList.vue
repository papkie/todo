<template>
  <b-container class="mb-4">
    <b-row>
      <div v-for="task in tasks" :key=task.id class="col-md-4 mt-4">
        <TaskCard @task-removed="removeTask" class="task" :task="task" />

      </div>
    </b-row>
  </b-container>
</template>

<script>
import TaskCard from '@/components/TaskCard'
import db from '@/firebase/firebaseInit'
import swal from 'sweetalert2'
import firebase from 'firebase'

export default {
  name: 'task-list',
  props: ['tasks'],
  components: {
    TaskCard,
  },

  created() {
    db
      .collection('users')
      .doc(firebase.auth().currentUser.email)
      .collection('tasks')
      .orderBy('id')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.tasks.push({
            title: doc.data().title,
            desc: doc.data().desc,
            id: doc.data().id,
          })
        })
      })
      .catch(err => swal(err))
  },
  methods: {
    removeTask(task) {
      this.tasks.splice(this.tasks.indexOf(task))
    },
  },
}
</script>

<style lang="scss">
.task {
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 162, 255, 0.445),
      0 6px 10px 0 rgba(0, 255, 85, 0.19);
  }
  transition: 0.3s;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.445), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>

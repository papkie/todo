<template>
  <div class="container mb-4">
    <div class="row">
      <div v-for="task in tasks" :key=task.id class="col-md-4 mt-4">
        <TaskCard class="task" :task=task />

      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from '@/components/TaskCard'
import db from '@/firebase/firebaseInit'

export default {
  name: 'task-list',
  components: {
    TaskCard,
  },

  data() {
    return {
      tasks: [],
    }
  },
  created() {
    db
      .collection('users')
      .doc('alexjondiaz@gmail.com')
      .collection('tasks')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.tasks.push({
            title: doc.data().title,
            desc: doc.data().desc,
          })
        })
      })
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

<template>
  <b-container class="mb-4">
    <b-row v-if="ready">
      <div v-for="task in filteredSearch" :key=task.id class="col-md-4 mt-4">
        <TaskCard @task-removed="removeTask" class="task" :task="task" />
      </div>
    </b-row>
    <div v-else class="spin mt-5" />
  </b-container>
</template>

<script>
import TaskCard from '@/components/TaskCard'
// import db from '@/firebase/firebaseInit'
import swal from 'sweetalert2'
// import firebase from 'firebase'

export default {
  name: 'task-list',
  props: ['tasks', 'search'],
  components: {
    TaskCard,
  },
  data() {
    return {
      taskList: this.tasks,
      ready: false,
    }
  },
  created() {
    // db
    //   .collection('users')
    //   .doc(firebase.auth().currentUser.email)
    //   .collection('tasks')
    //   .orderBy('id')
    //   .get()
    //   .then(query => {
    //     query.forEach(doc => {
    //       this.taskList.push({
    //         title: doc.data().title,
    //         desc: doc.data().desc,
    //         id: doc.data().id,
    //       })
    //     })
    //     this.ready = true
    //     this.$emit('updated-list', this.taskList)
    //   })
    //   .catch(err => swal(err))
  },
  computed: {
    filteredSearch() {
      return this.taskList.filter(task =>
        task.title.toLowerCase().includes(this.search.toLowerCase()))
    },
  },
  methods: {
    removeTask(task) {
      this.taskList.splice(this.taskList.indexOf(task), 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.task {
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 162, 255, 0.445),
      0 6px 10px 0 rgba(0, 255, 85, 0.19);
  }
  transition: 0.3s;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.445), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.spin::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  margin-top: 100px;
  left: 45%;
  height: 75px;
  width: 75px;
  border-radius: 50%;
  border-top: 2.35px solid rgba(98, 122, 255, 0.582);
  border-right: 2.35px solid transparent;
  animation: spinner 0.7s linear infinite;
}

@media screen and (max-width: 575px) {
  .spin::before {
    left: 42.5%;
    margin-top: 50px;
  }
}
</style>

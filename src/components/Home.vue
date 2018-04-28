<template>
  <div v-if="ready">
    <Navbar @home="showHome()" @about="showAbout()" :email="email" :isLoggedIn="isLoggedIn" @user-logout="userLogout()" />

    <div v-if="showSignUpPage">
      <Register @loggedIn="userLogin()" @back="showSignUpPage = false" />
    </div>

    <div v-else-if="!isLoggedIn" class="container">
      <Login @signup="userSignup()" @loggedIn="userLogin()" />
    </div>

    <div v-else class="mt-3">

      <div v-show="about" class="container">
        <About />
      </div>

      <div v-show="home" class="container">
        <h4>Todo List</h4>
        <hr class="my-2">
        <b-button v-b-modal.new-task variant="primary" class="mt-2" id="newBtn">
          New Task
          <i class="fa fa-plus ml-1" />
        </b-button>

        <b-modal hide-footer id="new-task" title="New Task">
          <NewTask :tasks="tasks" @new-task="addTask" />
        </b-modal>

      </div>

      <TaskList v-show="home" :tasks="tasks" />

    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
import NewTask from '@/components/NewTask'
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import Register from '@/components/Register'
import About from '@/components/About'
import firebase from 'firebase'

export default {
  name: 'home',
  components: {
    Navbar,
    TaskList,
    NewTask,
    Login,
    Register,
    About,
  },
  data() {
    return {
      tasks: [],
      isLoggedIn: true,
      ready: false,
      showSignUpPage: false,
      email: '',
      about: false,
      home: true,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.isLoggedIn = false
      }
      this.ready = true
    })
  },
  methods: {
    showHome() {
      this.about = false
      this.home = true
    },
    showAbout() {
      this.about = true
      this.home = false
    },
    userSignup() {
      this.showSignUpPage = true
    },
    userLogin() {
      this.email = firebase.auth().currentUser.email
      this.showSignUpPage = false
      this.isLoggedIn = true
    },

    userLogout() {
      this.isLoggedIn = false
      this.tasks = []
    },

    addTask(task) {
      this.tasks.push(task)
    },
  },
}
</script>

<style lang="scss" scoped>
#newBtn {
  &:hover {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.075),
      0 6px 10px 0 rgba(0, 0, 0, 0.19);
  }
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.445), 0 3px 3px 0 rgba(0, 0, 0, 0.19);
}
</style>

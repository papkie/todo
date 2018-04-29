<template>
  <div v-if="ready">
    <Navbar :email="email" :isLoggedIn="isLoggedIn" @home="showHome()" @about="showAbout()" @user-logout="userLogout()" />

    <div v-if="showSignUpPage">
      <Register @loggedIn="userLogin()" @back="showSignUpPage = false" />
    </div>

    <b-container v-else-if="!isLoggedIn">
      <Login @registered="userLogin()" @signup="showSignUpPage = true" @loggedIn="userLogin()" />
    </b-container>

    <div v-else class="mt-3">

      <b-container v-show="about">
        <About />
      </b-container>

      <b-container v-show="home">
        <h4>Todo List</h4>
        <hr class="my-2">
        <b-button v-b-modal.new-task variant="primary" class="mt-2 shadowEffect">
          New Task
          <i class="fa fa-plus ml-1" />
        </b-button>

        <b-modal hide-footer id="new-task" title="New Task">
          <NewTask :tasks="tasks" @new-task="addTask" />
        </b-modal>

      </b-container>

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
      email: null,
      about: false,
      home: true,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.isLoggedIn = false
      } else {
        this.userLogin()
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
    userLogin() {
      this.showSignUpPage = false
      this.isLoggedIn = true
      this.email = firebase.auth().currentUser.email
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

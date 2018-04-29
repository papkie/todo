<template>
  <div v-if="ready">
    <Navbar :email="email" :isLoggedIn="isLoggedIn" @show="show" @user-logout="userLogout()" />

    <b-container v-if="!isLoggedIn">
      <Register v-if="signup" @loggedIn="userLogin()" @back="signup = false" />
      <Login v-else @registered="userLogin()" @signup="signup = true" @loggedIn="userLogin()" />
    </b-container>

    <div v-else class="mt-3">
      <b-container v-show="about">
        <About />
      </b-container>

      <b-container v-show="home">
        <h4>Todo List</h4>
        <hr class="my-2">
        <b-row class="mt-3">
          <b-button v-b-modal.new-task variant="primary" class="ml-3 shadowEffect">
            New Task
            <i class="fa fa-plus ml-1" />
          </b-button>

          <b-col sm="3" id="search">
            <b-form-input type="search" size="md" placeholder="Search" v-model="search" />
          </b-col>

        </b-row>

        <b-modal hide-footer id="new-task" title="New Task">
          <NewTask :tasks="tasks" @new-task="addTask" />
        </b-modal>

      </b-container>
      <TaskList v-show="home" :tasks="tasks" :search="search" class="mt-5" />
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
      email: null,
      search: '',
      isLoggedIn: true,
      ready: false,
      signup: false,
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
    show(page) {
      if (page === 'home') {
        this.about = false
        this.home = true
      } else {
        this.about = true
        this.home = false
      }
    },
    userLogin() {
      this.showSignUpPage = false
      this.isLoggedIn = true
      this.email = firebase.auth().currentUser.email
    },
    userLogout() {
      this.isLoggedIn = false
      this.tasks = []
      this.email = null
    },
    addTask(task) {
      this.tasks.push(task)
    },
  },
}
</script>

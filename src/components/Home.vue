<template>
  <div v-if="ready">
    <Navbar :email="email" :isLoggedIn="isLoggedIn" @show="show" @user-logout="userLogout()" />

    <b-container v-if="!isLoggedIn">
      <Register v-if="signup" @loggedIn="userLogin()" @back="signup = false" />
      <Login v-else @registered="userLogin()" @signup="signup = true" @loggedIn="userLogin()" />
    </b-container>

    <div v-else class="mt-3">
      <About v-show="about" />
      <HeadView v-show="home" :search="search" :tasks="tasks" @search="filter" @new-task="addTask" class="head" />
      <TaskList v-show="home" :tasks="tasks" :search="search" class="list" />
    </div>

  </div>
</template>

<script>
import HeadView from '@/components/HeadView'
import TaskList from '@/components/TaskList'
import Login from '@/components/Login'
import Navbar from '@/components/Navbar'
import Register from '@/components/Register'
import About from '@/components/About'
import firebase from 'firebase'

export default {
  name: 'home',
  components: {
    HeadView,
    Navbar,
    TaskList,
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
    filter(search) {
      this.search = search
    },
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
      this.tasks = []
      this.isLoggedIn = false
      this.email = null
    },
    addTask(task) {
      this.tasks.push(task)
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.list {
  padding-bottom: 10px;
}

@media screen and (max-width: 1919px) {
  .list {
    position: relative;
    top: 15px;
  }
}

@media screen and (min-width: 1920px) {
  .list {
    position: relative;
    bottom: 70px;
  }

  .head {
    position: relative;
    right: 20%;
  }
}
</style>

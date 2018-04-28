<template>
  <div class="container mt-5">
    <form class="text-center">

      <div class="form-group">
        <label for="email">
          <h5 class="display-4">
            Email
            <i class="ml-1 fa fa-envelope" />
          </h5>
        </label>
        <input type="email" class="form-control" id="email" v-model="email" required>
        <small class="form-text text-muted">We won't share your email, promise!</small>
      </div>

      <div class="form-group">
        <label for="password">
          <h5 class="display-4">
            Password
            <i class="ml-1 fa fa-lock" />
          </h5>
        </label>
        <input type="password" class="form-control" id="password" v-model="password" required>
        <small class="form-text text-muted">Make your password secure with numbers, symbols and spaces!</small>
      </div>

      <div class="row mt-5 justify-content-center">
        <button class="btn btn-success" @click="createUser">Create Account</button>
        <button class="btn btn-outline-dark ml-3 px-5" @click="back()">Back</button>
      </div>

    </form>
  </div>
</template>

<script>
import firebase from 'firebase'
import swal from 'sweetalert2'

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    back() {
      this.$emit('back')
    },
    createUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => this.login(), err => swal(err.message))
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.$emit('loggedIn'), err => swal(err.message))
    },
  },
}
</script>

<style scoped>
.display-4 {
  font-size: 2rem;
}
</style>

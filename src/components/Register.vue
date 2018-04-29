<template>
  <b-container class="mt-5">
    <b-form class="text-center">

      <b-form-group>
        <label for="email">
          <h5 class="display-4">
            Email
            <i class="ml-1 fa fa-envelope" />
          </h5>
        </label>
        <b-form-input type="email" v-model="email" required />
        <small class="form-text text-muted">We won't share your email, promise!</small>
      </b-form-group>

      <b-form-group>
        <label for="password">
          <h5 class="display-4">
            Password
            <i class="ml-1 fa fa-lock" />
          </h5>
        </label>
        <b-form-input type="password" v-model="password" required />
        <small class="form-text text-muted">Make your password secure with numbers, symbols and spaces!</small>
      </b-form-group>

      <b-row class="mt-5 justify-content-center">
        <b-button variant="success" class="shadow" @click.prevent="createUser">Create Account</b-button>
        <b-button variant="outline-dark" class="ml-3 px-5 shadow" @click.prevent="back()">Back</b-button>
      </b-row>

    </b-form>
  </b-container>
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
        .then(() => this.$emit('registered'), err => swal(err.message))
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

<style lang="scss" scoped>
.display-4 {
  font-size: 2rem;
}

</style>

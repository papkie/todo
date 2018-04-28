<template>
  <div class="mt-5">
    <form class="text-center">

      <div class="form-group">
        <label for="email">
          <h5 class="display-4">
            Email
            <i class="ml-1 fa fa-envelope" />
          </h5>
        </label>
        <input type="email" class="form-control" v-model="email" required>
      </div>

      <div class="form-group">
        <label for="password">
          <h5 class="display-4">
            Password
            <i class="ml-1 fa fa-lock" />
          </h5>
        </label>
        <input type="password" class="form-control" v-model="password" required>
      </div>

      <div id="check">
        <label for="check">Remember me!</label>
        <input type="checkbox" class="form-check-input" id="check" v-model="remember">
      </div>

      <div class="row mt-2 justify-content-center">
        <button class="btn btn-success" @click="login()">Sign In
          <i class="ml-1 fa fa-sign-in-alt" />
        </button>

        <button class="btn btn-primary ml-3" @click="signup()">Sign Up
          <i class="ml-1 fa fa-plus" />
        </button>
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
      email: 'alexjondiaz@gmail.com',
      password: '123456',
      remember: false,
    }
  },
  methods: {
    signup() {
      this.$emit('signup')
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            if (this.remember) {
              firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            } else {
              firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.NONE)
            }
            this.$emit('loggedIn')
          },
          err => swal(err.message),
        )
    },
  },
}
</script>


<style scoped>
.display-4 {
  font-size: 2rem;
}
#check {
  margin-right: 2rem;
}
input[type='checkbox'] {
  transform: scale(1.5);
  margin-top: 0.35rem;
  margin-left: 0.9rem;
}
</style>

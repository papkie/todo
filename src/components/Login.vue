<template>
  <b-form class="text-center mt-5">

    <b-form class="form-group">
      <label for="email">
        <h5 class="display-4">
          Email
          <i class="ml-1 fa fa-envelope" />
        </h5>
      </label>
      <b-form-input type="email" v-model="email" required />
    </b-form>

    <b-form-group>
      <label for="password">
        <h5 class="display-4">
          Password
          <i class="ml-1 fa fa-lock" />
        </h5>
      </label>
      <b-form-input type="password" v-model="password" required />
    </b-form-group>

    <b-container class="mt-5">
      <b-container id="checkGroup">
        <label id="checkLabel" for="check">Remember me</label>
        <b-form-checkbox class="mb-4" id="check" v-model="remember" />
      </b-container>

      <b-row class="justify-content-center">
        <b-button variant="success" @click.prevent="login()" class="shadowEffect">Sign In
          <i class="ml-1 fa fa-sign-in-alt" />
        </b-button>

        <b-button variant="primary" class="ml-3 shadowEffect" @click.prevent="signup()">Sign Up
          <i class="ml-1 fa fa-plus" />
        </b-button>
      </b-row>
    </b-container>

  </b-form>
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

<style lang="scss" scoped>
.display-4 {
  font-size: 2rem;
}

#checkGroup {
  position: relative;
  left: 19px;
}

#checkLabel {
  position: relative;
  bottom: 5px;
  right: 10px;
}
</style>

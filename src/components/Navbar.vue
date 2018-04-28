<template>
  <b-navbar toggleable variant="light">
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand>
      <i class="fas fa-cube mb-2"></i>
    </b-navbar-brand>

    <b-collapse v-if="isLoggedIn" is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item @click="homePage()">
          <h3>Home</h3>
        </b-nav-item>
        <b-nav-item @click="aboutPage()">
          <h3>About</h3>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          {{ currentUser }}
        </b-nav-item>
        <b-nav-item>
          <b-button variant="outline-secondary" size="sm" id="logout" @click="logout()">
            Logout
            <i class="fas fa-sign-out-alt ml-1" />
          </b-button>
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from 'firebase'
import swal from 'sweetalert2'

export default {
  name: 'navbar',
  props: ['isLoggedIn', 'email'],
  data() {
    return {
      currentUser: this.email,
    }
  },

  created() {
    if (firebase.auth().currentUser) {
      this.currentUser = firebase.auth().currentUser.email
    }
  },
  methods: {
    homePage() {
      this.$emit('home')
    },

    aboutPage() {
      this.$emit('about')
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$emit('user-logout'), err => swal(err.message))
    },
  },
}
</script>


<style lang="scss" scoped>
#logout {
  font-size: 12px;
}
</style>

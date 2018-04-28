<template>
  <b-navbar toggleable variant="light">
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand>
      <i class="fas fa-cube mb-2"></i>
    </b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item><h3>Home</h3></b-nav-item>
        <b-nav-item><h3>About</h3></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item id="email">
          <small>
            alexjondiaz@gmail.com
          </small>
        </b-nav-item>
        <b-nav-item>
          <b-button variant="outline-secondary" size="sm" id="logout">
            Logout
            <i class="fas fa-sign-out-alt ml-1" />
          </b-button>
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>

  </b-navbar>
</template>

<style lang="scss" scoped>
#logout {
  font-size: 12px;
}
</style>

<template>
  <div id="navbar">
    <nav>
      <div class="nav-wrapper indigo darken-4">
        <router-link class="brand-logo" to="/">Projects Manager</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li v-if="!store.isUserLogged()">
            <router-link to="/">Register</router-link>
          </li>
          <li v-show="!store.isUserLogged()">
            <router-link to="/login">LogIn</router-link>
          </li>
          <li v-show="store.isUserLogged()">
            <router-link to="/deleted">Deleted Projects</router-link>
          </li>
          <li v-show="store.isUserLogged()">
            <router-link to="/projects">Projects</router-link>
          </li>
          <li v-show="store.isUserLogged()">
            <a class="waves-effect waves-light btn deep-orange darken-4" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li v-if="!store.isUserLogged()">
        <router-link to="/">Register</router-link>
      </li>
      <li v-show="!store.isUserLogged()">
        <router-link to="/login">LogIn</router-link>
      </li>
      <li v-show="store.isUserLogged()">
        <router-link to="/deleted">Deleted Projects</router-link>
      </li>
      <li v-show="store.isUserLogged()">
        <router-link to="/projects">Projects</router-link>
      </li>
      <li v-show="store.isUserLogged()">
        <a class="waves-effect waves-light btn deep-orange darken-4" @click="logout">Logout</a>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '@/store/store';
export default {
  data: () => ({
    store,
  }),
  mounted() {
    M.AutoInit();
  },
  methods: {
    logout() {
      store.logout();
      this.$router.push('/login');
      this.$forceUpdate();
    },
  }
}
</script>

<template>
  <BackToTop />
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <div>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/admin">Admin Panel</RouterLink> |
      <RouterLink to="/stats">Booking Statistics</RouterLink>
      </div>

      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
      
      <div>
        <RouterLink v-if="!isConnected" to="/login" class="btn btn-primary me-2"><font-awesome-icon class="me-2" icon="fa-solid fa-user" />Login</RouterLink>
        <RouterLink v-if="!isConnected" to="/register" class="btn btn-primary me-2">Create Account</RouterLink>
        <button v-if="isConnected" @click="logout" class="btn btn-primary me-2">Logout</button>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import BackToTop from './components/BackToTop.vue';

export default {
  components: {
    RouterLink, 
    RouterView
  },
data() {
  return {
    isConnected: false
  }
},
mounted() {
  this.checkLoggedIn();
},
methods: {
  checkLoggedIn() {
    const token = localStorage.getItem('token');
    this.isConnected = !!token;
  },  
  async logout() {
    localStorage.removeItem('token')
        this.isConnected = false
        window.alert('Successfully disconnected');
        await this.$router.push('/')
        window.location.reload()

  }
}
}

</script>
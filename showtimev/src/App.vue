<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import BackToTop from './components/BackToTop.vue';
</script>

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
        <a href="/login" class="btn btn-primary me-2" type="button">Login</a>
        <a href="/register" class="btn btn-primary me-2" type="button">Create an account</a>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
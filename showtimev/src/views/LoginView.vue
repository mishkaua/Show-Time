<template>
  <form @submit.prevent="login">
    <div class="container m-5 p-5 sm-col-8 border rounded shadow">
      <h3>Login</h3>
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input v-model="username" type="text" class="form-control" id="username" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import axiosInstance from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      console.log('username:', this.username)
      console.log('paswd:', this.password)
      try {
        const response = await axiosInstance.post('http://localhost:3000/auth/login', {
          username: this.username,
          password: this.password
        })
        const token = response.data.token
        console.log(response.data)
        localStorage.setItem('token', token)
        /* localStorage.setItem('id_locally_stored', response.data.user.id)
        localStorage.setItem('name_locally_stored', response.data.user.name) */
        /* localStorage.setItem('account_creation_date_locally_stored', response.data.user.created_at)
        this.name = response.data.user.name */
        /* console.log(response.data) */
        /* setAuthToken(token) */
        this.$router.push('/'); /* link to x page */
        console.log('Logged in successfully');
      } catch (error) {
        console.log('not connected', error)
      }
    }
  }
}
</script>

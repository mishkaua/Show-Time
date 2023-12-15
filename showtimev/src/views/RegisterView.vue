<template>
  <form @submit.prevent="register">
    <div class="container m-5 p-5 sm-col-8 border rounded shadow">
      <h3>Register</h3>
      <div class="row">
        <div class="col mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" required minlength="4" aria-label="Username" />
        </div>
        <div class="col mb-3">
          <label for="username" class="form-label">Email</label>
          <input type="email" class="form-control" required aria-label="Email" />
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Create your password</label>
        <input type="password" class="form-control" required minlength="5" id="password" />
      </div>
      <div class="mb-3">
        <label for="passwordConfirmation" class="form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          required
          minlength="5"
          id="passwordConfirmation"
        />
      </div>
      <button type="submit" class="btn btn-primary">Create an account</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
    data ()  {
        return {
            formData: {
                name:'',
                username: '',
                email: '',
                password: '',
                passwordConfirmation: '',
            }
        };
    },
    methods: {
        async register() {
        try {
            const response = await axios.post('/users/register', this.formData);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
}
}
</script>

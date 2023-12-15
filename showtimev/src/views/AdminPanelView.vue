<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import Concerts from '../components/Concerts.vue';
const $toast = useToast();

let users = ref([]);

//display users onMounted
onMounted(async () => {
    getUsers();
})
    
    function getUsers() {
    axios.get('http://localhost:3000/users')
        .then(response => {
            users.value = response.data
            console.log('Users:', users)
        })
        .catch(error => {
            console.error("Error getting a user list:", error);
        });
}

function updateUser(user) {
  const dataToUpdate = {
    id: user._id,
    username: user.username,
    email: user.email,
  };
  //console.log('Data to update: ', dataToUpdate)
  axios.patch(`http://localhost:3000/users/${user._id}`, dataToUpdate)
    .then(response => {
      console.log(response.data);
      $toast.success('User updated successfully');
      getUsers();
    })
    .catch(error => {
      console.error("Error updating user:", error);
    });
}

function deleteUser(user) {
  axios.delete(`http://localhost:3000/users/${user._id}`)
  .then(response => {
      console.log(response.data);
      $toast.warning('User deleted successfully');
      getUsers();
    })
    .catch(error => {
      console.error("Error deleting user:", error);
    });
}

function addAdmin(user){
  const dataToUpdate = {
    id: user._id,
    isAdmin: 1
  };
  console.log(dataToUpdate)
  axios.patch(`http://localhost:3000/users/${user._id}`, dataToUpdate)
  .then(response => {
      console.log(response.data);
      $toast.success('User assigned as admin')
    })
    .catch(error => {
      console.error("Error updating user:", error);
    });
}
</script>

<template>
    <div class="row">
        
        <div class="col-lg-5 m-3 border rounded shadow">
            <h1>Manage Users</h1>
            <div class="d-grid d-md-flex justify-content-md-end">
                <router-link to="/register"  type="button" class="btn btn-primary">
                    <font-awesome-icon class="mx-2" icon="fa-solid fa-user-plus" />Add a user</router-link>
                </div>
            <div class="input-group m-2" v-for="user in users" :key="user._id">
                <span class="input-group-text">Username and email</span>
                <input type="text" aria-label="Username" class="form-control" v-on:keyup.enter="updateUser(user)"
                    v-model="user.username">
                <input type="text" aria-label="Email" class="form-control" v-on:keyup.enter="updateUser(user)"
                    v-model="user.email">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <router-link to="" class="dropdown-item" @click.prevent="addAdmin(user)" v-model="user._id">
                            Add as admin
                        </router-link>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                        <router-link to="" class="dropdown-item" v-on:click="updateUser(user)" v-model="user._id">
                            Update a user
                        </router-link>
                    </li>
                    <li>
                        <router-link to="" class="dropdown-item" v-on:click="deleteUser(user)" v-model="user._id">
                            Delete a user
                        </router-link>
                    </li>
                </ul>
            </div>

        </div>
        <Concerts />
    </div>
</template>
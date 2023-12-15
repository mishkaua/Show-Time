<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
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
    id: user.id,
    name: user.username,
    email: user.email,
  };
  //console.log(dataToUpdate)
  axios.put(`http://localhost:8000/api/users/${user.id}`, dataToUpdate)
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
  axios.delete(`http://localhost:8000/api/users/${user.id}`)
  .then(response => {
      console.log(response.data);
      $toast.success('User deleted successfully');
      getUsers();
    })
    .catch(error => {
      console.error("Error updating user:", error);
    });

}

function addAdmin(user){
  const dataToUpdate = {
    id: user.id,
    isAdmin: 1
  };
  console.log(dataToUpdate)
  axios.put(`http://localhost:8000/api/users/${user.id}`, dataToUpdate)
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

            <div class="input-group m-2" v-for="user in users" :key="user.id">
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
                        <router-link to="" class="dropdown-item" @click.prevent="addAdmin(user)" v-model="user.id">
                            Add as admin
                        </router-link>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                        <router-link to="" class="dropdown-item" v-on:click="updateUser(user)" v-model="user.id">
                            Update a user
                        </router-link>
                    </li>
                    <li>
                        <router-link to="" class="dropdown-item" v-on:click="deleteUser(user)" v-model="user.id">
                            Delete a user
                        </router-link>
                    </li>
                </ul>
            </div>

        </div>
        <div class="col-lg-5 m-3 border rounded shadow">
            <h1>Manage Concerts</h1>
        </div>
    </div>
</template>
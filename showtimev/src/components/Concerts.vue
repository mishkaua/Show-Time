<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
let concerts = ref([]);
const $toast = useToast();

onMounted(async () => {
    getConcerts();
})

function getConcerts() {
    axios.get('http://localhost:3000/concerts')
        .then(response => {
            concerts.value = response.data;
            console.log('Concerts:', concerts);
        })
        .catch(error => {
            console.error("Error getting a concert list:", error);
        });
}

function deleteConcert(concert) {
    axios.delete(`http://localhost:3000/concerts/${concert._id}`)
  .then(response => {
      console.log(response.data);
      $toast.warning('Concert deleted successfully');
      getConcerts();
    })
    .catch(error => {
      console.error("Error deleting ${concert._id} a concert:", error);
    });
}

function updateConcert(concert) {
    const dataToUpdate = {
    id: concert._id,
    band: concert.band,
    genre: concert.genre,
    date: concert.date,
    totalTickets: concert.totalTickets,
  };
  //console.log('Data to update: ', dataToUpdate)
  axios.patch(`http://localhost:3000/concerts/${concert._id}`, dataToUpdate)
    .then(response => {
      console.log(response.data);
      $toast.success('Concert updated successfully');
      getConcerts();
    })
    .catch(error => {
      console.error("Error updating concert:", error);
    });
}
</script>

<template>
    <div class="col-lg-5 m-3 border rounded shadow">
        <h1>Manage Concerts</h1>
        <div class="d-grid d-md-flex justify-content-md-end">
            <router-link to="/concert" type="button" class="btn btn-primary">
                <font-awesome-icon class="mx-2" icon="fa-solid fa-circle-plus" />Create a concert</router-link>
        </div>
        <div class="input-group m-2" v-for="concert in concerts" :key="concert._id">
        <input type="text" aria-label="Band" class="form-control" v-on:keyup.enter="updateConcert(concert)"
            v-model="concert.band">
        <input type="text" aria-label="Genre" class="form-control" v-on:keyup.enter="updateConcert(concert)"
            v-model="concert.genre">
            <input type="text" aria-label="Concert date" class="form-control" v-on:keyup.enter="updateConcert(concert)"
            v-model="concert.date">
        <input type="text" aria-label="Total tickets" class="form-control" v-on:keyup.enter="updateConcert(concert)"
            v-model="concert.totalTickets">
            <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <router-link to="" class="dropdown-item" v-on:click="updateConcert(concert)" v-model="concert._id">
                            Update a concert
                        </router-link>
                    </li>
                    <hr class="dropdown-divider">
                    <li>
                        <router-link to="" class="dropdown-item" v-on:click="deleteConcert(concert)" v-model="concert._id">
                            Delete a concert
                        </router-link>
                    </li>
                </ul>
    </div>

    </div>

</template>
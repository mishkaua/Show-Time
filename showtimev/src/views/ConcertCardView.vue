<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios"
let concerts = ref([]);

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
</script>

<template>
    <!--List of concerts-->
    <div class="row d-flex justify-content-evenly">
        <div v-for="concert in concerts" :key="concert._id" class="card col-sm-5 col-lg-3 m-3">
            <div class="card-body">
                <h5 class="card-title">{{ concert.band }}</h5>
                <p class="card-text">{{ concert.date }}</p>
                <p class="card-text">{{ concert.genre }}</p>
                <p class="card-text">Available tickets: {{ concert.totalTickets - concert.soldTickets }}</p>
                <div class="d-flex justify-content-between card-footer">
                    <a href="#" class="btn mx-1 btn-primary">Book a ticket</a>
                    <a href="#" class="btn btn-primary">Add to<font-awesome-icon class="ms-1"
                            icon="fa-solid fa-heart" /></a>
                </div>
            </div>
        </div>
    </div>
</template>
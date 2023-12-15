<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from "axios"

let users=ref([]);
let numOfUsers = ref();
let concerts = ref([]);
let numOfTickets = ref();

    onMounted(async () => {
    getUsers();
    getConcerts();
})

function getUsers() {
    axios.get('http://localhost:3000/users')
        .then(response => {
            users.value = response.data
            //console.log('Users:', users);
            numOfUsers.value = users.value.length;
            console.log('Number of users is ', numOfUsers.value);
            console.log('Users ', users);
        })
        .catch(error => {
            console.error("Error getting a user list:", error);
        });
}

function getConcerts() {
    axios.get('http://localhost:3000/concerts')
        .then(response => {
            concerts.value = response.data;
            //get a sum of totalTickets
            let numOfTickets = 0; 
            for (let i=0; i<concerts.value.length; i++) {
               numOfTickets = 
                numOfTickets + concerts.value[i].totalTickets;
            }
            console.log('Number of tickets is ', numOfTickets);
            console.log('Concerts:', concerts);
        })
        .catch(error => {
            console.error("Error getting a concert list:", error);
        });
}

function totalTickets (concerts) {
    let numOfTickets = 0; 
            for (let i=0; i<concerts.value.length; i++) {
               numOfTickets = 
                numOfTickets + concerts.value[i].totalTickets;
            }
            return numOfTickets;
        }

const numOfAdmins = computed (()=> {
    return (users.value.filter((user) => user.isAdmin === true)).length;
}) 

</script>

<template>
    <h1>Booking Statistics Page</h1>

    <div class="rounded border m-5 p-3 shadow">
        <h6>Tickets</h6>
        <p>Total number of tickets available for reservation:<strong> {{ numOfTickets }} </strong></p>
        <p>Total number of tickets booked:</p>
        <hr>
        <h6>Users</h6>
        <p>Total number of registered users: <strong> {{ numOfUsers }}</strong></p>
        <p>Total number of admin users: <strong> {{ numOfAdmins }} </strong></p>
    </div>
</template>
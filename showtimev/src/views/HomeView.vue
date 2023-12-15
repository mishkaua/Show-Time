<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from "axios"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import ConcertCardView from './ConcertCardView.vue';

const date = ref();
const $toast = useToast();
let bands = ref([]);
const activeBand = ref(null);

const props = defineProps({
    activeBand: {
    type: String,
    default: ''
  },
})

const setActiveBand = (title) => {
      activeBand.value = title
    };

const handleDate = (modelData) => {
  date.value = modelData;
}

onMounted(async () => {
    getBands();
})
    
    function getBands() {
    axios.get('http://localhost:3000/bands')
        .then(response => {
            bands.value = response.data;
            console.log('Bands:', bands); 
        })
        .catch(error => {
            console.error("Error getting a band list:", error);
        });
}
</script>

<template>

  <p> Date: {{ date }}</p>
  
  <div class="row mx-3">
    <div>
  <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
    <VueDatePicker v-model="date" model-type="dd.MM.yyyy" @update:model-value="handleDate"></VueDatePicker>
    <!--dropdown by genre-->
    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Genre
    </button>
    <ul class="dropdown-menu">
      <li v-for="band in bands" :key="band._id"><a class="dropdown-item" href="#">{{ band.genre }}</a></li>
    </ul>
  <!--dropdown by band-->
  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Band
  </button>
  <ul class="dropdown-menu">
    <li @click="setActiveBand(band.title)" v-for="band in bands" :key="band._id"><a class="dropdown-item" href="#">{{ band.title }}</a></li>
  </ul>
  </div>
</div>
Active Band {{ activeBand }}

<ConcertCardView :active-band='activeBand'/>

  </div>
</template>

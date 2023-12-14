<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

const date = ref();

const handleDate = (modelData) => {
  date.value = modelData;
}

</script>

<template>

  <h1>Welcome to Home Page</h1>
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
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  <!--dropdown by band-->
  <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    Band
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Dropdown link</a></li>
    <li><a class="dropdown-item" href="#">Dropdown link</a></li>
  </ul>
  </div>
</div>


    <div class="card col-sm-3 m-3">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
        <a href="#" class="btn btn-primary">Book a ticket</a>
      </div>
    </div>

  </div>
</template>

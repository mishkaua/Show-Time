<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showButton = ref(false);
const handleScroll = () => {
  showButton.value = window.scrollY > 50;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <button class=" btn-xl p-3 border rounded " id="back-to-top" @click="scrollToTop"><font-awesome-icon class="mx-1" icon="fa-solid fa-arrow-up" />Back
      to top</button>
  </div>
</template>
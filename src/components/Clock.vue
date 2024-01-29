<script setup lang="ts">
import { ref } from "vue";

import { getCurrentHour } from "../utils";

const currentHour = ref(getCurrentHour());

setInterval(() => {
  currentHour.value = getCurrentHour();
}, 1000);
</script>

<template>
  <section class="window-width mx-auto mt-5 flex items-center justify-center">
    <h1 class="text-7xl">
      {{ currentHour }}
    </h1>
  </section>
</template>

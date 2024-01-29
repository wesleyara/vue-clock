<script setup lang="ts">
import { getStorage } from "utils-react";
import { ref } from "vue";

import List from "./List.vue";
import Modal from "./Modal.vue";

const isOpen = ref(false);

const handleOpenModal = () => {
  isOpen.value = !isOpen.value;
};

const alarms = ref(getStorage("alarms"));

const handleUpdateAlarms = () => {
  alarms.value = getStorage("alarms");
};
</script>

<template>
  <div class="window-width mx-auto flex flex-col gap-5">
    <span class="text-lg">Alarmes</span>

    <div class="flex flex-col items-center justify-center gap-5">
      <List :alarms="alarms" :handle-update-alarms="handleUpdateAlarms" />
      <button class="btn" @click="handleOpenModal">
        <v-icon name="bi-plus-square" scale="1.6" />
      </button>
    </div>
  </div>

  <Modal
    :is-open="isOpen"
    :handle-open-modal="handleOpenModal"
    :handle-update-alarms="handleUpdateAlarms"
  />
</template>

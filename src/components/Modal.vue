<script setup lang="ts">
import { delay, generateArray, getStorage, setStorage } from "utils-react";
import { ref } from "vue";

import { IAlarmProps } from "../types";
import { daysOfWeek } from "../utils/constants";

const props = defineProps<{
  isOpen: boolean;
  handleOpenModal: () => void;
  handleUpdateAlarms: () => void;
}>();

const hours = generateArray(23);
const minutes = generateArray(59);

const hoursMap = hours.map(item => {
  const tempHours = item < 10 ? "0" + item : item;

  return tempHours;
});

const minutesMap = minutes.map(item => {
  const tempMinutes = item < 10 ? "0" + item : item;

  return tempMinutes;
});

const hourInput = ref("00");
const minuteInput = ref("00");
const occurrenceInput = ref("Diariamente");
const daysSelected = ref<string[]>([]);

console.log(hourInput.value);

const onChange = (e: any, constant: string) => {
  if (constant === "hour") {
    hourInput.value = e.target.value;
  }

  if (constant === "minute") {
    minuteInput.value = e.target.value;
  }

  if (constant === "occurrence") {
    occurrenceInput.value = e.target.value;
  }
};

const handleSelectDay = (day: string) => {
  if (daysSelected.value.includes(day)) {
    const filteredDays = daysSelected.value.filter(item => item !== day);

    daysSelected.value = filteredDays;
  } else {
    daysSelected.value = [...daysSelected.value, day];
  }
};

const handleCreateAlarm = async () => {
  const occurrence =
    occurrenceInput.value === "select"
      ? daysSelected.value
      : occurrenceInput.value;

  const alarm: IAlarmProps = {
    id: Date.now(),
    hour: hourInput.value,
    minute: minuteInput.value,
    isActive: true,
    occurrence,
  };

  const existingAlarms = getStorage("alarms");

  if (existingAlarms) {
    if (
      existingAlarms.find(
        (item: IAlarmProps) =>
          item.hour === alarm.hour && item.minute === alarm.minute,
      )
    ) {
      return alert("Já existe um alarme com esse horário");
    }

    existingAlarms.push(alarm);

    setStorage("alarms", existingAlarms);
  } else {
    setStorage("alarms", [alarm]);
  }

  props.handleOpenModal();
  await delay(200);
  props.handleUpdateAlarms();
};
</script>

<template>
  <div v-if="isOpen" class="modal-overflow" @click="handleOpenModal" />

  <div
    v-if="isOpen"
    class="modal window-width relative flex max-w-[768px] flex-col items-center justify-center gap-6"
  >
    <v-icon
      name="bi-x-circle"
      class="absolute right-2 top-2 cursor-pointer"
      scale="1.5"
      @click="handleOpenModal"
    />
    <h3>Crie um novo alarme</h3>

    <section>
      <span>Horário:</span>
      <div class="flex items-center justify-center gap-2">
        <select @change="onChange($event, 'hour')">
          <option value="00">00</option>
          <option v-for="item of hoursMap" :key="item">
            {{ item }}
          </option>
        </select>
        :
        <select @change="onChange($event, 'minute')">
          <option value="00">00</option>
          <option v-for="item of minutesMap" :key="item">
            {{ item }}
          </option>
        </select>
      </div>
    </section>

    <section class="flex flex-col">
      <span>Repetir:</span>
      <select @change="onChange($event, 'occurrence')">
        <option value="Diariamente">Todos os dias</option>
        <option value="Uma vez">Uma vez</option>
        <option value="select">Selecione os dias</option>
      </select>
    </section>

    <div v-if="occurrenceInput === 'select'" class="flex gap-1">
      <span
        v-for="item of daysOfWeek"
        :key="item.value"
        :class="
          daysSelected.includes(item.value) ? 'bg-blue-400 text-white' : ''
        "
        class="flex h-8 w-8 cursor-pointer items-center justify-center border border-black p-1"
        @click="handleSelectDay(item.value)"
      >
        {{ item.label }}
      </span>
    </div>

    <button class="btn" @click="handleCreateAlarm">Criar Alarme</button>
  </div>
</template>

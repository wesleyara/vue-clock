<script setup lang="ts">
import { delay, getStorage, setStorage } from "utils-react";

import { IAlarmProps } from "../types";
import { readOccurrence } from "../utils";

const props = defineProps<{
  alarms: IAlarmProps[];
  handleUpdateAlarms: () => void;
}>();

const handleActiveAlarm = async (alarm: IAlarmProps) => {
  const allAlarms = getStorage("alarms");
  const currentAlarm = allAlarms.find(
    (item: IAlarmProps) => item.id === alarm.id,
  );

  currentAlarm.isActive = !currentAlarm.isActive;

  const filteredAlarms = allAlarms.filter(
    (item: IAlarmProps) => item.id !== alarm.id,
  );

  const updatedAlarms = [...filteredAlarms, currentAlarm].sort(
    (a: IAlarmProps, b: IAlarmProps) => a.id - b.id,
  );

  setStorage("alarms", updatedAlarms);
  await delay(200);
  props.handleUpdateAlarms();
};
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-5">
    <section
      v-for="item of alarms"
      :key="item.hour + item.minute"
      class="window-width flex items-center justify-between rounded-lg bg-[#ebebeb] p-4"
    >
      <span class="flex flex-col items-start">
        <b class="text-3xl">{{ item.hour }}:{{ item.minute }}</b>
        <span class="text-[12px]">{{ readOccurrence(item.occurrence) }}</span>
      </span>

      <v-icon
        v-if="item.isActive"
        name="bi-toggle-off"
        scale="2.3"
        class="cursor-pointer"
        @click="handleActiveAlarm(item)"
      />
      <v-icon
        v-if="!item.isActive"
        name="bi-toggle-on"
        scale="2.3"
        class="cursor-pointer"
        @click="handleActiveAlarm(item)"
      />
    </section>
  </div>
</template>

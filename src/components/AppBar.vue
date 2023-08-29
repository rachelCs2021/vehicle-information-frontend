<template>
  <v-app-bar color="grey" dark height="80">
    
    <v-app-bar-title class="mr-3 text-black">{{
      $t("main.title")
    }}</v-app-bar-title>

    <template #prepend>
      <v-img :src="logo" :width="80" />
    </template>

    <v-spacer />

    <span v-text="blessByTime()" class="mx-4 text-black font-weight-medium" />

    <template #extension>
      <slot name="tabs" />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { blessByTime } from "../utils";

defineProps({
  logo: String,
});
</script>

<style>
div.v-toolbar__extension {
  background-color: rgb(53, 45, 45);
  /* color: #c9cbce; */
}
</style>

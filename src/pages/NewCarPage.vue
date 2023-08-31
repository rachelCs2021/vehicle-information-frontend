<template>
  <div class="py-10" />
  <v-container class="d-flex justify-center">
    <v-card class="w-75">
      <v-card-title>{{ $t("NewCarForm.title") }}</v-card-title>
      <v-row no-gutters>
        <v-col cols="4">
          <v-text-field :label="$t('NewCarForm.carNumber')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('NewCarForm.manufacturer')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('NewCarForm.model')" />
        </v-col>
        <v-col cols="4">
          <v-text-field
            type="date"
            :label="$t('NewCarForm.passedTestOnDate')"
            min="2020-01-31"
            :max="formatDate(oneYearAhead(new Date()))"
            required
          />
          <!--min is arbitrary-->
        </v-col>
      </v-row>
      <v-btn :text="$t('NewCarForm.sendForm')" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { formatDate, oneYearAhead } from "../utils";
</script>

<style scoped></style>

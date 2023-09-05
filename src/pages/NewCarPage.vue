<template>
  <div class="py-10" />
  <v-container class="d-flex justify-center">
    <v-card class="w-75">
      <v-card-title>{{ $t("newCarForm.title") }}</v-card-title>
      <v-row no-gutters>
        <v-col cols="4">
          <v-text-field :label="$t('newCarForm.carNumber')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('newCarForm.manufacturer')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('newCarForm.model')" />
        </v-col>
        <v-col cols="4">
          <v-text-field
            type="date"
            :label="$t('newCarForm.passedTestOnDate')"
            min="2020-01-31"
            :max="formatDate(oneYearAhead(new Date()))"
            required
          />
          <!--min is arbitrary-->
        </v-col>
      </v-row>
      <v-btn :text="$t('newCarForm.sendForm')" />
    </v-card>
  </v-container>
</template>
<script></script>
<script setup lang="ts">
import { formatDate, oneYearAhead } from "../utils";
</script>

<style scoped></style>

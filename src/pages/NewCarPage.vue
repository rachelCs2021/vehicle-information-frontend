<template>
  <v-container class="d-flex mt-10 justify-center">
    <v-card class="w-75 py-5 px-8">
      <v-card-title class="mb-3 font-weight-bold">{{ $t("newCarForm.title") }}</v-card-title>
      <v-row no-gutters>
        <v-col style="max-width: 45%">
          <v-text-field :label="$t('newCarForm.carNumber')" />
          <v-text-field :label="$t('newCarForm.manufacturer')" />
          <v-text-field :label="$t('newCarForm.model')" />
          <v-text-field
            required
            type="date"
            min="2020-01-31"
            :label="$t('newCarForm.passedTestOnDate')"
            :max="formatDate(oneYearAhead(new Date()))"
          />
          <!--min is arbitrary-->
        </v-col>
        <v-col>
          <v-img :src="carPhoto" :max-width="500" class="mx-auto" />
        </v-col>
      </v-row>
      <v-btn :text="$t('newCarForm.addCar')" prepend-icon="mdi-plus" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { formatDate, oneYearAhead } from "../utils";
import { carPhoto } from "../assets";
</script>

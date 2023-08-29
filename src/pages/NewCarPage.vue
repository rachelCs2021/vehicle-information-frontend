<template>
  <div class="py-10" />
  <v-container class="d-flex justify-center">
    <v-card class="w-75">
      <v-card-title>{{ $t("AddNewCar.title") }}</v-card-title>
      <v-row no-gutters>
        <v-col cols="4">
          <v-text-field :label="$t('AddNewCar.carNum')" />
        </v-col>
        <v-col cols="4">
          <v-text-field :label="$t('AddNewCar.manufacturer')" />
        </v-col>
        <v-col>
          <v-text-field :label="$t('AddNewCar.model')" />
        </v-col>
        <v-col>
          <v-text-field :label="$t('AddNewCar.PassedTestOnDate')" />
        </v-col>
        <v-col> </v-col>
        <v-col> </v-col>
      </v-row>
      <v-btn text="שלח טופס" />
    </v-card>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped>
.v-text-field {
  margin-right: 16px;
}
</style>

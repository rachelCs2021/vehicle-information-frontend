<template>
  <v-container>
    <div class="d-flex mt-3">
      <searchInput
        style="max-width: 20%"
        v-model="state.searchInput"
        prepend-inner-icon="mdi-magnify"
        :label="$t('main.searchBy')"
        @keyup.enter="searchVehicleByNumber"
      />
      <v-btn
        height="43"
        color="grey-lighten-1"
        class="mr-3 py-3"
        :text="$t('main.search')"
        @click="searchVehicleByNumber"
      />
    </div>
    <DataTable
      :items="state.carArray"
      :page="state.page"
      :headers="tableHeaders"
      :itemsPerPage="state.itemsPerPage"
      :itemsPerPageText="itemsPerPageText"
      :pageLength="Math.ceil(state.totalItems / state.itemsPerPage)"
      class="overflow-y-auto elevation-15 mt-2 mb-5"
      @on-change-page="onPage($event)"
      @on-select-item="onSelectItem($event)"
      @on-car-editing="editCarDetails"
      @on-car-deletion="carDeletion"
    />

    <v-dialog
      persistent
      v-model="state.editDialog"
      max-width="600px"
      class="pa-5"
    >
      <v-card>
        <v-card-title class="text-h5 mt-3 mr-6">{{
          $t("table.editCarTitle")
        }}</v-card-title>

        <v-card-text>
          <v-container class="px-0">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :label="$t('newCarForm.carNumber')"
                  v-model="state.carModel.carNumber"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :label="$t('newCarForm.manufacturer')"
                  v-model="state.carModel.manufacturer"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :label="$t('newCarForm.model')"
                  v-model="state.carModel.model"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  type="date"
                  :label="$t('newCarForm.passedTestOnDate')"
                  min="2020-01-31"
                  :max="formatDate(oneYearAhead(new Date()))"
                  v-model="state.carModel.passedTestOnDate"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="px-3">
          <second-button @click="closeEditDialog">{{
            $t("main.cancel")
          }}</second-button>
          <v-spacer />

          <v-btn class="ml-5" @click="saveChanges">{{ $t("main.save") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="state.deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center my-6">{{
          $t("table.deletionConfirmation")
        }}</v-card-title>

        <div class="d-flex justify-center">
          <second-button @click="closeDeleteDialog">{{
            $t("main.cancel")
          }}</second-button>
          <v-btn class="ml-5" @click="deleteItemConfirm">{{
            $t("main.confirm")
          }}</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>

  <v-snackbar
    v-model="state.snackbar"
    :timeout="state.timeout"
    :color="state.isEditCar ? 'white' : ''"
  >
    {{
      $t(
        state.isEditCar
          ? "table.updatedSuccessfully"
          : "table.deletedSuccessfully",
        {
          carNumber: state.carModel.carNumber,
        }
      )
    }}

    <template v-slot:actions>
      <v-btn
        color="red"
        variant="text"
        class="mr-0 mb-0 mt-3"
        @click="state.snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
interface State {
  carArray: CarModel[];
  page: number;
  skip: number;
  totalItems: number;
  itemsPerPage: number;
  searchInput: string;
  deleteDialog: boolean;
  editDialog: boolean;
  isEditCar: boolean;
  carModel: CarModel;
  snackbar: boolean;
  timeout: number;
}
</script>

<script setup lang="ts">
import { reactive, computed, onBeforeMount } from "vue";
import { formatDate, oneYearAhead } from "../utils";
import { DataTable } from "../components";
import { tableHeaders } from "../utils";
import { getAllVehicles, getAllVehiclesCount } from "../api/core";
import axios from "axios";
import CarModel from "../types/CarModel";
const state: State = reactive({
  carArray: [],
  page: 1,
  skip: 0,
  totalItems: 0,
  itemsPerPage: 10,
  searchInput: "",
  deleteDialog: false,
  editDialog: false,
  isEditCar: false,
  carModel: {
    carNumber: "",
    manufacturer: "",
    model: "",
    passedTestOnDate: "",
  },
  snackbar: false,
  timeout: 2000,
});

onBeforeMount(() => {
  loadVehiclesData();
});

const itemsPerPageText = computed<string>(() => {
  return `${(state.skip + 1).toLocaleString()}-${(
    state.carArray.length + state.skip
  ).toLocaleString()} מתוך ${state.totalItems.toLocaleString()}`;
});

const loadVehiclesData = async () => {
  try {
    state.skip = (state.page - 1) * state.itemsPerPage;
    state.carArray = await getAllVehicles(state.itemsPerPage, state.skip);
    console.log('car', state.carArray.length);
    
    const getVehiclesCount = await getAllVehiclesCount()
    state.totalItems = getVehiclesCount;
  } catch (err) {
    throw err;
  }
};

const searchVehicleByNumber = () => {
  console.log("search car number", state.searchInput);

  // getVehicle(/:vehicleNumber)
};

const editCarDetails = (item: CarModel) => {
  state.isEditCar = true;
  state.carModel = item;
  state.editDialog = true;
};

const saveChanges = () => {
  // update the carModel object
  state.snackbar = true;
  state.editDialog = false;
};

const closeEditDialog = () => {
  state.editDialog = false;
};

const carDeletion = (item: CarModel) => {
  state.isEditCar = false;
  state.carModel = item;
  state.deleteDialog = true;
};

const closeDeleteDialog = () => {
  state.deleteDialog = false;
};

const deleteItemConfirm = () => {
  // remove the car object
  state.deleteDialog = false;
  state.snackbar = true;
};

function onSelectItem(numItems: number) {
  state.itemsPerPage = numItems;
  loadVehiclesData();
}

function onPage(page: number) {
  state.page = page;
  loadVehiclesData();
}
</script>

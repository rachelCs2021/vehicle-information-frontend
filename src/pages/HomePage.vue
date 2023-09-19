<template>
  <v-container>
    <div class="d-flex mt-3">
      <searchInput
        style="max-width: 20%"
        v-model="state.searchInput"
        prepend-inner-icon="mdi-magnify"
        :label="$t('main.searchBy')"
        v-debounce:800ms="getVehiclesBySearch"
      />
    </div>
    <div v-if="state.loadingData" class="d-flex justify-center">
      <v-progress-circular :size="50" indeterminate />
    </div>

    <DataTable
      v-else-if="state.carArray?.length > 0 && !state.loadingData"
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

    <div v-else>
      <v-img width="40vh" class="mx-auto" :src="noDataImage" />
      <h3 class="text-center pt-6">{{ $t("main.noSearchResults") }}</h3>
    </div>

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
                  v-model="state.carModel.passedTestOnDate"
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
  getCarData: CarDataResults;
  loadingData: boolean;
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
import axios from "axios";
import { noDataImage } from "../assets";
import { DataTable } from "../components";
import { reactive, computed, onBeforeMount } from "vue";
import {
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
} from "../core/api";
import { CarModel, CarDataResults } from "../types/CarModel";
import { tableHeaders, formatDate, oneYearAhead } from "../utils";

const state: State = reactive({
  carArray: [],
  getCarData: [],
  loadingData: false,
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
    state.loadingData = true;
    state.skip = (state.page - 1) * state.itemsPerPage;
    state.getCarData = await getAllVehicles(state.itemsPerPage, state.skip);
    state.carArray = state.getCarData.vehicles;
    state.totalItems = state.getCarData.count;

    fixDateDisplay(state.carArray);
  } catch (err) {
    throw err;
  } finally {
    state.loadingData = false;
  }
};

const getVehiclesBySearch = async () => {
  state.skip = (state.page - 1) * state.itemsPerPage;

  if (state.searchInput.length > 0) {
    state.page = 1;
  }
  state.getCarData = await getVehicle(
    state.searchInput,
    state.itemsPerPage,
    state.skip
  );
  state.carArray = state.getCarData.vehicles;
  state.totalItems = state.getCarData.count;
  fixDateDisplay(state.carArray);
};

const fixDateDisplay = (array: CarModel[]) => {
  for (const vehicle of array) {
    vehicle.passedTestOnDate = vehicle.passedTestOnDate
      .split("-")
      .reverse()
      .join("/");
  }
};

const editCarDetails = (item: CarModel) => {
  state.isEditCar = true;
  item.passedTestOnDate = item.passedTestOnDate.split("/").reverse().join("-");
  state.carModel = item;
  // state.carModel.passedTestOnDate = state.carModel.passedTestOnDate.split("/").reverse().join("-");
  state.editDialog = true;
};

const saveChanges = async () => {
  const update = await updateVehicle(state.carModel);
  if(update) {
    state.snackbar = true;
    state.editDialog = false;
  }
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

const deleteItemConfirm = async () => {
  // remove the car object
  const deleteCar = await deleteVehicle(state.carModel);
  console.log("delete", deleteCar);

  state.deleteDialog = false;
  state.snackbar = true;
};

function onSelectItem(numItems: number) {
  state.itemsPerPage = numItems;
  if (state.searchInput.length) {
    getVehiclesBySearch();
  } else {
    loadVehiclesData();
  }
}

function onPage(page: number) {
  state.page = page;
  if (state.searchInput.length) {
    getVehiclesBySearch();
  } else {
    loadVehiclesData();
  }
}
</script>

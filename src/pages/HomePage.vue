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

    <!-- reminder vehicles test -->
    <v-dialog width="auto" class="pa-5" v-model="state.reminderDialog">
      <v-card>
        <v-card-title class="text-h5 mt-3 mr-6 pb-0">{{
          $t("table.reminderDialogTitle")
        }}</v-card-title>
        <v-card-text>{{ $t("table.reminderDialogText") }}</v-card-text>

        <v-data-table
          fixed-header
          style="width: 93%"
          :items="state.testReminderArray"
          :headers="tableReminderHeaders"
          class="overflow-y-auto elevation-15 mx-5 mt-2 mb-5"
        >
          <template v-slot:[`item.carNumber`]="{ item }">
            <input
              v-maska
              style="max-width: 100px"
              :value="item.raw.carNumber"
              :data-maska="
                item.raw.carNumber.length === 7 ? '##-###-##' : '###-##-###'
              "
            />
          </template>
          <template v-slot:bottom>
            <div></div>
          </template>
        </v-data-table>

        <v-card-actions>
          <v-btn
            block
            color="black"
            :text="$t('main.close')"
            @click="state.reminderDialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="state.loadingData">
      <div class="d-flex justify-center">
        <v-progress-circular :size="50" indeterminate />
      </div>
      <div v-text="$t('main.loading')" class="mt-5 text-center text-xl-h4" />
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
      @on-car-editing="editCarDetails"
      @on-car-deletion="carDeletion"
      @on-change-page="onPage($event)"
      @on-select-item="onSelectItem($event)"
    />

    <div v-else>
      <v-img width="40vh" class="mx-auto" :src="noDataImage" />
      <h3 class="text-center pt-6">{{ $t("main.noSearchResults") }}</h3>
    </div>

    <!-- edit vehicle dialog -->
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

          <v-btn
            class="ml-5 bg-red-lighten-1"
            color="white"
            @click="saveChanges"
            >{{ $t("main.save") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- delete vehicle dialog -->
    <v-dialog persistent v-model="state.deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center my-6">{{
          $t("table.deletionConfirmation")
        }}</v-card-title>

        <div class="d-flex justify-center">
          <second-button @click="closeDeleteDialog">{{
            $t("main.cancel")
          }}</second-button>
          <v-btn
            class="ml-5 mr-5"
            :text="$t('main.confirm')"
            @click="deleteItemConfirm"
          />
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
  testReminderArray: object[];
  loadingData: boolean;
  page: number;
  skip: number;
  totalItems: number;
  itemsPerPage: number;
  searchInput: string;
  reminderDialog: boolean;
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
import { vMaska } from "maska";
import { useI18n } from "vue-i18n";
import { noDataImage } from "../assets";
import { DataTable } from "../components";
import { reactive, computed, onBeforeMount } from "vue";
import {
  getVehiclesTestReminder,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
} from "../core/api";
import { CarModel, CarDataResults } from "../types/CarModel";
import {
  tableHeaders,
  tableReminderHeaders,
  formatDate,
  oneYearAhead,
} from "../utils";

const { t } = useI18n();

const state: State = reactive({
  carArray: [],
  getCarData: { count: 0, vehicles: [] },
  testReminderArray: [],
  loadingData: false,
  page: 1,
  skip: 0,
  totalItems: 0,
  itemsPerPage: 10,
  searchInput: "",
  reminderDialog: false,
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
  vehiclesReminder();
});

const itemsPerPageText = computed<string>(() => {
  return `${(state.skip + 1).toLocaleString()}-${(
    state.carArray.length + state.skip
  ).toLocaleString()} מתוך ${state.totalItems.toLocaleString()}`;
});

const vehiclesReminder = async () => {
  const data = await getVehiclesTestReminder();

  if (data.length) {
    fixDateDisplay(data);
    state.testReminderArray = data;
    state.reminderDialog = true;
  }
};

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
    const inputDate = new Date(vehicle.passedTestOnDate);
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const year = inputDate.getFullYear();

    vehicle.passedTestOnDate = `${day}/${month}/${year}`;
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
  if (update) {
    state.carModel.passedTestOnDate = state.carModel.passedTestOnDate
      .split("-")
      .reverse()
      .join("/");
    state.snackbar = true;
    state.editDialog = false;
  }
};

const closeEditDialog = () => {
  state.editDialog = false;
  state.carModel.passedTestOnDate = state.carModel.passedTestOnDate
    .split("-")
    .reverse()
    .join("/");
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
  const deleteCar = await deleteVehicle(state.carModel);
  if (deleteCar.messsage) {
    state.deleteDialog = false;
    state.snackbar = true;
  }
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
../layouts

<template>
  <v-container>
    <DataTable
      :items="carArray"
      :page="state.page"
      :headers="tableHeaders"
      :itemsPerPage="state.itemsPerPage"
      :itemsPerPageText="itemsPerPageText"
      :pageLength="Math.ceil(state.totalItems / state.itemsPerPage)"
      class="overflow-y-auto elevation-15"
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
                  :label="$t('NewCarForm.carNum')"
                  v-model="state.carModel.carNumber"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :label="$t('NewCarForm.manufacturer')"
                  v-model="state.carModel.manufacturer"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  :label="$t('NewCarForm.model')"
                  v-model="state.carModel.model"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  :label="$t('NewCarForm.PassedTestOnDate')"
                  v-model="state.carModel.passedTestOnDate"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="px-3">
          <v-btn
            variant="outlined"
            color="red-lighten-1"
            @click="closeEditDialog"
            >{{ $t("main.cancel") }}</v-btn
          >
          <v-spacer />

          <v-btn
            color="white"
            class="bg-red-lighten-1 ml-5"
            variant="text"
            @click="saveChanges"
            >{{ $t("main.save") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="state.deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center my-6">{{
          $t("table.deletionConfirmation")
        }}</v-card-title>

        <div class="d-flex justify-center">
          <v-btn
            variant="outlined"
            color="red-lighten-1"
            @click="closeDeleteDialog"
            >{{ $t("main.cancel") }}</v-btn
          >
          <v-btn
            color="white"
            variant="text"
            class="bg-red-lighten-1 ml-5"
            @click="deleteItemConfirm"
            >{{ $t("main.confirm") }}</v-btn
          >
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
  page: number;
  skip: number;
  totalItems: number;
  itemsPerPage: number;
  deleteDialog: boolean;
  editDialog: boolean;
  isEditCar: boolean;
  carModel: CarModel;
  snackbar: boolean;
  timeout: number;
}

interface CarModel {
  carNumber: string;
  manufacturer: string;
  model: string;
  passedTestOnDate: string;
}
</script>

<script setup lang="ts">
import { reactive, computed, onBeforeMount } from "vue";
import { DataTable } from "../components";
import { tableHeaders } from "../utils";

const state: State = reactive({
  page: 1,
  skip: 0,
  totalItems: 0,
  itemsPerPage: 10,
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

const carArray: CarModel[] = [
  {
    carNumber: "1234567",
    manufacturer: "טויוטה",
    model: "קאמרי",
    passedTestOnDate: "2023-08-29",
  },
  {
    carNumber: "1478523",
    manufacturer: "פורד",
    model: "מוסטנג",
    passedTestOnDate: "2023-08-30",
  },
  {
    carNumber: "7896541",
    manufacturer: "הונדה",
    model: "סיביק",
    passedTestOnDate: "2023-08-31",
  },
  {
    carNumber: "3214569",
    manufacturer: "מרצדס",
    model: "C-Class",
    passedTestOnDate: "2023-09-01",
  },
  {
    carNumber: "9632587",
    manufacturer: "ב.מ.וו",
    model: "X5",
    passedTestOnDate: "2023-09-02",
  },
  {
    carNumber: "5647852",
    manufacturer: "אאודי",
    model: "A4",
    passedTestOnDate: "2023-09-03",
  },
  {
    carNumber: "125488",
    manufacturer: "פיאט",
    model: "500",
    passedTestOnDate: "2023-09-04",
  },
  {
    carNumber: "88888888",
    manufacturer: "ניסאן",
    model: "קשקאי",
    passedTestOnDate: "2023-09-05",
  },
  {
    carNumber: "5555555",
    manufacturer: "סובארו",
    model: "אימפרזה",
    passedTestOnDate: "2023-09-06",
  },
  {
    carNumber: "562333333",
    manufacturer: "מיצובישי",
    model: "Outlander",
    passedTestOnDate: "2023-09-07",
  },
];

onBeforeMount(() => {
  loadCarsData();
});

const loadCarsData = () => {
  state.totalItems = carArray.length;
};

const itemsPerPageText = computed<string>(() => {
  return `${(state.skip + 1).toLocaleString()}-${(
    carArray.length + state.skip
  ).toLocaleString()} מתוך ${state.totalItems.toLocaleString()}`;
});

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
  loadCarsData();
}

function onPage(page: number) {
  state.page = page;
  loadCarsData();
}
</script>

<style scoped></style>

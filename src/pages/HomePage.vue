<template>
  <v-container>
    <DataTable
      :items="carArray"
      :page="state.page"
      :headers="tableHeaders"
      class="overflow-y-auto elevation-10"
      :itemsPerPage="state.itemsPerPage"
      :itemsPerPageText="itemsPerPageText"
      :pageLength="Math.ceil(state.totalItems / state.itemsPerPage)"
      @on-change-page="onPage($event)"
      @on-select-item="onSelectItem($event)"
      @on-edit-car="editCarDetails"
      @on-car-delete="deleteCar"
    />

    <v-dialog v-model="state.editDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">{{
          $t("table.editCarTitle")
        }}</v-card-title>

        <!-- <v-card-text>
          <v-container> 

          </v-container>
        </v-card-text> -->

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeEditDialog"
            >{{ $t("main.cancel") }}</v-btn
          >
          <v-btn color="blue-darken-1" variant="text" @click="saveChanges">{{
            $t("main.save")
          }}</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="state.deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">{{
          $t("table.deletionConfirmation")
        }}</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDeleteDialog"
            >{{ $t("main.cancel") }}</v-btn
          >
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="deleteItemConfirm"
            >{{ $t("main.confirm") }}</v-btn
          >
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
interface State {
  page: number;
  skip: number;
  totalItems: number;
  itemsPerPage: number;
  deleteDialog: boolean;
  editDialog: boolean;
  selectedCar: any;
}

interface CarArray {
  carNumber: number;
  manufacturer: string;
  model: string;
  testDate: string;
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
  selectedCar: "",
});

const carArray: CarArray[] = [
  {
    carNumber: 1234567,
    manufacturer: 'טויוטה',
    model: 'קאמרי',
    testDate: '2023-08-29'
  },
  {
    carNumber: 1478523,
    manufacturer: 'פורד',
    model: 'מוסטנג',
    testDate: '2023-08-30'
  },
  {
    carNumber: 7896541,
    manufacturer: 'הונדה',
    model: 'סיביק',
    testDate: '2023-08-31'
  },
  {
    carNumber: 3214569,
    manufacturer: 'מרצדס',
    model: 'C-Class',
    testDate: '2023-09-01'
  },
  {
    carNumber: 9632587,
    manufacturer: 'ב.מ.וו',
    model: 'X5',
    testDate: '2023-09-02'
  },
  {
    carNumber: 5647852,
    manufacturer: 'אאודי',
    model: 'A4',
    testDate: '2023-09-03'
  },
  {
    carNumber: 125488,
    manufacturer: 'פיאט',
    model: '500',
    testDate: '2023-09-04'
  },
  {
    carNumber: 88888888,
    manufacturer: 'ניסאן',
    model: 'קשקאי',
    testDate: '2023-09-05'
  },
  {
    carNumber: 5555555,
    manufacturer: 'סובארו',
    model: 'אימפרזה',
    testDate: '2023-09-06'
  },
  {
    carNumber: 562333333,
    manufacturer: 'מיצובישי',
    model: 'Outlander',
    testDate: '2023-09-07'
  }
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

const editCarDetails = (item: object) => {
  console.log("edit", item);
  state.selectedCar = item;
  state.editDialog = true;
};

const saveChanges = () => {
  console.log("save");
  state.editDialog = false;
};

const closeEditDialog = () => {
  console.log("close edit dialog");
  state.editDialog = false;
};

const deleteCar = (item: object) => {
  console.log("delete", item);
  state.selectedCar = item;
  state.deleteDialog = true;
};

const closeDeleteDialog = () => {
  console.log("close delete dialog");

  state.deleteDialog = false;
};

const deleteItemConfirm = () => {
  console.log("delet car", state.selectedCar);
  state.deleteDialog = false;
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

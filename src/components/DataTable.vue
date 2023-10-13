<template>
  <v-data-table
    fixed-header
    :items="items"
    class="mx-auto"
    v-bind="$attrs"
    :headers="headers"
    style="width: 95%"
    :items-per-page="-1"
  >
    <template #bottom>
      <div class="d-flex justify-end">
        <Pagination
          :page="page"
          :totalVisible="4"
          :pageLength="pageLength"
          :itemsPerPage="itemsPerPage"
          :itemsPerPageText="itemsPerPageText"
          @on-select-item="$emit('on-select-item', $event)"
          @on-change-page="$emit('on-change-page', $event)"
        />
      </div>
    </template>

    <template v-slot:[`item.carNumber`]="{ item }">
      <input
        style="max-width: 100px"
        :value="item.raw.carNumber"
        v-maska:[carNumberMask]
      />
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        size="small"
        class="me-2"
        icon="mdi-pencil"
        @click="$emit('on-car-editing', item.raw)"
      />
      <v-icon
        size="small"
        icon="mdi-delete"
        @click="$emit('on-car-deletion', item.raw)"
      />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { vMaska } from "maska";
import { reactive } from "vue";
import { Pagination } from "../components";

interface Props {
  items: object[];
  headers: object[];
  page: number;
  pageLength: number;
  itemsPerPage: number;
  itemsPerPageText: string;
}

defineProps<Props>();

const carNumberMask = reactive({
  mask: ["##-###-##", "###-##-###"],
});
</script>

<style>
tbody tr:nth-of-type(odd) > td {
  background-color: #ced3da !important;
}
table th {
  width: 3% !important;
  font-weight: bolder !important;
  font-size: 1.1rem !important;
  color: #898c90 !important;
  padding: 0 10px !important;
}
table td {
  font-size: 1rem !important;
  color: #2f373b !important;
}
</style>

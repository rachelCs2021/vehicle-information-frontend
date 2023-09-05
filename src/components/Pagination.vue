<template>
  <div class="d-flex justify-space-between align-center" style="gap: 10px">
    <div class="d-flex mt-6" style="gap: 5px">
      <p class="mt-2" v-text="$t('table.itemsPerPage')" />
      <v-select
        :items="items"
        :value="itemsPerPage"
        class="selectWidth"
        @update:modelValue="$emit('on-select-item', $event)"
      />
    </div>
    <div>
      <p class="pr-5" v-text="itemsPerPageText" />
    </div>
    <v-pagination
      :model-value="page"
      :length="pageLength"
      :total-visible="totalVisible"
      @update:modelValue="$emit('on-change-page', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";

  defineProps({
    page: Number,
    pageLength: Number,
    totalVisible: Number,
    itemsPerPage: Number,
    itemsPerPageText: String,
  });

  const items = reactive<number[]>([5, 10, 20]);
</script>

<style scoped>
  .paginationWidth {
    max-width: 300px;
  }
  .selectWidth {
    max-width: 90px;
  }
</style>

<template>
  <AppBar :logo="logo">
    <template #tabs>
      <v-tabs slider-color="red-darken-2" color="white">
        <v-tab
          v-for="(tab, index) in state.tabsItems"
          :key="index"
          :to="tab.to"
          class="text-white"
        >
          <v-icon :icon="tab.icon" />
          {{ tab.title }}
        </v-tab>
      </v-tabs>
    </template>
  </AppBar>
  <default-view />
</template>

<script lang="ts">
interface State {
  tabsItems: Tab[];
}
interface Tab {
  title: string;
  to: string;
  icon: string;
}
</script>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import { AppBar } from ".";
import { logo } from "../assets";
import DefaultView from "./DefaultView";
const { t } = useI18n();
const state: State = reactive({
  tabsItems: [
    {
      title: t("navigation.homePage"),
      to: "/home",
      icon: "mdi-home",
    },
    {
      title: t("navigation.newCar"),
      to: "/newCar",
      icon: "mdi-car",
    },
  ],
});
</script>

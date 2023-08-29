<template>
    <AppBar :logo="logo" >
      <template #tabs>
        <v-tabs slider-color="warning">
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
    <RouterView />
  </template>
  
  <script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { reactive } from "vue"
  import { AppBar } from "../components";
  import { logo } from "../assets"
  
  const { t } = useI18n();
  
  const state = reactive({
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
        }
      ],
    });
  </script>
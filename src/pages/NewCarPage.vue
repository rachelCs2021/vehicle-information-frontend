<template>
  <v-container class="d-flex mt-10 justify-center">
    <v-card class="w-75 py-5 px-8">
      <v-form>
        <v-card-title class="mb-3 font-weight-bold">{{
          $t("newCarForm.title")
        }}</v-card-title>
        <v-row no-gutters>
          <v-col style="max-width: 45%">
            <Form ref="formValidation">
              <Field
                name="carNumber"
                rules="required|maxLength:11|minLength:9"
                v-slot="{ field, errorMessage }"
              >
                <v-text-field
                  required
                  v-model="state.carNumber"
                  :label="$t('newCarForm.carNumber')"
                  v-maska:[carNumberMask]
                  v-bind="field"
                  :error-messages="errorMessage"
                />
              </Field>
              <Field
                name="manufacturer"
                rules="required|maxLength:13"
                v-slot="{ field, errorMessage }"
              >
                <v-text-field
                  required
                  v-model="state.manufacturer"
                  :label="$t('newCarForm.manufacturer')"
                  v-bind="field"
                  :error-messages="errorMessage"
                />
              </Field>
              <Field
                name="model"
                rules="required|maxLength:13"
                v-slot="{ field, errorMessage }"
              >
                <v-text-field
                  required
                  v-model="state.model"
                  :label="$t('newCarForm.model')"
                  v-bind="field"
                  :error-messages="errorMessage"
                />
              </Field>
              <Field
                name="passedTestOnDate"
                rules="required"
                v-slot="{ field, errorMessage }"
              >
                <v-text-field
                  required
                  type="date"
                  v-model="state.passedTestOnDate"
                  v-bind="field"
                  :error-messages="errorMessage"
                  min="2020-01-31"
                  :label="$t('newCarForm.passedTestOnDate')"
                  :max="formatDate(oneYearAhead(new Date()))"
                />
              </Field>
            </Form>
            <!--min is arbitrary-->
          </v-col>
          <v-col>
            <v-img :src="carImage" :max-width="500" class="mx-auto" />
          </v-col>
        </v-row>
        <v-btn
          :text="$t('newCarForm.addCar')"
          prepend-icon="mdi-plus"
          :onclick="onSendForm"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { formatDate, oneYearAhead } from "../utils";
import { carImage } from "../assets";
import { createVehicle } from "../core/api";
import { CarModel } from "@/types/CarModel";
import { Field, Form } from "vee-validate";
import router from "../router";
import "../utils/rules";
import { vMaska } from "maska";
const state: CarModel = reactive({
  carNumber: "",
  manufacturer: "",
  model: "",
  passedTestOnDate: "",
});
const formValidation = ref();
const carNumberMask = reactive({
  mask: ["##-###-##", "###-##-###"],
});
const onSendForm = () => {
  formValidation.value.validate().then((res) => {
    if (res.valid) {
      createVehicle(state);
      router.push("/");
    }
  });
};
</script>

<template>
  <v-container class="d-flex mt-3 justify-center">
    <v-card class="w-75 py-5 pl-7 pr-4">
      <div class="d-flex justify-space-around">
        <div>
          <v-card-title class="mb-3 font-weight-bold">{{
            $t("newCarForm.title")
          }}</v-card-title>
          <Form ref="formValidation" style="width: 300px">
            <Field
              name="carNumber"
              v-slot="{ field, errorMessage }"
              rules="required|maxLength:11|minLength:9"
            >
              <v-text-field
                required
                v-bind="field"
                v-maska:[carNumberMask]
                v-model="state.carModel.carNumber"
                :error-messages="errorMessage"
                :label="$t('newCarForm.carNumber')"
              />
            </Field>
            <Field
              name="manufacturer"
              rules="required|maxLength:13"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                required
                v-bind="field"
                v-model="state.carModel.manufacturer"
                :error-messages="errorMessage"
                :label="$t('newCarForm.manufacturer')"
              />
            </Field>
            <Field
              name="model"
              rules="required|maxLength:13"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                required
                v-bind="field"
                v-model="state.carModel.model"
                :label="$t('newCarForm.model')"
                :error-messages="errorMessage"
              />
            </Field>
            <Field
              rules="required"
              name="passedTestOnDate"
              v-slot="{ field, errorMessage }"
            >
              <v-text-field
                required
                type="date"
                v-bind="field"
                min="2020-01-31"
                :error-messages="errorMessage"
                v-model="state.carModel.passedTestOnDate"
                :label="$t('newCarForm.passedTestOnDate')"
                :max="formatDate(oneYearAhead(new Date()))"
              />
            </Field>
          </Form>
          <v-btn
            class="mr-5"
            :text="$t('newCarForm.addCar')"
            prepend-icon="mdi-plus"
            :onclick="onSendForm"
          />
        </div>

        <div style="width: 500px">
          <v-img :src="carImage" />
        </div>
      </div>
    </v-card>

    <v-dialog persistent v-model="state.addVehicleDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center my-6">{{
          $t("newCarForm.addVehicleDialog")
        }}</v-card-title>

        <div class="d-flex justify-center">
          <v-btn
            class="ml-5 mr-5"
            :text="$t('main.confirm')"
            @click="router.push('/')"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import "../utils/rules";
import router from "../router";
import { vMaska } from "maska";
import { reactive, ref } from "vue";
import { carImage } from "../assets";
import { CarModel } from "@/types/CarModel";
import { createVehicle } from "../core/api";
import { Field, Form } from "vee-validate";
import { formatDate, oneYearAhead } from "../utils";

interface Res {
  errors: object;
  results: object;
  valid: boolean;
}

interface State {
  addVehicleDialog: boolean;
  carModel: CarModel;
}

const state: State = reactive({
  carModel: {
    carNumber: "",
    manufacturer: "",
    model: "",
    passedTestOnDate: "",
  },
  addVehicleDialog: false,
});

const formValidation = ref();
const carNumberMask = reactive({
  mask: ["##-###-##", "###-##-###"],
});

const onSendForm = () => {
  formValidation.value.validate().then((res: Res) => {
    if (res.valid) {
      createVehicle(state.carModel);
      state.addVehicleDialog = true;
    }
  });
};
</script>

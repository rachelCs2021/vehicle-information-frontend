<template>
  <v-container fluid class="fill-height login-container">
    <div class="d-flex mx-auto">
      <v-card class="elevation-12" :width="900" :height="500">
        <div class="d-flex justify-space-around">
          <div>
            <v-img :src="logo" :max-width="310" :height="158" />

            <div>
              <v-form ref="formRef" style="width: 300px">
                <v-text-field
                  required
                  v-model="state.userName"
                  :rules="state.userNameRules"
                  :label="$t('login.userName')"
                />
                <v-text-field
                  required
                  type="password"
                  v-model="state.password"
                  :rules="state.passwordRules"
                  :label="$t('login.password')"
                />
                <v-btn
                  width="87%"
                  color="red-lighten-1"
                  class="text--white mr-5 mt-3"
                  :text="$t('main.login')"
                  @click="login"
                />
              </v-form>
            </div>
          </div>

          <div class="mt-15" style="width: 522px">
            <v-img :src="loginImage" />
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import router from "../router";
import { useI18n } from "vue-i18n";
import { reactive, ref } from "vue";
import { logo, loginImage } from "../assets";

const { t } = useI18n();

const formRef = ref();

const state = reactive({
  userName: "",
  password: "",
  userNameRules: [(v: string) => !!v || t("rules.required")],
  passwordRules: [(v: string) => !!v || t("rules.required")],
});

const login = async () => {
  const { valid } = await formRef.value.validate();
  console.log("valid", valid);
  console.log("user", state.userName, state.password);
  if (valid) {
    router.push("/");
  }
};
</script>

<style scoped>
.login-container {
  background: #f8f6f6 linear-gradient(#c9cbce 38%, #f8f6f6 18%);
  background-repeat: no-repeat;
}
</style>
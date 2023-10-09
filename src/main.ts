import App from "./App.vue";
import i18n from "./plugins/i18n";
import { createApp } from "vue";
import { vue3Debounce } from 'vue-debounce'
import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.use(i18n);
app.directive('debounce', vue3Debounce({ lock: true }))

registerPlugins(app);

app.mount("#app");

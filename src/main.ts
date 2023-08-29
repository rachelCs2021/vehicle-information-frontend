import App from "./App.vue";
import i18n from "./plugins/i18n";
import { createApp } from "vue";
import { registerPlugins } from "@/plugins";

const app = createApp(App);

app.use(i18n);

registerPlugins(app);

app.mount("#app");

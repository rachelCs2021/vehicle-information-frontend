/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { he, en } from "vuetify/locale";
import * as labs from "vuetify/labs/components";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    ...labs,
  },
  theme: {
    themes: {
      light: {
        colors: {
          grey: "#c9cbce",
          secondary: "#5CBBF6",
        },
      },
    },
  },
  locale: {
    locale: "he",
    fallback: "en",
    messages: { he, en },
  },
  defaults: {
    VBtn: { class: "mr-4 mb-4", color: "red-darken-1" },
    VTextField: {
      variant: "solo-inverted",
      density: "comfortable",
      style: "max-width: 75%",
      class: "mr-4",
      clearable: true,
    },
  },
});

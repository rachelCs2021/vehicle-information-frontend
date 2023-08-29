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

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#1867C0",
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
      variant: "solo-filled",
      density: "comfortable",
      riple: true,
      style: "width: 250px",
    },
  },
});

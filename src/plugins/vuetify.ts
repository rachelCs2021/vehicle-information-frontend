// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { he, en } from "vuetify/locale";
import * as labs from "vuetify/labs/components";
import { VBtn } from "vuetify/components/VBtn";
import { VTextField } from "vuetify/lib/components/index.mjs";

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
  aliases: {
    secondButton: VBtn,
    searchInput: VTextField
  },
  defaults: {
    VSelect: { variant: "outlined", density: "comfortable"},
    VBtn: { class: "mb-4", color: "red-lighten-1" },
    secondButton: {
      class: "mr-4 mb-4",
      variant: "outlined",
      color: "red-lighten-1",
    },
    VTextField: {
      variant: "solo-inverted",
      density: "comfortable",
      class: "mx-5 my-2",
      clearable: true,
    },
    searchInput: {
     variant: "outlined",
     density: "compact"
    },
    VCard: {
      elevation: "4",
    },
  },
});

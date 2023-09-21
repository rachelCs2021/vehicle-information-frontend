import { defineRule } from "vee-validate";

import i18n from "../plugins/i18n";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return i18n.global.t("rules.required");
  }

  return true;
});

defineRule("string", (value) => {
  if (!/[^0-9]/.test(value)) {
    return "This field must be character";
  }

  return true;
});

defineRule("number", (value) => {
  if (/[^0-9]/.test(value)) {
    return i18n.global.t("rules.numbers");
  }

  return true;
});

defineRule("negativeOrPositiveNum", (value) => {
  if (!/^[-+]?\d+$|^[-+]?\d+(?:\.\d+)?$/.test(value)) {
    return i18n.global.t("rules.numbers");
  }

  return true;
});

defineRule("email", (value) => {
  // Field is empty, should pass

  if (!value || !value.length) {
    return true;
  } // Check if email

  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return "This field must be a valid email";
  }

  return true;
});

defineRule("minLength", (value, [min]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length < min) {
    return `${i18n.global.t("rules.minChar")} ${min}`;
  }

  return true;
});

defineRule("maxLength", (value, [max]) => {
  if (!value || !value.length) {
    return true;
  }

  if (value.length > max) {
    return `${i18n.global.t("rules.maxChar")} ${max}`;
  }

  return true;
});

defineRule("minMax", (value, [min, max]) => {
  // The field is empty so it should pass

  if (!value || !value.length) {
    return true;
  }

  const numericValue = Number(value);

  if (numericValue < min) {
    return ` ${i18n.global.t("rules.min")} ${min}`;
  }

  if (numericValue > max) {
    return ` ${i18n.global.t("rules.max")} ${max}`;
  }

  return true;
});

defineRule("hebrew", (value) => {
  if (!/^[\u0590-\u05FF ,.'-]+$/i.test(value) && value) {
    return i18n.global.t("rules.hebrew");
  }

  return true;
});

// date-dd/mm/yy format

defineRule("date", (value) => {
  if (/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{2}$/.test(value)) {
    return i18n.global.t("rules.date");
  }

  return true;
});

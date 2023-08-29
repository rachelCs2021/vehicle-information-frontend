import i18n from "../plugins/i18n";

export const blessByTime = () => {
  let bless;
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 6) {
    bless = "goodNight";
  } else if (currentHour < 12) {
    bless = "goodMorning";
  } else if (currentHour < 17) {
    bless = "goodAfternoon";
  } else {
    bless = "goodEvning";
  }

  return i18n.global.t(`bless.${bless}`);
};

export const tableHeaders = [
  {
    title: "מספר רכב",
    align: "start",
    sortable: false,
    key: "carNumber",
  },
  { title: "יצרן", key: "manufacturer" },
  { title: "דגם", key: "model" },
  { title: "תאריך טסט", key: "testDate" },
];
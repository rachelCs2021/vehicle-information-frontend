import i18n from "../plugins/i18n";

interface TableHeaders {
  title: string;
  key: string;
  sortable?: boolean;
}

export const blessByTime = (): string => {
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

export const tableHeaders: TableHeaders[] = [
  {
    title: "מספר רכב",
    key: "carNumber",
  },
  { title: "יצרן", key: "manufacturer" },
  { title: "דגם", key: "model" },
  { title: "תאריך טסט", key: "testDate" },
  { title: "עריכה / מחיקה", key: "actions", sortable: false },
];

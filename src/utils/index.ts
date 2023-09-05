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
    title: i18n.global.t(`tableHeaders.carNumber`),
    key: "carNumber",
  },
  { title: i18n.global.t(`tableHeaders.manufacturer`), key: "manufacturer" },
  { title: i18n.global.t(`tableHeaders.model`), key: "model" },
  {
    title: i18n.global.t(`tableHeaders.passedTestOnDate`),
    key: "passedTestOnDate",
  },
  {
    title: i18n.global.t(`tableHeaders.actions`),
    key: "actions",
    sortable: false,
  },
];

export const oneYearAhead = (date: Date): Date => {
  const oneYearFromNow = date;
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  return oneYearFromNow;
};

export const formatDate = (date: Date): string => {
  const formatedDate = date.toISOString().split("T")[0];
  return formatedDate;
};

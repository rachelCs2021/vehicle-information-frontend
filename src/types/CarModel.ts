export interface CarModel {
  carNumber: string;
  manufacturer: string;
  model: string;
  passedTestOnDate: string;
}

export interface CarDataResults {
  count: number;
  vehicles: CarModel[];
}

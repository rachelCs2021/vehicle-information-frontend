import axios from "axios";
export const BASE_URL = "http://localhost:3000/vehicles";

const contentType = "application/json";

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 100 * 2000,
  headers: {
    "Content-Type": contentType,
    "X-Requested-With": "X",
  },
});

export const getVehiclesTestReminder = async () => {
  const data = await client.get("/testReminder");
  return data.data.needTest;
};

export const getAllVehicles = async (top, skip) => {
  const data = await client.get("/", {
    params: {
      $top: top,
      $skip: skip,
    },
  });
  return data.data;
};

export const getVehicle = async (vehicleNumber, top, skip) => {
  const vehicle = await client.get(`/${vehicleNumber}`, {
    params: {
      $top: top,
      $skip: skip,
    },
  });
  return vehicle.data;
};

export const createVehicle = async (vehicle) => {
    const newVehicle = await client.post(`/`, vehicle);
    return newVehicle.data;
  };  

export const updateVehicle = async (vehicle) => {
  const update = await client.patch(`/${vehicle._id}`, vehicle);
  return update.data;
};

export const deleteVehicle = async (vehicle) => {
  const deleteV = await client.delete(`/${vehicle._id}`);
  return deleteV.data;
};
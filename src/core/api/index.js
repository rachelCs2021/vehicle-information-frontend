import axios from "axios"
export const BASE_URL = "http://localhost:3000/"

const contentType = "aplication/json"

export const client = axios.create({
   baseURL: BASE_URL,
   timeout: 100 * 2000,
   headers: {
    "Content-Type": contentType,
    "X-Requested-With": "X"
   }
})

export const getAllVehicles = async (top, skip) => {
    const data = await client.get('/vehicles', {
        params: {
            $top: top,
            $skip: skip
        }
    })
    return data.data;
}

export const getVehicle = async (vehicleNumber, top, skip) => {
    const vehicle = await client.get(`/vehicles/${vehicleNumber}`, {
        params: {
            $top: top,
            $skip: skip
        }
    })
    return vehicle.data;
}
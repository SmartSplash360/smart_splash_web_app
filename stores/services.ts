import {defineStore} from "pinia";
import axios from "axios";

export const useServiceStore = defineStore("service", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        services: [],
    }),
    getters: {
        getServices(state) {
            return state.services
        }
    },
    actions: {
        async getServices() {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/services");
                this.services = res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async getService(id: number) {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/services/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async createService(servicePayload: Service) {
            try {
                const res = await axios.post("http://localhost:8000/api/v1/services", servicePayload);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async updateService(id: number, servicePayload: Service) {
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/services/${id}`, servicePayload);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteService(id: number) {
            try {
                const res = await axios.delete(`http://localhost:8000/api/v1/services/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    },
});
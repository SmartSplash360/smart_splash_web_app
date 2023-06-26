import {defineStore} from "pinia";
import axios from "axios";

export const useProductStore = defineStore("product", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        products: [],
    }),
    getters: {
        getServices(state) {
            return state.products
        }
    },
    actions: {
        async getServices() {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/products");
                this.products = res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async getService(id: number) {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async createService(productPayload: Product) {
            try {
                const res = await axios.post("http://localhost:8000/api/v1/products", productPayload);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async updateService(id: number, productPayload: Product) {
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/products/${id}`, productPayload);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteService(id: number) {
            try {
                const res = await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    },
});
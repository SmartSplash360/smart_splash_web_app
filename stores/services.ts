import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';


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
        async fetchServices() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get("http://localhost:8000/api/v1/services");
                console.log(res.data.data.data)
                this.services = res.data.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchService(id: number) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.get(`http://localhost:8000/api/v1/services/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async createService(servicePayload: Service) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.post("http://localhost:8000/api/v1/services", servicePayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
        async updateService(id: number, servicePayload: Service) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.post(`http://localhost:8000/api/v1/services/${id}`, servicePayload);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteService(id: number) {
            try {
                const jwt = useUserStore().getJwt;
                axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
                const res = await axios.delete(`http://localhost:8000/api/v1/services/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    },
});
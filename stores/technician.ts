import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

const currentUrl = window.location.href;
const hostname = new URL(currentUrl).hostname;

let apiUrl = requestUrl;

if (hostname.includes('.')) {
    apiUrl = `http://${hostname}:8000/api/v1`
}

export const useTechnicianStore = defineStore("technician", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        technicians: [],
    }),
    getters: {
        getTechnicians(state) {
            return state.technicians;
        },
        getTechnicianById: (state) => (id: number | string) => {
            return state.technicians.find((technician: Technician) => technician?.id === id);
        }
        
    },
    actions: {
        async fetchTechnicians() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = `${apiUrl}/technicians`
            try {
                const res = await axios.get(url);
                this.technicians = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchTechnician(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = `${apiUrl}/technicians/${id}`

            try {
                const res = await axios.get(url);
                return res.data.data as Technician;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createTechnician(technicianPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = `${apiUrl}/technicians`
            try {
                const res = await axios.post(url, technicianPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateTechnician(id: number | string, technicianPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = `${apiUrl}/technicians/${id}`
            try {
                const res = await axios.post(url, technicianPayload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async deleteTechnician(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = `${apiUrl}/technicians/${id}`

            try {
                const res = await axios.delete(url);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }

                return res.data
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
})
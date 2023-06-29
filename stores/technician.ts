import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

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
            try {
                const res = await axios.get("http://localhost:8000/api/v1/technicians");
                console.log(res.data.data.data);
                this.technicians = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchTechnician(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/technicians/${id}`);
                console.log(res.data.data);
                return res.data.data as Technician;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createTechnician(technicianPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/technicians`, technicianPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateTechnician(id: number, technicianPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/technicians/${id}`, technicianPayload);
                console.log(res.data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
})
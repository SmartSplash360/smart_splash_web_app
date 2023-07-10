import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useAlertStore = defineStore("alert", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        alerts: [],
    }),
    getters: {
        getAlerts(state) {
            return state.alerts;
        }
    },
    actions: {
        async fetchAlerts() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get("http://localhost:8000/api/v1/alerts");
                console.log(res.data.data.data);
                this.alerts = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchAlert(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/alerts/${id}`);
                console.log(res.data.data);
                return res.data.data
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createAlert(alertPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/alerts`, alertPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateAlert(alertId: number | string, alertPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/alerts/${alertId}`, alertPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async deleteAlert(alertId: number | string){
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.delete(`http://localhost:8000/api/v1/alerts/${alertId}`);

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
});
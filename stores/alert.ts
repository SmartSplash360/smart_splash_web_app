


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
            let url = `${apiUrl}/alerts`
            
            try {
                const res = await axios.get(url);
                this.alerts = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchAlert(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = `${apiUrl}/alerts/${id}`
            try {
                const res = await axios.get(url);
                return res.data.data
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createAlert(alertPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url =  `${apiUrl}/alerts`
            try {
                const res = await axios.post(url, alertPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
                return res.data.data
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateAlert(alertId: number | string, alertPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url =`${apiUrl}/alerts/${alertId}`
            try {
                const res = await axios.post(url, alertPayload);

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
            let url = `${apiUrl}/alerts/${alertId}`
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
});

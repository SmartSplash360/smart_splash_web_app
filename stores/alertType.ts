import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useAlertTypeStore = defineStore("alertType", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        alertTypes: [],
    }),
    getters: {
        getAlertTypes(state) {
            return state.alertTypes
        }
    },
    actions: {
        async fetchAlertTypes() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get("http://localhost:8000/api/v1/alertTypes");
                console.log(res.data.data.data);
                this.alertTypes = res.data.data.data
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchAlertType(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/alertTypes/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async createAlertType(payload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                await axios.post("http://localhost:8000/api/v1/alertTypes", payload);
            } catch (error) {
                console.log(error);
            }
        }
    }
});
import {defineStore} from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

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


export const useTenantStore = defineStore("tenant", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        loggedIn: false,
        currentTenant: null,
        jwt: "",
    }),
    getters: {
        getCurrentTenant(state) {
            return state.currentTenant;
        },
        getJwt(state) {
            return state.jwt;
        },
        getLoggedIn(state) {
            return state.loggedIn;
        },
    },
    actions: {
        async register(tenantPayload: {}) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`${apiUrl}/tenant`, tenantPayload);
                this.currentTenant = res.data.data;

                if(res.data){
                    window.location.href = `http://${res.data.data.domain.domain}:3000/customers`;
                }
            } catch (error) {
               throw new Error("An error")
            }
        },
        async updateTenant(id : string | number,tenantPayload: any) {

            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

            let url = `${requestUrl}/tenant/${id}`
            try {
                const res = await axios.post(url, tenantPayload);
                console.log(res)
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        },
    },
});

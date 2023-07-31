import {defineStore} from "pinia";
import axios from "axios";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.withCredentials = true;

export const useTenantStore = defineStore("tenant", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        loggedIn: false,
        currentTenant: null,
        jwt: "",
        tenants: [],
    }),
    getters: {
        getTenants(state) {
            return state.tenants;
        },
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
            try {
                const res = await axios.post("http://localhost:8000/api/v1/tenant", tenantPayload);
                this.currentTenant = res.data;
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async fetchUsers() {
            try {
                const data = await axios.get(
                    "https://jsonplaceholder.typicode.com/tenant"
                );
                this.tenants = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
});

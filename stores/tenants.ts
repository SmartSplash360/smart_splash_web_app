import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

const currentUrl = window.location.href;
const hostname = new URL(currentUrl).hostname;

let apiUrl = requestUrl;

export const useTenantStore = defineStore("tenant", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    loggedIn: false,
    currentTenant: null,
    currentTenantId: null,
    jwt: "",
  }),
  getters: {
    getCurrentTenant(state) {
      return state.currentTenant;
    },
    getCurrentTenantId(state) {
      return state.currentTenantId;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },
  actions: {
    async fetchCurrentTenant() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      let url = `${apiUrl}/tenant/getCurrent`;
      try {
        const res = await axios.get(url);
        this.currentTenant = res.data.data;
        this.currentTenantId = res.data.data.id;
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return this.currentTenant;
      } catch (error) {
        throw new Error("An error");
      }
    },
    async register(tenantPayload: {}) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try {
        const res = await axios.post(`${apiUrl}/tenant`, tenantPayload);

        if (res.data) {
          window.location.href = `http://${res.data.data.domain.domain}:3000/customers`;
        }
      } catch (error) {
        throw new Error("An error");
      }
    },
    async updateTenant(tenantPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      let url = `${requestUrl}/tenant/${this.currentTenantId}`;
      try {
        const res = await axios.post(url, tenantPayload);
        console.log(res);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});

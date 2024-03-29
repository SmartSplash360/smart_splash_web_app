import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from './tenants';

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useAlertTypeStore = defineStore("alertType", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    alertTypes: [],
  }),
  getters: {
    getAlertTypes(state) {
      return state.alertTypes;
    },
  },
  actions: {
    async fetchAlertTypes() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alertTypes`;
      try {
        const res = await axios.get(url);
        this.alertTypes = res.data.data.data;
      } catch (error) {

        return error;
      }
    },
    async fetchAlertType(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alertTypes/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {

        return error;
      }
    },
    async createAlertType(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alertTypes`;
      try {
        await axios.post(url, payload);
      } catch (error) {

      }
    },
  },
});

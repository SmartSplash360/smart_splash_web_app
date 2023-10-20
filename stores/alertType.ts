import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from "~/stores/tenants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

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
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/alertTypes`
        : `https://smartsplash.co/api/v1/alertTypes`;
      try {
        const res = await axios.get(url);
        this.alertTypes = res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchAlertType(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/alertTypes/${id}`
        : `https://smartsplash.co/api/v1/alertTypes/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createAlertType(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/alertTypes`
        : `https://smartsplash.co/api/v1/alertTypes`;
      try {
        await axios.post(url, payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

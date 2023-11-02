import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
let apiUrl = config.public.apiUrl;

export const useAlertStore = defineStore("alert", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    alerts: [],
    searchQuery: "",
  }),
  getters: {
    getAlerts(state) {
      return state.alerts;
    },
    filterAlerts: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.alerts.filter((alert: any) =>
        alert.subject.toLocaleLowerCase().includes(search)
      );
    },
  },
  actions: {
    async fetchAlerts() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alerts`;

      try {
        const res = await axios.get(url);
        this.alerts = res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchAlert(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alerts/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createAlert(alertPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alerts`;
      try {
        const res = await axios.post(url, alertPayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateAlert(alertId: number | string, alertPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alerts/${alertId}`;
      try {
        const res = await axios.post(url, alertPayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteAlert(alertId: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/alerts/${alertId}`;
      try {
        const res = await axios.delete(url);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});

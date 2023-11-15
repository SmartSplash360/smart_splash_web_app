import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const usePoolSpecsStore = defineStore("poolSpecs", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchPoolSpecsList() {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        
        let url = `${apiUrl}/poolSpecs`;
        const res = await axios.get(url);
        return res.data.data.data;
      } catch (error) {

        return error;
      }
    },
    async fetchPoolSpecs(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        
        let url = `${apiUrl}/poolSpecs/${id}`;
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {

        return error;
      }
    },
    async createPoolSpecs(poolSpecsPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        let url = `${apiUrl}/poolSpecs`;
        const res = await axios.post(url, poolSpecsPayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async updatePoolSpecs(id: number | string, poolSpecsPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        
        let url = `${apiUrl}/poolSpecs/${id}`;
        const res = await axios.post(url, poolSpecsPayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async deletePoolSpecs(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        axios.defaults.headers.post["Content-Type"] = "application/json";

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        
        let url = `${apiUrl}/poolSpecs/${id}`;
        const res = await axios.delete(url);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data;
      } catch (error) {

        throw error;
      }
    },
  },
});

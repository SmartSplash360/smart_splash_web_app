import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const usePoolSpecsStore = defineStore("poolSpecs", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchPoolSpecsList() {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/poolSpecs` : `http://localhost:8000/api/v1/poolSpecs`
        const res = await axios.get(url);
        return res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchPoolSpecs(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/poolSpecs/${id}` : `http://localhost:8000/api/v1/poolSpecs/${id}`
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createPoolSpecs(poolSpecsPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/poolSpecs` : `http://localhost:8000/api/v1/poolSpecs`
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
        let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/poolSpecs/${id}` : `http://localhost:8000/api/v1/poolSpecs/${id}`
        const res = await axios.post(url ,  poolSpecsPayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deletePoolSpecs(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/poolSpecs/${id}` : `http://localhost:8000/api/v1/poolSpecs/${id}`
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

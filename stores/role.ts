import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from './tenants';

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useRoleStore = defineStore("role", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    roles: [],
  }),
  getters: {
    getRoles(state) {
      return state.roles;
    },
  },
  actions: {
    async fetchRoles() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/roles`;
      try {
        const res = await axios.get(url);
          this.roles = res.data.data.data;
      } catch (error) {

        return error;
      }
    },
    async createRole(rolePayload : object) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/roles`;
      try {
        const res = await axios.post(url, rolePayload);
        this.fetchRoles()

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async deleteRole(roleId: number) {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/roles/${roleId}`;

        try {
          const res = await axios.delete(url);

          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          this.fetchRoles()
          return res.data;
        } catch (error) {

          throw error;
        }
    }
  },
});

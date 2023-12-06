import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

let apiUrl = requestUrl;

function appendSubdomain(url: string, tenantId: number) {
  return url.replace("/api/", `/api/${tenantId}/`)
}

export const useTenantStore = defineStore("tenant", {
  state: () => ({
    loggedIn: false,
    currentTenant: null,
    currentTenantId: null,
    tenantDomain: '',
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
    async fetchTenantByWebsite(domain : string) {
      try {
        const res = await axios.get(`${apiUrl}/tenant/getTenantByWebsite/${domain}`);
        
        if (!res.data.success) {
            throw new Error(res.data.message);
        } else {
          const tenantId = res.data.data.id;          
          this.tenantDomain =  appendSubdomain(apiUrl, tenantId);;
        }

      } catch (error) {
        throw error;
      }
    },
    async fetchCurrentTenant() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      if (this.tenantDomain) {
        
        let url = `${this.tenantDomain}/tenant/getCurrent`;

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
      } else {
        return null
      }
    },
    async register(tenantPayload: {}) {
      try {
        const res = await axios.post(`${apiUrl}/tenant`, tenantPayload);
        if (!res.data.success) {
          return res.data
        }
        return res.data
      } catch (error) {
        throw new Error("An error");
      }
    },
    async updateTenant(tenantId : number, tenantPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

      let url = `${requestUrl}/tenant/${tenantId}`;
      try {
        const res = await axios.post(url, tenantPayload);
        this.fetchCurrentTenant()
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
  },
});

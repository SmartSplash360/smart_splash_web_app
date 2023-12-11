import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useServiceStore = defineStore("service", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    services: [],
    createdServiceId: null,
    searchQuery: "",
  }),
  getters: {
    getServices(state) {
      return state.services;
    },
    getServiceId: (state) => (id: number | string) => {
      return state.services.find((service: Service) => service.id === id);
    },
    filterServices: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.services.filter((service: Service) =>
        service.name.toLocaleLowerCase().includes(search)
      );
    },
  },
  actions: {
    async fetchServices() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/services`;
      try {
        const res = await axios.get(url);
        this.services = res.data.data.data;
      } catch (error) {

      }
    },
    async fetchService(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/services/${id}`;
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {

      }
    },
    async createService(servicePayload: Service) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        
        let url = `${apiUrl}/services`;
        const res = await axios.post(url, servicePayload);
        this.createdServiceId = res.data.data.id;

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async updateService(id: number | string, servicePayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
       
        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/services/${id}`;
        const res = await axios.post(url, servicePayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data;
      } catch (error) {

        throw error;
      }
    },
    async deleteService(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }
        
        let url = `${apiUrl}/services/${id}`;

        const res = await axios.delete(url);
        return res.data.data;
      } catch (error) {

        throw error;
      }
    },
    async fechSubservicesByServiceId(id: string | number) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/subServices/getByService/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        throw error
      }
    },
    async createSubService(subServicePayload: any, serviceId : number | null) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        
        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/subServices`;
        const res = await axios.post(url, {
          service_id: this.createdServiceId ?? serviceId,
          name: subServicePayload,
        });

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
  },
});

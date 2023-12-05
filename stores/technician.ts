import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

let apiUrl = requestUrl;

export const useTechnicianStore = defineStore("technician", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    technicians: [],
    searchQuery: "",
    count : 0
  }),
  getters: {
    getTechnicians(state) {
      return state.technicians;
    },
    getTechnicianById: (state) => (id: number | string) => {
      return state.technicians.find(
        (technician: Technician) => technician?.id === id
      );
    },
    getTechnicianCount(state) {
      return state.count;
    },
    filteredTechnicians: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.technicians.filter((technician: any) =>
        technician.name.toLocaleLowerCase().includes(search)
      );
    },
  },
  actions: {
    async fetchTechnicians(pageNumber : number = 1) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians?page=${pageNumber}`;
      try {
        const res = await axios.get(url);
        this.technicians = res.data.data.data;
        this.count = res.data.data.total;
        return res.data.data.data
      } catch (error) {

        return error;
      }
    },
    async fetchTechnician(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians/${id}`;

      try {
        const res = await axios.get(url);
        return res.data.data as Technician;
      } catch (error) {
        alert(error);

      }
    },
    async createTechnician(technicianPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians`;
      try {
        const res = await axios.post(url, technicianPayload);
        this.fetchTechnicians();

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async updateTechnician(id: number | string, technicianPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians/${id}`;
      try {
        const res = await axios.post(url, technicianPayload);
        this.fetchTechnicians();
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async updateMyProfile(id: number | string, technicianPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians/${id}`;
      try {
        const res = await axios.post(url, technicianPayload);

        useUserStore().setCurrentUser(res.data.data);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async updateTechnicianProfile(id: number | string, photo: any) {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        
        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/technicians/${id}`;
        try {
          const res = await axios.post(url, photo);

          useUserStore().setCurrentUser(res.data.data);
          if (!res.data.success) {
            throw new Error(res.data.message);
          }
        } catch (error) {

          throw error;
        }
    },
    async deleteTechnician(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians/${id}`;

      try {
        const res = await axios.delete(url);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (error) {

        throw error;
      }
    },
    async searchTechnician(query: string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/technicians/get_by_name/${query}`;
      try {
        const res = await axios.get(url);
        console.log(res.data.data.data)
        return res.data.data.data
      } catch (error) {

        return error;
      }
    }
  },
});

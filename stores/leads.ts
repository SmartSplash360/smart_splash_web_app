import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from "~/stores/tenants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const useLeadStore = defineStore("lead", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    leads: [],
    searchQuery: "",
  }),
  getters: {
    getLeads(state) {
      return state.leads;
    },
    getLeadById: (state) => (id: number | string) => {
      return state.leads.find((lead: Customer) => lead.id === id);
    },
    filterLeads: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.leads.filter((lead: Customer) =>
        lead.name.toLocaleLowerCase().includes(search)
      );
    },
    sortLeads: (state) => () => {
      return state.leads.sort(function (a: Customer, b: Customer) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
  },
  actions: {
    async fetchLeads() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/leads`
        : `http://smartsplash360.henocknkoy.site/api/v1/leads`;
      try {
        const res = await axios.get(url);
        this.leads = res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchLead(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/leads/${id}`
        : `http://smartsplash360.henocknkoy.site/api/v1/leads/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createLead(leadPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/leads`
        : `http://smartsplash360.henocknkoy.site/api/v1/leads`;
      try {
        const res = await axios.post(url, leadPayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateLead(id: number | string, leadPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/leads/${id}`
        : `http://smartsplash360.henocknkoy.site/api/v1/leads/${id}`;
      try {
        const res = await axios.post(url, leadPayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteLead(leadId: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/leads/${leadId}`
        : `http://smartsplash360.henocknkoy.site/api/v1/leads/${leadId}`;
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
    async importLeads(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/leads/imports`
        : `http://smartsplash360.henocknkoy.site/api/v1/leads/imports`;
      try {
        const formData = new FormData();
        formData.append(
          "lead_file",
          payload.files[0],
          `leads-import-${Date.now()}.csv`
        );

        const res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

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

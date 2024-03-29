import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useQuoteStore = defineStore("quote", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    quotes: [],
    customerQuotes: [],
    technicianQuotes: [],
  }),
  getters: {
    getQuotes(state) {
      return state.quotes;
    },
    getQuotesByCustomerId: (state) => (id: number | string) => {
      return state.customerQuotes;
    },
    getTechnicianQuotes: (state) => (id: number | string) => {
      return state.technicianQuotes;
    },
    getQuoteId: (state) => (id: number | string) => {
      return state.quotes.find((quote: Quote) => quote?.id === id);
    },
    getQuoteCount(state) {
      return state.quotes?.length;
    },
  },
  actions: {
    async fetchQuotes() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/quotes`;
      try {
        const res = await axios.get(url);
        this.quotes = res.data.data.data;
      } catch (error) {
        return error;
      }
    },
    async fetchTechnicianQuotes(technicianId: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/quotes/byTechnician/${technicianId}`;
      try {
        const res = await axios.get(url);
        this.technicianQuotes = res.data.data;
        return res.data.data;
      } catch (error) {
        return error;
      }
    },
    async fetchCustomerQuotes(customerId: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/quotes/byCustomer/${customerId}`;
      try {
        const res = await axios.get(url);
        this.customerQuotes = res.data.data;
        return res.data.data;
      } catch (error) {
        return error;
      }
    },

    async createQuote(quotePayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/quotes`;
      try {
        const res = await axios.post(url, quotePayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
  },
});

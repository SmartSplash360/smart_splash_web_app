import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from './tenants';

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useCustomerStore = defineStore("customer", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    customers: [],
    searchQuery: "",
  }),
  getters: {
    getCustomers(state) {
      return state.customers;
    },
    getActiveCustomers(state) {
      const actives = state.customers.filter(
        (customer: Customer) => customer.status === 1
      );
      return actives.length;
    },
    getInactiveCustomers(state) {
      const inactives = state.customers.filter(
        (customer: Customer) => customer.status === 0
      );
      return inactives?.length;
    },
    getCustomerById: (state) => (id: number | string) => {
      return state.customers.find((customer: Customer) => customer.id === id);
    },
    filterCustomers: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.customers.filter((customer: Customer) =>
        customer.name.toLocaleLowerCase().includes(search)
      );
    },
    sortCustomers: (state) => () => {
      return state.customers.sort(function (a: Customer, b: Customer) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
  },
  actions: {
    async fetchCustomers() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/customers`;
      try {
        const res = await axios.get(url);
        this.customers = res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchCustomer(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/customers/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createCustomer(customerPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/customers`;
      try {
        const res = await axios.post(url, customerPayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateCustomer(id: number | string, customerPayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/customers/${id}`;
      try {
        const res = await axios.post(url, customerPayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteCustomer(customerId: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/customers/${customerId}`;
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

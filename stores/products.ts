import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useProductStore = defineStore("product", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    products: [],
    searchQuery: "",
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    filterProducts: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.products.filter((product: Product) =>
        product.name.toLocaleLowerCase().includes(search)
      );
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/products`;
        const res = await axios.get(url);
        this.products = res.data.data.data;
      } catch (error) {
        //console.log(error);
      }
    },
    async fetchProduct(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/products/${id}`;

        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        //console.log(error);
      }
    },
    async createProduct(productPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/products`;

        const res = await axios.post(url, productPayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async updateProduct(id: number | string, productPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/products/${id}`;

        const res = await axios.post(url, productPayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        //console.log(error);
        throw error;
      }
    },
    async deleteProduct(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/products/${id}`;

        const res = await axios.delete(url);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data;
      } catch (error) {
        //console.log(error);
        throw error;
      }
    },
  },
});

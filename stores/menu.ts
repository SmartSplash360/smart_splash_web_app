import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from './tenants';

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useMenuStore = defineStore("menu", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    menu: [],
    searchQuery: "",
  }),
  getters: {
    getMenu(state) {
      return state.menu;
    },
  },
  actions: {
    async fetchMenuByRole(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/roleMenus/getMenuByRole/${id}`;
      try {
        const res = await axios.get(url);
        this.menu = res.data.data;
      } catch (error) {

        return error;
      }
    },
  },
});

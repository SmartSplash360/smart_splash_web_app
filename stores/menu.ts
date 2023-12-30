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
    listMenu : [],
    searchQuery: "",
  }),
  getters: {
    getMenu(state) {
      return state.menu;
    },
    getMenuList(state) {
      return state.listMenu
    }
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
        return res.data.data
      } catch (error) {

        return error;
      }
    },
    async fetchMenu() {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/menus`;
        try {
          const res = await axios.get(url);
            this.listMenu = res.data.data.data;
        } catch (error) {

          return error;
        }
    },
    async createMenu(menuPayload : object) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/menus`;
      try {
        const res = await axios.post(url, menuPayload);
        this.fetchMenu()

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async createRoleMenu(menuPayload : object) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/roleMenus`;
      try {
        const res = await axios.post(url, menuPayload);
        this.fetchMenu()

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async deleteMenu(menuId: number) {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const tenantUrl = useTenantStore().tenantDomain;
        if (tenantUrl) {
          apiUrl = tenantUrl
        }

        let url = `${apiUrl}/menus/${menuId}`;

        try {
          const res = await axios.delete(url);

          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          this.fetchMenu()
          return res.data;
        } catch (error) {

          throw error;
        }
    }
  },
});

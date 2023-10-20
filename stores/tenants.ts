import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

const apiUrl = "https://smartsplash.co";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
// axios.defaults.withCredentials = true;

export const useTenantStore = defineStore("tenant", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    loggedIn: false,
    currentTenant: null,
    currentTenantDomain: null,
    jwt: "",
    tenants: [],
  }),
  getters: {
    getTenants(state) {
      return state.tenants;
    },
    getCurrentTenant(state) {
      return state.currentTenant;
    },
    getCurrentTenantDomain(state) {
      return state.currentTenantDomain;
    },
    getJwt(state) {
      return state.jwt;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
  },
  actions: {
    async register(tenantPayload: {}) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try {
        const res = await axios.post(`${apiUrl}/api/v1/tenant`, tenantPayload);
        this.currentTenant = res.data;
        this.currentTenantDomain = res.data.data.domain;
        this.registerFirstUser();

        if (res.data) {
          const router = useRouter();
          router.push("/customers");
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async registerFirstUser() {
      const { email, password, password_confirmation, name, surname } =
        useUserStore().getFirstUserTenant;

      try {
        const user = {
          email,
          password,
          password_confirmation,
          name,
          surname,
          role_id: 1,
        };
        const res = await axios.post(
          `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/auth/register`,
          user
        );
        useUserStore().currentUser = res.data;

        if (res.data.success) {
          // TODO: store in local storage

          useUserStore().currentUser = res.data.data.user;
          useUserStore().setJwt(res.data.data.token);
          this.loggedIn = true;

          // set authorization header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.data.token}`;
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});

import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants'

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;
const appDomain = config.public.appDomain

let apiUrl = requestUrl;

export const useUserStore = defineStore("user", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    loggedIn: false,
    currentUser: null,
    jwt: "",
    users: [],
    userDefinedTheme: true,
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getJwt(state) {
      return state.jwt;
    },
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getUserDefinedTheme(state) {
      return state.userDefinedTheme;
    },
  },

  actions: {
    async registerUser(domain: string | null , userPayload: {}) {
      if (domain && domain !== appDomain) {
        await useTenantStore().fetchTenantByWebsite(domain);
        apiUrl = useTenantStore().tenantDomain;
      }
      try {
        const res = await axios.post(`${apiUrl}/auth/register`, userPayload);

        if (res.data.success) {
          return res.data.data.user;
        } 
      } catch (error) {
        return { errorMessage: error };
      }
    },
    async login(domain: string, email: string, password: string) {
      if (domain && domain !== appDomain) {
        await useTenantStore().fetchTenantByWebsite(domain);
        apiUrl = useTenantStore().tenantDomain;
      }
      try {
        let url = `${apiUrl}/auth/login`;
        const res = await axios.post(url, { email, password });
        if (res.data.success) {
          this.currentUser = res.data.data.user;
          this.jwt = res.data.data.token;
          this.loggedIn = true;

          // set authorization header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.data.token}`;
        
          return res.data.data.user;
        } 
      } catch (error) {
        throw error;
      }
    },
    async register(domain: string | null , userPayload: {}) {
      if (domain && domain !== appDomain) {
        await useTenantStore().fetchTenantByWebsite(domain);
        apiUrl = useTenantStore().tenantDomain;
      }
      try {
        const res = await axios.post(`${apiUrl}/auth/register`, userPayload);
        this.currentUser = res.data;

        if (res.data.success) {
          this.currentUser = res.data.data.user;
          this.jwt = res.data.data.token;
          this.loggedIn = true;

          // set authorization header
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.data.token}`;

          return res.data.data.user;
        } 
      } catch (error) {
        return { errorMessage: error };
      }
    },
    setJwt(newJwt: any) {
      this.jwt = newJwt;
    },
    setCurrentUser(newUserDetail: any) {
      this.$patch((state) => {
        state.currentUser = newUserDetail
      })
    },
    async logout() {
      const router = useRouter();

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/auth/logout`;
      await axios.post(url);
      localStorage.clear();
      this.currentUser = null;
      this.jwt = "";
      this.loggedIn = false;
      this.userDefinedTheme = false;
      await router.push("/");
    },
    async forgotPassword(email:string) {

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/auth/forgot_password`;
      try {
        const res = await axios.post(url, { email });
        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (error) {
        throw error;
      }

    },
    async resetPassword(email : string, password : string, password_confirmation : string, token : string) {
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/auth/reset_password`;
      try {
        const res = await axios.post(url, {
          email, password, password_confirmation,token 
        });
        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (error) {
        throw error;
      }

    },
    async fetchUsers() {
      try {
        const data = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = data.data;
      } catch (error) {
        alert(error);

      }
    },
  },
});

import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from './tenants';

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useCommunicationStore = defineStore("communication", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    voiceCall: null,
  }),
  getters: {},
  actions: {
    async startVoiceCall(number: string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/twilo/call`;
      try {
        const res = await axios.post(url, {
          receiver_number: number,
        });
        this.voiceCall = res.data.data;
      } catch (error) {

        return error;
      }
    },
  },
});

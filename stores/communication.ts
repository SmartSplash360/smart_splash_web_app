import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;

export const useCommunicationStore = defineStore("communication", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        voiceCall: null
    }),
    getters: {},
    actions: {
        async startVoiceCall(number: string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/twilo/call` : `${apiUrl}/twilo/call`
            try {
                const res = await axios.post(url, {
                    receiver_number: number
                });
                this.voiceCall = res.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        }
    },
})
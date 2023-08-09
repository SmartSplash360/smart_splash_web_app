import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

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
            try {
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/twilo/call`, {
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
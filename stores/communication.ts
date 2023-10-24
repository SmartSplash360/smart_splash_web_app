import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

const currentUrl = window.location.href;
const hostname = new URL(currentUrl).hostname;

let apiUrl = requestUrl;

if (hostname.includes('.')) {
    apiUrl = `http://${hostname}:8000/api/v1`
}

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

            let url =  `${apiUrl}/twilo/call`
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
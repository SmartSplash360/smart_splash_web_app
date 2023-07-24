import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";

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
            console.log("init voice call");
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post("http://localhost:8000/api/v1/twilo/call", {
                    receiver_number: number
                });
                console.log(res.data.data);
                this.voiceCall = res.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        }
    },
})
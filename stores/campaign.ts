import {defineStore} from "pinia";
import axios from "axios";
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

export const useCampaignStore = defineStore("camapign", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        campaigns: [],
        filter : '',
    }),
    getters: {
        getCampaigns(state) {
            return state.campaigns;
        },
        filterCampaign(state){
            const filterValue = state.filter.toLowerCase();
            // return state.campaigns.filter(campaign)
        }
    },
    actions: {

        async createCampaignEmail(campaignPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

            let url =  `${apiUrl}/campaigns`
            try {
                const res = await axios.post(url, campaignPayload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
        async createCampaignSMS(campaignPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

            let url = `${apiUrl}/campaigns/sms`
            try {
                const res = await axios.post(url, campaignPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
    }
})
import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

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
            try {
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/campaigns`, campaignPayload);

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
            try {
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/campaigns/sms`, campaignPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
    }
})
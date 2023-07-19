import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";

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

        async createCampaign(campaignPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/campaigns`, campaignPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
        // async getCampaigns(){
        //     const jwt = useUserStore().getJwt;
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        //     try {
        //         const res = await axios.get('http://localhost:8000/api/v1/campaigns');
        //         return res.data.data
        //     } catch (error) {
        //         throw error
        //     }
        // }
    }
})
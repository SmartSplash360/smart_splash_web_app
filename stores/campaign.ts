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
    }),
    getters: {
        getCampaigns(state) {
            return state.campaigns;
        },
    },
    actions: {

        async createCampaign(campaignPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                console.log(campaignPayload)
                const res = await axios.post(`http://localhost:8000/api/v1/campaigns`, campaignPayload);
                console.log(res)

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
})
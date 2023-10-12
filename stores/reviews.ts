import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import { useTenantStore } from "~/stores/tenants";


axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const config = useRuntimeConfig();
const apiUrl = config.public.apiUrl;


export const useReviewStore = defineStore("review", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        reviews: [],
    }),
    getters: {
        getReviews(state){
            return state.reviews;
        },
        getReviewsByTechnician: (state) => (id: number | string) => {
            return state.reviews.find((review: any) => review.id === id);
        }
    },
    actions: {
        async fetchReviewByTechnician(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/reviews/byTechnician/${id}` : `${apiUrl}/reviews/byTechnician/${id}`
            try {
                const res = await axios.get(url);
                this.reviews = res.data.data
                return res.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
})
import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useQuoteStore = defineStore("quote", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        quotes: [],
    }),
    getters: {
        getQuotes(state) {
            return state.quotes;
        },
        getQuoteId: (state) => (id: number | string) => {
            return state.quotes.find((quote: Quote) => quote?.id === id);
        }
    },
    actions: {
        async fetchQuotes(jobId: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/quotes/byJob/${jobId}` : `http://localhost:8000/api/v1/quotes/byJob/${jobId}`
            try {
                const res = await axios.get(url);
                this.quotes = res.data.data.data;
            } catch (error) {
                return error
            }
        },

        async createQuote(quotePayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/quotes` : `http://localhost:8000/api/v1/quotes`
            try {
                const res = await axios.post(url, quotePayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                throw error
            }
        },
    }
})
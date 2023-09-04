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
        customerQuotes : [],
        technicianQuotes : [],
    }),
    getters: {
        getQuotes(state) {
            return state.quotes;
        },
        getQuotesByCustomerId : (state) => (id : number | string) => {
            return state.customerQuotes;
        },
        getTechnicianQuotes:  (state) => (id : number | string) =>  {
            return state.technicianQuotes;
        },
        getQuoteId: (state) => (id: number | string) => {
            return state.quotes.find((quote: Quote) => quote?.id === id);
        },
        getQuoteCount(state) {
            return state.quotes?.length;
        },
    },
    actions: {
        async fetchQuotes() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/quotes` : `http://localhost:8000/api/v1/quotes`
            try {
                const res = await axios.get(url);
                this.quotes = res.data.data.data;
                console.log(res.data.data.data)
            } catch (error) {
                return error
            }
        },
        // async fetchQuotesByJob(jobId: any) {
        //     const jwt = useUserStore().getJwt;
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        //     let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/quotes/byJob/${jobId}` : `http://localhost:8000/api/v1/quotes/byJob/${jobId}`
        //     try {
        //         const res = await axios.get(url);
        //         this.quotes = res.data.data.data;
        //     } catch (error) {
        //         return error
        //     }
        // },
        async fetchTechnicianQuotes(technicianId: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/quotes/byTechnician/${technicianId}` : `http://localhost:8000/api/v1/quotes/byTechnician/${technicianId}`
            try {
                const res = await axios.get(url);
                this.technicianQuotes = res.data.data.data;
            } catch (error) {
                return error
            }
        },
        async fetchCustomerQuotes(customerId: any) {
            console.log("Customer id", customerId)
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            let url = useTenantStore().getCurrentTenantDomain ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/quotes/byCustomer/${customerId}` : `http://localhost:8000/api/v1/quotes/byCustomer/${customerId}`
            try {
                const res = await axios.get(url);
                this.customerQuotes = res.data.data;
                console.log(this.customerQuotes);
                return res.data.data
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
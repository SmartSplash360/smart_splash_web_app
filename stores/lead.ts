import {defineStore} from "pinia";
import axios from "axios";
import {useUserStore} from "~/stores/users";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useLeadStore = defineStore("lead", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        leads: [],
    }),
    getters: {
        getLeads(state) {
            return state.leads;
        },
        getLeadById: (state) => (id: number | string) => {
            return state.leads.find((lead: Customer) => lead.id === id);
        }
    },
    actions: {
        async fetchLeads() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get("http://localhost:8000/api/v1/leads");
                this.leads = res.data.data.data;
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchLead(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/leads/${id}`);
                return res.data.data as Customer;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createLead(leadPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/leads`, leadPayload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateLead(id: number | string, leadPayload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://localhost:8000/api/v1/leads/${id}`, leadPayload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async deleteLead(leadId: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.delete(`http://localhost:8000/api/v1/lead/${leadId}`);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }

                return res.data
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
})
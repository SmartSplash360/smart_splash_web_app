import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useJobStore = defineStore("job", {
    persist: {
        storage: persistedState.localStorage,
    },
    state: () => ({
        jobs: [],
    }),
    getters: {
        getJobs(state) {
            return state.jobs
        }
    },
    actions: {
        async fetchJobs() {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs`);
                this.jobs = res.data.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchTechnicianJobs(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs/technician/${id}`)
                return res.data.data
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetchCustomerJobs(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs/customer/${id}`);
                return res.data.data
            } catch (error) {
                console.log(error);
                return error
            }
        },
        async fetScheduledJobsByDate(date: string) {
          const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs/getScheduledJobsByDate/${date}`);
                return res.data.data
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async createJob(payload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs`, payload);

                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error)
                throw error
            }
        },
        async updateJob(id: number | string, payload: any) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.post(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs/${id}`, payload);
                if (!res.data.success) {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                throw error
            }
        },
        async deleteJob(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.delete(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs/${id}`);

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
import axios from "axios";
import {defineStore} from "pinia";
import {useUserStore} from "~/stores/users";

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
                const res = await axios.get("http://localhost:8000/api/v1/jobs");
                this.jobs = res.data.data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchTechnicianJobs(id: number | string) {
            const jwt = useUserStore().getJwt;
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/jobs/technician/${id}`);
                console.log(res.data.data);
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
                const res = await axios.get(`http://localhost:8000/api/v1/jobs/customer/${id}`);
                console.log(res.data.data);
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
                const res = await axios.get(`http://localhost:8000/api/v1/jobs/getScheduledJobsByDate/${date}`);
                return res.data.data
            } catch (error) {
                console.log(error);
                return error
            }
        }
    }
})
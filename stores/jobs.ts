import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from "~/stores/tenants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const useJobStore = defineStore("job", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    jobs: [],
    completedJobs: 0,
    newJobId: null,
  }),
  getters: {
    getJobs(state) {
      return state.jobs;
    },
    getAllCompletedJobs(state) {
      return state.completedJobs;
    },
  },
  actions: {
    async fetchJobs() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs`;
      try {
        const res = await axios.get(url);
        this.jobs = res.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTechnicianJobs(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobs/technician/${id}`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs/technician/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchCustomerJobs(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobs/customer/${id}`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs/customer/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetScheduledJobsByDate(date: string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobs/getScheduledJobsByDate/${date}`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs/getScheduledJobsByDate/${date}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async fetchAllCompletedJob() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobs/getAllCompleted`
        : `http://smartsplash360.henocknkoy.site/api/v1/job/getAllCompleted`;
      try {
        const res = await axios.get(url);
        this.completedJobs = res.data.data.data.length;
      } catch (error) {
        console.log(error);
      }
    },
    async createJob(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/jobs`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs`;
      try {
        const res = await axios.post(url, payload);
        this.newJobId = res.data.data.id;

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async createJobActivity(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobActivities`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobActivities`;
      try {
        const res = await axios.post(url, {
          ...payload,
          job_id: this.newJobId,
        });

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateJob(id: number | string, payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobs/${id}`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs/${id}`;
      try {
        const res = await axios.post(url, payload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteJob(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = useTenantStore().getCurrentTenantDomain
        ? `http://${
            useTenantStore().getCurrentTenantDomain
          }:8000/api/v1/jobs/${id}`
        : `http://smartsplash360.henocknkoy.site/api/v1/jobs/${id}`;
      try {
        const res = await axios.delete(url);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
});

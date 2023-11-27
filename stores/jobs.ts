import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { useTenantStore } from './tenants';

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;



let apiUrl = requestUrl;

export const useJobStore = defineStore("job", {
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

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobs`;

      try {
        const res = await axios.get(url);
        this.jobs = res.data.data.data;
      } catch (error) {

      }
    },
    async fetchTechnicianJobs(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }
    
      let url = `${apiUrl}/jobs/technician/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {

        return error;
      }
    },
    async fetchCustomerJobs(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobs/customer/${id}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {

        return error;
      }
    },
    async fetchScheduledJobsByDate(date: string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobs/getScheduledJobsByDate/${date}`;
      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {

        throw error;
      }
    },
    async fetchAllCompletedJob() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/job/getAllCompleted`;
      try {
        const res = await axios.get(url);
        this.completedJobs = res.data.data.data.length;
      } catch (error) {

      }
    },
    async createJob(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobs`;
      try {
        const res = await axios.post(url, payload);
        this.newJobId = res.data.data.id;

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data.data;
      } catch (error) {

        throw error;
      }
    },
    async createJobActivity(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobActivities`;
      try {
        const res = await axios.post(url, {
          ...payload,
          job_id: this.newJobId,
        });

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async createJobProduct(payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobProducts`;
      try {
        const res = await axios.post(url, {
          ...payload,
          job_id: this.newJobId,
        });

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async updateJob(id: number | string, payload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobs/${id}`;
      try {
        const res = await axios.post(url, payload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async deleteJob(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/jobs/${id}`;
      try {
        const res = await axios.delete(url);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        return res.data;
      } catch (error) {

        throw error;
      }
    },
  },
});

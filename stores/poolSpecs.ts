import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const usePoolSpecsStore = defineStore("poolSpecs", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchPoolSpecsList() {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.get("http://localhost:8000/api/v1/poolSpecs");
        return res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchPoolSpecs(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.get(
          `http://localhost:8000/api/v1/poolSpecs/${id}`
        );
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createPoolSpecs(poolSpecsPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.post(
          "http://localhost:8000/api/v1/poolSpecs",
          poolSpecsPayload
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async updatePoolSpecs(id: number | string, poolSpecsPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.post(
          `http://localhost:8000/api/v1/poolSpecs/${id}`,
          poolSpecsPayload
        );
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deletePoolSpecs(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.delete(
          `http://localhost:8000/api/v1/poolSpecs/${id}`
        );

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

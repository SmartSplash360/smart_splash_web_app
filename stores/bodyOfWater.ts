import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { usePoolSpecsStore } from "./poolSpecs";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

const currentUrl = window.location.href;
const hostname = new URL(currentUrl).hostname;

let apiUrl = requestUrl;

if (hostname.includes('.')) {
    apiUrl = `http://${hostname}:8000/api/v1`
}

export const useBodyOfWaterStore = defineStore("bodyOfWater", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    bodiesOfWater: [],
  }),
  getters: {
    getBodiesOfWater(state) {
      return state.bodiesOfWater;
    },
  },
  actions: {
    async fetchBodiesOfWaters() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url =  `${apiUrl}/bodyOfWater`
      try {
        const res = await axios.get(url);
        this.bodiesOfWater = res.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBodyOfWater(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url =  `${apiUrl}/bodyOfWater/${id}`
      try {
        const res = await axios.get(url);
        this.bodiesOfWater = res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createBodyOfWater(
      payload: any,
      poolSpecsPayload: any,
      galleryPayload: any
    ) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      try {
        // create gallery
        if (galleryPayload.length > 0) {

          const formData = new FormData();
          formData.append("name", payload?.name);

          galleryPayload.forEach((image: File) => {
            formData.append("images", image, image.name);
          });

          const headers = {
            'Content-Type': 'multipart/form-data',
          };
          let url =  `${apiUrl}/galleries`

          const res = await axios.post(url, formData,{
              headers
            }
          );

          // add gallery_id to body of water payload

          if (!res.data.success) {
            throw new Error(res.data.message);
          }

          payload.gallery_id = res.data.data.id;
        }

        // create pool
        let url2 = `${apiUrl}/bodyOfWater`
        const res = await axios.post(url2, payload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        // create pool specs
        const poolId = res.data.data.id;
        poolSpecsPayload.pool_id = poolId;
        const poolSpecsRes = await usePoolSpecsStore().createPoolSpecs(
          poolSpecsPayload
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateBodyOfWater(
      id: number | string,
      payload: any,
      poolSpecsPayload: any
    ) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url =  `${apiUrl}/bodyOfWater/${id}`
      try {
        const res = await axios.post(url,  payload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }

        // update pool specs
        poolSpecsPayload.pool_id = id;
        const poolSpecsRes = await usePoolSpecsStore().createPoolSpecs(
          poolSpecsPayload
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteBodyOfWater(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = `${apiUrl}/bodyOfWater/${id}`
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

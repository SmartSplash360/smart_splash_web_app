import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "~/stores/users";
import { usePoolSpecsStore } from "./poolSpecs";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

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
      try {
        const res = await axios.get("http://localhost:8000/api/v1/bodyOfWater");
        console.log(res.data.data.data);
        this.bodiesOfWater = res.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchBodyOfWater(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/bodyOfWater/${id}`
        );
        console.log(res.data.data);
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
          console.log(galleryPayload);

          const formData = new FormData();
          formData.append("name", payload?.name);

          galleryPayload.forEach((image: File) => {
            formData.append("images", image, image.name);
          });

          const headers = {
            'Content-Type': 'multipart/form-data',
          };


          const res = await axios.post(
            "http://localhost:8000/api/v1/galleries",
            formData,
            {
              headers
            }
          );

          console.log(res)

          // add gallery_id to body of water payload

          if (!res.data.success) {
            throw new Error(res.data.message);
          }

          payload.gallery_id = res.data.data.id;
        }

        // create pool
        const res = await axios.post(
          `http://localhost:8000/api/v1/bodyOfWater`,
          payload
        );

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
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/bodyOfWater/${id}`,
          payload
        );
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
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/v1/bodyOfWater/${id}`
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

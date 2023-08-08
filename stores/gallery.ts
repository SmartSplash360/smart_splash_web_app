import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
import {useTenantStore} from "~/stores/tenants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({}),
  getters: {},
  actions: {
    async fetchGalleries() {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.get(`http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/galleries`);
        return res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchGallery(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.get(
          `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/galleries/${id}`
        );
        return res.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async createGallery(galleryPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

        const formData = new FormData();
        formData.append("name", galleryPayload.name);
        formData.append("images", galleryPayload.description);

        const res = await axios.post(
          `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/galleries`,
          galleryPayload
        );

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async updateGallery(id: number | string, galleryPayload: any) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.post(
          `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/galleries/${id}`,
          galleryPayload
        );
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteGallery(id: number) {
      try {
        const jwt = useUserStore().getJwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        const res = await axios.delete(
          `http://${useTenantStore().getCurrentTenantDomain}:8000/api/v1/galleries/${id}`
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

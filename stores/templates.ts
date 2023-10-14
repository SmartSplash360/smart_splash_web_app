import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";
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


export const useTemplateStore = defineStore("template", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    templates: [],
    searchQuery: "",
  }),
  getters: {
    getTemplates(state) {
      return state.templates;
    },
    getTemplateById: (state) => (id: number | string) => {
      return state.templates.find((template: any) =>  template.id === Number(id));
    },
    filteredTemplates: (state) => () => {
      const search = state.searchQuery.toLocaleLowerCase();
      return state.templates.filter((template: any) =>
        template.name.toLocaleLowerCase().includes(search)
      );
    },
    getTemplateTypeEmail: (state) => {
      return state.templates.filter(
        (template: any) => template.template_type_id === 2
      );
    },
    getTemplateTypeSMS: (state) => {
      return state.templates.filter(
        (template: any) => template.template_type_id === 1
      );
    },
    getTemplateCount(state) {
      return state.templates.length;
    },
  },
  actions: {
    async fetchTemplates() {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = `${apiUrl}/templates`
      try {
        const res = await axios.get(url);
        this.templates = res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchTemplate(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = `${apiUrl}/templates/${id}`

      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createTemplate(templatePayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = `${apiUrl}/templates`
      try {
        const res = await axios.post(url, templatePayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateTemplate(id: number | string, templatePayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = `${apiUrl}/templates/${id}`

      try {
        const res = await axios.post(url,templatePayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteTemplate(templateId: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let url = `${apiUrl}/templates/${templateId}`

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

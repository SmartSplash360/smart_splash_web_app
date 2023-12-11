import { defineStore } from "pinia";
import axios from "axios";
import { useTenantStore } from './tenants';
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const config = useRuntimeConfig();
const requestUrl = config.public.apiUrl;

let apiUrl = requestUrl;

export const useTemplateStore = defineStore("template", {
  persist: {
    storage: persistedState.localStorage,
  },
  state: () => ({
    templates: [],
    searchQuery: "",
    count : 0
  }),
  getters: {
    getTemplates(state) {
      return state.templates;
    },
    getTemplateById: (state) => (id: number | string) => {
      return state.templates.find(
        (template: any) => template.id === Number(id)
      );
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
      return state.count;
    },
  },
  actions: {
    async fetchTemplates(pageNumber : number = 1) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }
      
      let url = `${apiUrl}/templates?page=${pageNumber}`;
      try {
        const res = await axios.get(url);
        this.templates = res.data.data.data;
        this.count = res.data.data.total;
        return res.data.data.data
      } catch (error) {

        return error;
      }
    },
    async fetchTemplate(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/templates/${id}`;

      try {
        const res = await axios.get(url);
        return res.data.data;
      } catch (error) {
        alert(error);

      }
    },
    async createTemplate(templatePayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/templates`;
      try {
        const res = await axios.post(url, templatePayload);

        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async updateTemplate(id: number | string, templatePayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";

      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/templates/${id}`;

      try {
        const res = await axios.post(url, templatePayload);
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
      } catch (error) {

        throw error;
      }
    },
    async deleteTemplate(templateId: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      axios.defaults.headers.post["Content-Type"] = "application/json";
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/templates/${templateId}`;

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
    async searchTemplate(query: string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      
      const tenantUrl = useTenantStore().tenantDomain;
      if (tenantUrl) {
        apiUrl = tenantUrl
      }

      let url = `${apiUrl}/templates/get_by_name/${query}`;
      try {
        const res = await axios.get(url);
        return res.data.data
      } catch (error) {

        return error;
      }
    }
  },
});

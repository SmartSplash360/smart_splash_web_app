import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "~/stores/users";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

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
        (template: any) => template.template_type_id === 1
      );
    },
    getTemplateTypeSMS: (state) => {
      return state.templates.filter(
        (template: any) => template.template_type_id === 2
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
      try {
        const res = await axios.get("http://localhost:8000/api/v1/templates");
        this.templates = res.data.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchTemplate(id: number | string) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/templates/${id}`
        );
        return res.data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async createTemplate(templatePayload: any) {
      const jwt = useUserStore().getJwt;
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/templates`,
          templatePayload
        );
        console.log(res);

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
      try {
        const res = await axios.post(
          `http://localhost:8000/api/v1/templates/${id}`,
          templatePayload
        );
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
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/v1/templates/${templateId}`
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

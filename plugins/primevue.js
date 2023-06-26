import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Avatar from "primevue/avatar";
import DataTable from "primevue/datatable";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import FileUpload from "primevue/fileupload";
import Textarea from "primevue/textarea";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Card from "primevue/card";
import ProgressBar from "primevue/progressbar";
import TieredMenu from "primevue/tieredmenu";
import BadgeDirective from "primevue/badgedirective";
import Editor from "primevue/editor";
import Chart from "primevue/chart";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import RadioButton from "primevue/radiobutton";
import SelectButton from "primevue/selectbutton";
import InputSwitch from "primevue/inputswitch";
import Checkbox from "primevue/checkbox";

import ToastService from "primevue/toastservice";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Avatar", Avatar);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("TreeTable", TreeTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("FileUpload", FileUpload);
  nuxtApp.vueApp.component("Textarea", Textarea);
  nuxtApp.vueApp.component("TabView", TabView);
  nuxtApp.vueApp.component("TabPanel", TabPanel);
  nuxtApp.vueApp.component("Card", Card);
  nuxtApp.vueApp.component("ProgressBar", ProgressBar);
  nuxtApp.vueApp.component("TieredMenu", TieredMenu);
  nuxtApp.vueApp.component("Editor", Editor);
  nuxtApp.vueApp.component("Chart", Chart);
  nuxtApp.vueApp.component("Accordion", Accordion);
  nuxtApp.vueApp.component("AccordionTab", AccordionTab);
  nuxtApp.vueApp.component("RadioButton", RadioButton);
  nuxtApp.vueApp.component("SelectButton", SelectButton);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
  nuxtApp.vueApp.component("Checkbox", Checkbox);


  nuxtApp.vueApp.directive("badge", BadgeDirective);
});

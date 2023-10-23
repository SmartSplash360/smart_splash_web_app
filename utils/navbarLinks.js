const router = useRouter();
export const menuListAdmin = [
  {
    label: "Alert",
    icon: "pi pi-exclamation-triangle",
    command: () => {
      router.push("/alerts");
      setTimeout(() => {
        document.getElementById("add-alert-button").click();
      }, 2000);
    },
  },
  {
    label: "Customer",
    icon: "pi pi-user",
    command: () => {
      router.push("/customers");
      setTimeout(() => {
        document.getElementById("add-customer-button").click();
      }, 2000);
    },
  },
  {
    label: "Technician",
    icon: "pi pi-briefcase",
    command: () => {
      router.push("/technicians");
      setTimeout(() => {
        document.getElementById("add-technician-button").click();
      }, 2000);
    },
  },
  {
    label: "Product",
    icon: "pi pi-box",
    command: () => {
      router.push("/products");
      setTimeout(() => {
        document.getElementById("add-product-button").click();
      }, 2000);
    },
  },
  {
    label: "Service",
    icon: "pi pi-wrench",
    command: () => {
      router.push("/products");
      setTimeout(() => {
        let serviceTab = document.querySelectorAll(".p-tabview-header")[1];
        let tabEl = serviceTab.querySelector(
          ":scope > #pv_id_12_1_header_action"
        );
        document.getElementById("add-service-button").click();
      }, 2000);
    },
  },
  {
    label: "Job",
    icon: "pi pi-user",
    command: () => {
      router.push("/jobs/create-technician-job");
    },
  },
  {
    label: "Quotes",
    icon: "pi pi-file-pdf",
    command: () => {
      router.push("/reports/quotes");
    },
  },
  {
    label: "Invoices",
    icon: "pi pi-file",
    command: () => {
      router.push("/reports/invoices");
    },
  },
];

export const menuListCustomer = [
  {
    label: "Alert",
    icon: "pi pi-exclamation-triangle",
    command: () => {
      router.push("/alerts");
      setTimeout(() => {
        document.getElementById("add-alert-button").click();
      }, 2000);
    },
  },
  {
    label: "Product",
    icon: "pi pi-box",
    command: () => {
      router.push("/products");
      setTimeout(() => {
        document.getElementById("add-product-button").click();
      }, 2000);
    },
  },
  {
    label: "Service",
    icon: "pi pi-wrench",
    command: () => {
      router.push("/products");
      setTimeout(() => {
        let serviceTab = document.querySelectorAll(".p-tabview-header")[1];
        let tabEl = serviceTab.querySelector(
          ":scope > #pv_id_12_1_header_action"
        );
        document.getElementById("add-service-button").click();
      }, 2000);
    },
  },
  {
    label: "Quotes",
    icon: "pi pi-file-pdf",
    command: () => {
      router.push("/reports/quotes");
    },
  },
  {
    label: "Invoices",
    icon: "pi pi-file",
    command: () => {
      router.push("/reports/invoices");
    },
  },
];

export const menuListTechnicina = [
  {
    label: "Alert",
    icon: "pi pi-exclamation-triangle",
    command: () => {
      router.push("/alerts");
      setTimeout(() => {
        document.getElementById("add-alert-button").click();
      }, 2000);
    },
  },
  {
    label: "Product",
    icon: "pi pi-box",
    command: () => {
      router.push("/products");
      setTimeout(() => {
        document.getElementById("add-product-button").click();
      }, 2000);
    },
  },
  {
    label: "Service",
    icon: "pi pi-wrench",
    command: () => {
      router.push("/products");
      setTimeout(() => {
        let serviceTab = document.querySelectorAll(".p-tabview-header")[1];
        let tabEl = serviceTab.querySelector(
          ":scope > #pv_id_12_1_header_action"
        );
        document.getElementById("add-service-button").click();
      }, 2000);
    },
  },
  {
    label: "Quotes",
    icon: "pi pi-file-pdf",
    command: () => {
      router.push("/reports/quotes");
    },
  },
  {
    label: "Invoices",
    icon: "pi pi-file",
    command: () => {
      router.push("/reports/invoices");
    },
  },
];
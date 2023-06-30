export const TechniciansJobs = {
  getData() {
    return [
      {
        id: 1000,
        type: "Route",
        address: "Benton, John B Jr",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        customer: "Damian Marley",
        date: "2019-09-06",
        alert: "",
      },
      {
        id: 1001,
        type: "Route",
        address: "Chanay, Jeffrey A Esq",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Uncompleted",
        customer: "Evan King",
        date: "2019-09-06",
        alert: "",
      },
      {
        id: 1002,
        type: "Route",
        address: "Chemel, James L Cpa",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        customer: "Koamn Kingsley",
        date: "2019-09-06",
        alert: "",
      },
      {
        id: 1003,
        type: "Route",
        address: "Feltz Printing Service",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        customer: "Evan King",
        date: "2019-09-06",
        alert: "",
      },
      {
        id: 1004,
        type: "Route",
        address: "Printing Dimensions",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        customer: "Evan King",
        date: "2019-09-06",
        alert: "",
      },
      {
        id: 1005,
        type: "Route",
        address: "Chapman, Ross E Esq",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Uncompleted",
        customer: "Evan King",
        date: "2019-09-06",
        alert: "",
      },
    ];
  },

  getTechnicianJobsSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getTechnicianJobsMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getTechnicianJobsLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getTechnicianJobsXLarge() {
    return Promise.resolve(this.getData());
  },
};

export const CustomerJobs = {
  getData() {
    return [
      {
        id: 1000,
        type: "Route",
        address: "Benton, John B Jr",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        technicians: "Evan King",
        price: "$2500",
        date: "2019-09-06",
      },
      {
        id: 1001,
        type: "Route",
        address: "Chanay, Jeffrey A Esq",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Uncompleted",
        technicians: "Evan King",
        price: "$2200",
        date: "2019-09-06",
      },
      {
        id: 1002,
        type: "Route",
        address: "Chemel, James L Cpa",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        technicians: "Evan King",
        price: "$2900",
        date: "2019-09-06",
      },
      {
        id: 1003,
        type: "Route",
        address: "Feltz Printing Service",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        technicians: "Evan King",
        price: "$2500",
        date: "2019-09-06",
      },
      {
        id: 1004,
        type: "Route",
        address: "Printing Dimensions",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Completed",
        technicians: "Evan King",
        price: "$2500",
        date: "2019-09-06",
      },
      {
        id: 1005,
        type: "Route",
        address: "Chapman, Ross E Esq",
        bodyOfWater: "Pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "Uncompleted",
        technicians: "Evan King",
        price: "$2500",
        date: "2019-09-06",
      },
    ];
  },

  getCustomersJobsSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersJobsMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersJobsLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersJobsXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomersJobs(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  },
};

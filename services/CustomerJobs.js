export const CustomerJobs = {
  getData() {
    return [
      {
        id: 1000,
        type: "route",
        address: "Benton, John B Jr",
        bodyOfWater: "pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "completed",
        technicians: "Evan King",
        price: "2500",
        date: "2019-09-06",
      },
      {
        id: 1001,
        type: "route",
        address: "Chanay, Jeffrey A Esq",
        bodyOfWater: "pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "completed",
        technicians: "Evan King",
        price: "2500",
        date: "2019-09-06",
      },
      {
        id: 1002,
        type: "route",
        address: "Chemel, James L Cpa",
        bodyOfWater: "pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "completed",
        technicians: "Evan King",
        price: "2500",
        date: "2019-09-06",
      },
      {
        id: 1003,
        type: "route",
        address: "Feltz Printing Service",
        bodyOfWater: "pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "completed",
        technicians: "Evan King",
        price: "2500",
        date: "2019-09-06",
      },
      {
        id: 1004,
        type: "route",
        address: "Printing Dimensions",
        bodyOfWater: "pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "completed",
        technicians: "Evan King",
        price: "2500",
        date: "2019-09-06",
      },
      {
        id: 1005,
        type: "route",
        address: "Chapman, Ross E Esq",
        bodyOfWater: "pool",
        serviceLevel: "Rejuvenate (Sundeck)",
        status: "completed",
        technicians: "Evan King",
        price: "2500",
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

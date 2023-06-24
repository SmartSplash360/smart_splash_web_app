export const ReportServices = {
  getData() {
    return [
      {
        id: 1000,
        property: "James Butt",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2015-09-13",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1001,
        property: "Josephine Darakjy",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2019-02-09",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1002,
        property: "Art Venere",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2017-05-13",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1003,
        property: "Lenna Paprocki",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2020-09-15",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1004,
        property: "Donette Foller",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2016-05-20",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1005,
        property: "Simona Morasca",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2018-02-16",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1006,
        property: "Mitsue Tollner",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2018-02-19",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1007,
        property: "Leota Dilliard",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2019-08-13",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1008,
        property: "Sage Wieser",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2018-11-21",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1009,
        property: "Kris Marrier",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2015-07-07",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
      {
        id: 1010,
        property: "Minna Amigon",
        invoiced: "$0.00",
        chemSpend: "$0.00",
        date: "2018-11-07",
        techPay: "$0.00",
        profit: "$0.00",
        profitRate: "0%",
      },
    ];
  },

  getReportsSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getReportsMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getReportsLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getReportsXLarge() {
    return Promise.resolve(this.getData());
  },

  getReports(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch("https://www.primefaces.org/data/reports?" + queryParams).then(
      (res) => res.json()
    );
  },
};

export const  TemplateList = {
    getData() {
      return [
        {
          id: 1000,
          title: "James Butt",
          content: "Start with a blank email and create your own email design",
          date: "2015-09-13",
          status: true,
          activity: 17,
          image:
            "https://pbs.twimg.com/profile_images/1485050791488483328/UNJ05AV8_400x400.jpg",
          position: "",
        },
        {
          id: 1001,
          title: "Josephine Darakjy",
          content : "Lorem ipsum dolor sit amet consectetur. Sed molestie pharetra urna gravida sed bibendum id tristique.",          
          date: "2019-02-09",
          status: true,
          activity: 0,
          image:
            "https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?s=612x612&w=0&k=20&c=QjebAlXBgee05B3rcLDAtOaMtmdLjtZ5Yg9IJoiy-VY=",
          position: "Communication",
        },
        {
          id: 1002,
          title: "Art Venere",
          content : "Lorem ipsum dolor sit amet consectetur. Sed molestie pharetra urna gravida sed bibendum id tristique.",          
          date: "2017-05-13",
          status: false,
          activity: 63,
          image:
            "https://st4.depositphotos.com/3438085/28961/i/600/depositphotos_289618484-stock-photo-black-african-american-businesswoman-office.jpg",
          position: "Plain",
        },
        {
          id: 1003,
          title: "Donette Foller",
          content : "Lorem ipsum dolor sit amet consectetur. Sed molestie pharetra urna gravida sed bibendum id tristique.",          
          date: "2016-05-20",
          status: true,
          activity: 33,
          image:
            "https://www.vera.org/images/headshots/_800x800_crop_center-center_82_none/Melvin-Washington-V2_200309_203156.jpg?mtime=1646883304",
          position: "Plain",
        },
        {
          id: 1004,
          title: "Donette Foller",
          content : "Lorem ipsum dolor sit amet consectetur. Sed molestie pharetra urna gravida sed bibendum id tristique.",          
          date: "2016-05-20",
          status: true,
          activity: 33,
          image:
            "https://www.vera.org/images/headshots/_800x800_crop_center-center_82_none/Melvin-Washington-V2_200309_203156.jpg?mtime=1646883304",
          position: "Plain",
        },        {
          id: 1005,
          title: "Donette Foller",
          content : "Lorem ipsum dolor sit amet consectetur. Sed molestie pharetra urna gravida sed bibendum id tristique.",          
          date: "2016-05-20",
          status: true,
          activity: 33,
          image:
            "https://www.vera.org/images/headshots/_800x800_crop_center-center_82_none/Melvin-Washington-V2_200309_203156.jpg?mtime=1646883304",
          position: "Plain",
        }
      ];
    },
  
    getTemplatesSmall() {
      return Promise.resolve(this.getData().slice(0, 10));
    },
  
    getTemplatesMedium() {
      return Promise.resolve(this.getData().slice(0, 20));
    },
  
    getTemplatesLarge() {
      return Promise.resolve(this.getData().slice(0, 200));
    },
  
    getTemplatesXLarge() {
      return Promise.resolve(this.getData());
    },
  };
  
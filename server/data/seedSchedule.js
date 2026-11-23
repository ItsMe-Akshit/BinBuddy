export const seedSchedule = {
  wards: [
    {
      id: "ward-4",
      name: "Ward 4 (Greenfield)",
      truckNumber: "KA-04-EC-4210",
      driverName: "Suresh Gowda",
      driverPhone: "+91 98450 12345",
      currentStop: "4th Cross & 2nd Main Junction",
      estimatedArrivalMinutes: 14,
      totalStopsToday: 24,
      completedStopsToday: 18,
      regularDays: {
        wet: ["Monday", "Wednesday", "Friday", "Sunday"],
        dry: ["Tuesday", "Thursday", "Saturday"],
        sanitary: ["Monday", "Wednesday", "Friday"],
        ewaste: ["1st & 3rd Saturday"]
      }
    },
    {
      id: "ward-7",
      name: "Ward 7 (Riverside)",
      truckNumber: "KA-04-EC-8831",
      driverName: "Manjunath R.",
      driverPhone: "+91 98450 23456",
      currentStop: "Riverside Promenade, Sector B",
      estimatedArrivalMinutes: 28,
      totalStopsToday: 20,
      completedStopsToday: 11,
      regularDays: {
        wet: ["Daily"],
        dry: ["Monday", "Wednesday", "Friday"],
        sanitary: ["Tuesday", "Friday"],
        ewaste: ["2nd Saturday"]
      }
    },
    {
      id: "ward-12",
      name: "Ward 12 (Central Market)",
      truckNumber: "KA-04-EC-1904",
      driverName: "Irshad Ahmed",
      driverPhone: "+91 98450 34567",
      currentStop: "Main Wholesale Bazaar Gate",
      estimatedArrivalMinutes: 6,
      totalStopsToday: 32,
      completedStopsToday: 27,
      regularDays: {
        wet: ["Daily (2 Shifts: 6 AM & 3 PM)"],
        dry: ["Daily (Night 9 PM)"],
        sanitary: ["Daily (7 AM)"],
        ewaste: ["Every Sunday"]
      }
    },
    {
      id: "ward-15",
      name: "Ward 15 (Heritage Colony)",
      truckNumber: "KA-04-EC-7729",
      driverName: "Balraj K.",
      driverPhone: "+91 98450 45678",
      currentStop: "Temple Road & 7th Lane",
      estimatedArrivalMinutes: 42,
      totalStopsToday: 18,
      completedStopsToday: 6,
      regularDays: {
        wet: ["Monday", "Tuesday", "Thursday", "Saturday"],
        dry: ["Wednesday", "Sunday"],
        sanitary: ["Monday", "Thursday"],
        ewaste: ["Last Saturday of Month"]
      }
    }
  ],
  rules: {
    wet: {
      color: "#2E7D32",
      title: "Wet / Biodegradable Waste",
      timing: "6:30 AM - 9:00 AM",
      guideline: "Wrap in newsprint or compostable liner. Strictly no plastic bags or packaging."
    },
    dry: {
      color: "#1E88E5",
      title: "Dry / Recyclable Waste",
      timing: "9:30 AM - 12:00 PM",
      guideline: "Clean and dry. Rinse bottles and food cartons. Flatten cardboard."
    },
    sanitary: {
      color: "#E53935",
      title: "Sanitary / Domestic Biomedical",
      timing: "7:00 AM - 9:30 AM",
      guideline: "Wrap securely in paper and mark with a visible red 'X'. Never mix with dry recycling."
    },
    ewaste: {
      color: "#F59E0B",
      title: "E-Waste & Batteries Special Van",
      timing: "10:00 AM - 4:00 PM (Weekends)",
      guideline: "Hand over directly to the authorized recycler van at designated apartment booths."
    }
  }
};

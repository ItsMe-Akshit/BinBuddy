export const initialFallbackTickets = [
  {
    id: "TKT-101",
    title: "Overflowing dumpster outside Colony Park gate",
    category: "Overflowing Dumpster",
    landmark: "Colony Park Gate 2, 4th Cross Road",
    ward: "Ward 4 (Greenfield)",
    description: "The municipal community bin has been spilling over for 3 days onto the pedestrian walkway. Stray animals are scattering plastic waste.",
    status: "Reported",
    upvotes: 19,
    reportedBy: "Aarav Sharma (Resident)",
    reportedAt: new Date(Date.now() - 3.2 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80",
    assignedWorker: null,
    resolutionPhoto: null,
    resolutionNote: null
  },
  {
    id: "TKT-102",
    title: "Industrial chemical barrels & pesticide runoff near storm drain",
    category: "Hazardous / Chemical Spill",
    landmark: "Old Mill Road, Near Canal Culvert",
    ward: "Ward 7 (Riverside)",
    description: "Unmarked barrels with pungent odor discarded in the open ditch. Oily yellow residue leaking towards the stormwater drain.",
    status: "Reported",
    upvotes: 28,
    reportedBy: "Priya Menon (Eco-Marshal)",
    reportedAt: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80",
    assignedWorker: null,
    resolutionPhoto: null,
    resolutionNote: null
  },
  {
    id: "TKT-103",
    title: "Dead canine carcass attracting flies near school bus stop",
    category: "Dead Animal / Biohazard",
    landmark: "St. Jude Convent School Bus Stop, 8th Main",
    ward: "Ward 12 (Central Market)",
    description: "Severe biohazard risk for primary school children. Requires specialized sanitary crew with lime powder and protective gear.",
    status: "Assigned",
    upvotes: 35,
    reportedBy: "Kavita Rao (PTA Secretary)",
    reportedAt: new Date(Date.now() - 2.1 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    assignedWorker: "Ramesh Kumar (Sanitary Squad #3)",
    resolutionPhoto: null,
    resolutionNote: null
  },
  {
    id: "TKT-104",
    title: "Heavy concrete debris and tile rubble dumped on footpath",
    category: "Illegal Construction Debris",
    landmark: "Plot 42, Sunrise Layout, 2nd Avenue",
    ward: "Ward 4 (Greenfield)",
    description: "Renovation contractor dumped two truckloads of brick mortar and broken bathroom tiles directly across the footpath, blocking wheelchair ramp.",
    status: "Assigned",
    upvotes: 14,
    reportedBy: "Vikram Sen",
    reportedAt: new Date(Date.now() - 4.5 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
    assignedWorker: "Deepak Yadav (Tipper Truck Crew #7)",
    resolutionPhoto: null,
    resolutionNote: null
  },
  {
    id: "TKT-105",
    title: "Unsegregated wet vegetable muck rotting behind fish market",
    category: "Unsegregated Waste Pile",
    landmark: "Fish & Poultry Alley, Central Market Block B",
    ward: "Ward 12 (Central Market)",
    description: "Vendors dumping rotten entrails and thermocol fish crates in a heap. Dense swarm of flies and intense odor affecting pedestrians.",
    status: "Reported",
    upvotes: 11,
    reportedBy: "Nitin Patil (Shopkeeper)",
    reportedAt: new Date(Date.now() - 0.9 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80",
    assignedWorker: null,
    resolutionPhoto: null,
    resolutionNote: null
  },
  {
    id: "TKT-106",
    title: "Plastic bottles and single-use bags choking street gutter",
    category: "Clogged Drain with Plastic",
    landmark: "Heritage Archway, Market Street Corner",
    ward: "Ward 15 (Heritage Colony)",
    description: "The storm drain grill is completely choked with discarded plastic beverage cups and polythene packets, causing stagnant black water puddle.",
    status: "Cleaned",
    upvotes: 22,
    reportedBy: "Ananya Deshmukh",
    reportedAt: new Date(Date.now() - 5.0 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80",
    assignedWorker: "Sunil Naik (Rapid Action Squad #1)",
    resolutionPhoto: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    resolutionNote: "Choke removed with manual rakes. 4 bags of plastic sent to Dry Resource Recovery Centre (MRF). Grill cleaned and disinfected."
  },
  {
    id: "TKT-107",
    title: "Shattered liquor bottles and tube light glass along jogging path",
    category: "Broken Glass on Footpath",
    landmark: "Lakeview Jogging Track, East Pavilion",
    ward: "Ward 7 (Riverside)",
    description: "Splinters of beer bottles and broken tube light glass spread across 20 meters. High risk of cuts for morning runners and pet owners.",
    status: "Cleaned",
    upvotes: 16,
    reportedBy: "Dr. Farhan Qureshi",
    reportedAt: new Date(Date.now() - 6.2 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80",
    assignedWorker: "Mahesh Babu (Sweeping Team #5)",
    resolutionPhoto: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80",
    resolutionNote: "Fine broom sweep completed. Hazardous glass shards secured in puncture-proof drums."
  },
  {
    id: "TKT-108",
    title: "Uncollected doorstep wet waste bins for 48 hours",
    category: "Uncollected Doorstep Trash",
    landmark: "Oakwood Apartments Lane, 7th Cross",
    ward: "Ward 15 (Heritage Colony)",
    description: "The morning tipper van missed lanes 7 through 10. Residents left green wet bins outside which are now souring in the sun.",
    status: "Assigned",
    upvotes: 9,
    reportedBy: "Sanjay Singhania (RWA President)",
    reportedAt: new Date(Date.now() - 1.2 * 24 * 60 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=600&q=80",
    assignedWorker: "Ramesh Kumar (Sanitary Squad #3)",
    resolutionPhoto: null,
    resolutionNote: null
  }
];

export const fallbackSchedule = {
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

export const seedItems = [
  // --- WET WASTE (Green Bin) ---
  {
    id: "item-1",
    name: "Banana & Fruit Peels",
    category: "Organic Food Waste",
    stream: "wet",
    binColor: "Green",
    icon: "Banana",
    disposalTip: "Drain excess liquids before disposing. Ideal for home composting or biogas pits.",
    keywords: ["banana", "peel", "fruit", "apple", "orange", "skin"]
  },
  {
    id: "item-2",
    name: "Vegetable Trimmings & Peels",
    category: "Kitchen Scraps",
    stream: "wet",
    binColor: "Green",
    icon: "Carrot",
    disposalTip: "Keep raw vegetable waste separate from oily cooked gravies for optimal compost.",
    keywords: ["vegetable", "carrot", "potato", "onion", "peel", "trimmings"]
  },
  {
    id: "item-3",
    name: "Used Tea Bags & Loose Tea Leaves",
    category: "Organic Food Waste",
    stream: "wet",
    binColor: "Green",
    icon: "Coffee",
    disposalTip: "Remove metallic staples or synthetic strings if present before tossing into green bin.",
    keywords: ["tea", "tea bag", "chai", "leaves"]
  },
  {
    id: "item-4",
    name: "Coffee Grounds & Paper Filters",
    category: "Kitchen Scraps",
    stream: "wet",
    binColor: "Green",
    icon: "Coffee",
    disposalTip: "Coffee grounds enrich compost soil with nitrogen. Both unbleached paper filters and grounds are wet waste.",
    keywords: ["coffee", "grounds", "filter", "espresso"]
  },
  {
    id: "item-5",
    name: "Eggshells",
    category: "Organic Kitchen Waste",
    stream: "wet",
    binColor: "Green",
    icon: "Egg",
    disposalTip: "Crush eggshells to accelerate composting breakdown in municipal green collection.",
    keywords: ["egg", "eggshell", "shell", "omelette"]
  },
  {
    id: "item-6",
    name: "Cooked Leftover Rice & Pasta",
    category: "Cooked Food",
    stream: "wet",
    binColor: "Green",
    icon: "Utensils",
    disposalTip: "Wrap in a dry paper napkin if overly soggy to prevent leaking in the bin liner.",
    keywords: ["rice", "pasta", "noodles", "leftover", "food"]
  },
  {
    id: "item-7",
    name: "Stale Bread & Bakery Scraps",
    category: "Food Waste",
    stream: "wet",
    binColor: "Green",
    icon: "Wheat",
    disposalTip: "Completely biodegradable. Can be mixed directly into organic bin.",
    keywords: ["bread", "roti", "bakery", "crust", "bun"]
  },
  {
    id: "item-8",
    name: "Chicken Bones & Meat Scraps",
    category: "Non-Veg Scraps",
    stream: "wet",
    binColor: "Green",
    icon: "Drumstick",
    disposalTip: "Ensure wrapped securely to deter stray animals during doorstep collection.",
    keywords: ["bone", "meat", "chicken", "mutton", "fish", "scraps"]
  },
  {
    id: "item-9",
    name: "Fallen Garden Leaves & Grass Clippings",
    category: "Horticulture",
    stream: "wet",
    binColor: "Green",
    icon: "Leaf",
    disposalTip: "Dry leaves can be pooled in community dry-leaf composting cages.",
    keywords: ["leaf", "leaves", "grass", "garden", "lawn", "hedge"]
  },
  {
    id: "item-10",
    name: "Wilted Flowers & Puja Offerings",
    category: "Floral Waste",
    stream: "wet",
    binColor: "Green",
    icon: "Flower2",
    disposalTip: "Remove plastic thread, foil, or agarbatti packaging before composting sacred flowers.",
    keywords: ["flower", "rose", "garland", "puja", "bouquet", "floral"]
  },
  {
    id: "item-11",
    name: "Used Paper Napkins & Soiled Tissues",
    category: "Soiled Paper",
    stream: "wet",
    binColor: "Green",
    icon: "FileText",
    disposalTip: "Napkins stained with food fats cannot be recycled as dry paper. Treat as wet waste.",
    keywords: ["tissue", "napkin", "paper towel", "soiled", "grease"]
  },
  {
    id: "item-12",
    name: "Pizza Box Bottom (Oil / Cheese Soaked)",
    category: "Soiled Cardboard",
    stream: "wet",
    binColor: "Green",
    icon: "Pizza",
    disposalTip: "Tear off the greasy base for wet waste; the clean dry cardboard lid goes into Blue dry bin.",
    keywords: ["pizza", "box", "greasy", "cardboard", "cheese"]
  },
  {
    id: "item-13",
    name: "Coconut Shell & Husk",
    category: "Organic Hard Fiber",
    stream: "wet",
    binColor: "Green",
    icon: "CircleDot",
    disposalTip: "Fibrous coconut husks take longer to degrade; place in dedicated horticulture or wet bin.",
    keywords: ["coconut", "shell", "husk", "coir"]
  },

  // --- DRY WASTE (Blue Bin) ---
  {
    id: "item-14",
    name: "PET Water & Soda Bottles",
    category: "Recyclable Plastics",
    stream: "dry",
    binColor: "Blue",
    icon: "Bottle",
    disposalTip: "Empty liquids, rinse lightly, crush flat, and replace cap to save truck volume.",
    keywords: ["plastic bottle", "pet", "water bottle", "soda", "coke"]
  },
  {
    id: "item-15",
    name: "Cardboard Shipping & Courier Boxes",
    category: "Paper & Cardboard",
    stream: "dry",
    binColor: "Blue",
    icon: "Package",
    disposalTip: "Flatten boxes completely. Remove broad packing tapes and label stickers if possible.",
    keywords: ["cardboard", "box", "amazon", "carton", "shipping"]
  },
  {
    id: "item-16",
    name: "Newspapers & Daily Gazettes",
    category: "Clean Paper",
    stream: "dry",
    binColor: "Blue",
    icon: "Newspaper",
    disposalTip: "Tie in neat bundles with twine. Keep dry to maximize scrap paper recycling rate.",
    keywords: ["newspaper", "paper", "gazette", "newsprint"]
  },
  {
    id: "item-17",
    name: "Aluminium Drink Cans",
    category: "Metal Scrap",
    stream: "dry",
    binColor: "Blue",
    icon: "Circle",
    disposalTip: "100% infinitely recyclable! Rinse thoroughly to deter fruit flies and crush.",
    keywords: ["can", "aluminium", "beer can", "coke can", "tin"]
  },
  {
    id: "item-18",
    name: "Clean Glass Sauce & Jam Jars",
    category: "Glassware",
    stream: "dry",
    binColor: "Blue",
    icon: "Wine",
    disposalTip: "Rinse food residues. Remove metal lid (metal lid also goes into blue dry bin).",
    keywords: ["glass", "jar", "jam", "sauce bottle", "pickle jar"]
  },
  {
    id: "item-19",
    name: "Tin & Canned Food Containers",
    category: "Metal Scrap",
    stream: "dry",
    binColor: "Blue",
    icon: "Disc",
    disposalTip: "Rinse away food traces and push lid inside container to protect sanitation handlers.",
    keywords: ["tin", "can", "canned food", "metal tin"]
  },
  {
    id: "item-20",
    name: "Magazines & Glossy Brochures",
    category: "Paper",
    stream: "dry",
    binColor: "Blue",
    icon: "BookOpen",
    disposalTip: "Recyclable with dry paper stream. Keep dry away from rainfall.",
    keywords: ["magazine", "brochure", "catalog", "glossy paper"]
  },
  {
    id: "item-21",
    name: "HDPE Shampoo & Conditioner Bottles",
    category: "Rigid Plastics",
    stream: "dry",
    binColor: "Blue",
    icon: "ShowerHead",
    disposalTip: "Pump nozzles with metal springs go to non-recyclable; plastic bottle body is fully recyclable.",
    keywords: ["shampoo", "conditioner", "soap bottle", "hdpe", "cosmetic"]
  },
  {
    id: "item-22",
    name: "Plastic Milk Pouches & Jugs",
    category: "Soft / Rigid Plastics",
    stream: "dry",
    binColor: "Blue",
    icon: "Milk",
    disposalTip: "Wash and dry pouches completely! Unwashed milk pouches cause foul stench and contaminate bales.",
    keywords: ["milk", "pouch", "packet", "jug", "dairy"]
  },
  {
    id: "item-23",
    name: "Tetra Pak Juice & Milk Cartons",
    category: "Multilayer Packaging",
    stream: "dry",
    binColor: "Blue",
    icon: "Box",
    disposalTip: "Rinse, flatten completely, and pop straw into the carton so it doesn't become microplastic litter.",
    keywords: ["tetrapak", "tetra pak", "juice carton", "frooti", "soy milk"]
  },
  {
    id: "item-24",
    name: "Office A4 Paper & Notebooks",
    category: "Paper",
    stream: "dry",
    binColor: "Blue",
    icon: "File",
    disposalTip: "Spiral metal bindings can be pulled off and recycled with metal scrap.",
    keywords: ["paper", "a4", "notebook", "print", "envelope"]
  },
  {
    id: "item-25",
    name: "Plastic Bottle Caps & Jar Lids",
    category: "Rigid Plastics",
    stream: "dry",
    binColor: "Blue",
    icon: "Disc",
    disposalTip: "Keep screwed onto empty crushed bottles so they don't fall through sorting grates.",
    keywords: ["cap", "bottle cap", "lid", "plastic lid"]
  },
  {
    id: "item-26",
    name: "Bubble Wrap & Clean Polythene",
    category: "Flexible Plastics",
    stream: "dry",
    binColor: "Blue",
    icon: "Layers",
    disposalTip: "Bundle together into a single transparent bag so plastic thin films don't blow away in wind.",
    keywords: ["bubble wrap", "air pillows", "plastic wrap", "polythene", "packaging"]
  },
  {
    id: "item-27",
    name: "Clean Grocery Paper Bags",
    category: "Paper",
    stream: "dry",
    binColor: "Blue",
    icon: "ShoppingBag",
    disposalTip: "High-grade recyclable fiber. Reuse multiple times before discarding.",
    keywords: ["paper bag", "kraft bag", "shopping bag"]
  },
  {
    id: "item-28",
    name: "Empty Aerosol Spray Cans (Deodorant/Air Freshener)",
    category: "Metal Containers",
    stream: "dry",
    binColor: "Blue",
    icon: "SprayCan",
    disposalTip: "Must be completely empty of pressure and propellant before entering dry metal recycling.",
    keywords: ["aerosol", "deodorant", "spray can", "air freshener"]
  },
  {
    id: "item-29",
    name: "Clean Dry Egg Carton (Pressed Pulp)",
    category: "Molded Pulp",
    stream: "dry",
    binColor: "Blue",
    icon: "Grid",
    disposalTip: "Dry clean cartons recycle easily or can be shredded for carbon matter in home composting.",
    keywords: ["egg carton", "pulp tray", "egg box"]
  },
  {
    id: "item-30",
    name: "Broken Plastic Buckets & Mugs",
    category: "Hard Plastic",
    stream: "dry",
    binColor: "Blue",
    icon: "Archive",
    disposalTip: "Polypropylene (PP) hard plastics are eagerly recovered by city informal scrap aggregators.",
    keywords: ["bucket", "mug", "basin", "broken plastic", "tub"]
  },

  // --- SANITARY WASTE (Red Bin) ---
  {
    id: "item-31",
    name: "Used Menstrual & Sanitary Pads",
    category: "Sanitary Hygiene",
    stream: "sanitary",
    binColor: "Red",
    icon: "ShieldAlert",
    disposalTip: "Wrap tightly in newspaper with a distinct red 'X' cross symbol for dignified handling.",
    keywords: ["pad", "sanitary", "menstrual", "tampon", "period"]
  },
  {
    id: "item-32",
    name: "Used Baby Diapers",
    category: "Sanitary Waste",
    stream: "sanitary",
    binColor: "Red",
    icon: "Baby",
    disposalTip: "Empty solid feces into toilet bowl, roll diaper tightly, secure with sticky tabs, and bag separately.",
    keywords: ["diaper", "baby diaper", "nappy", "pampers"]
  },
  {
    id: "item-33",
    name: "Used Adult Incontinence Diapers",
    category: "Sanitary Waste",
    stream: "sanitary",
    binColor: "Red",
    icon: "HeartHandshake",
    disposalTip: "Wrap in opaque biodegradable bags and deposit straight into the municipal sanitary stream.",
    keywords: ["adult diaper", "incontinence", "pull ups"]
  },
  {
    id: "item-34",
    name: "Used Band-Aids & Sterile Gauze",
    category: "Medical Hygiene",
    stream: "sanitary",
    binColor: "Red",
    icon: "Bandage",
    disposalTip: "Contaminated with blood or bodily fluids. Incineration grade sanitary stream only.",
    keywords: ["band-aid", "bandage", "gauze", "wound dressing", "cotton"]
  },
  {
    id: "item-35",
    name: "Cotton Earbuds & Swabs",
    category: "Hygiene",
    stream: "sanitary",
    binColor: "Red",
    icon: "Ear",
    disposalTip: "Plastic sticks do not degrade and earwax carries pathogens. Never flush down toilet.",
    keywords: ["earbud", "cotton swab", "q-tip", "swab"]
  },
  {
    id: "item-36",
    name: "Disposable Medical Face Masks",
    category: "Personal Protection",
    stream: "sanitary",
    binColor: "Red",
    icon: "Shield",
    disposalTip: "Cut elastic ear loops so wildlife is not entangled; wrap in newspaper before disposal.",
    keywords: ["mask", "surgical mask", "n95", "face mask"]
  },
  {
    id: "item-37",
    name: "Used Dental Floss & Floss Picks",
    category: "Hygiene",
    stream: "sanitary",
    binColor: "Red",
    icon: "Smile",
    disposalTip: "Nylon filaments damage water treatment pumps if flushed. Bin with sanitary waste.",
    keywords: ["floss", "dental floss", "flosser", "teeth"]
  },
  {
    id: "item-38",
    name: "Expired Pills & Blister Packs",
    category: "Pharmaceuticals",
    stream: "sanitary",
    binColor: "Red",
    icon: "Pill",
    disposalTip: "Do not crush or flush down sewer sinks. Return to pharmacy buy-back or city red bin.",
    keywords: ["medicine", "pills", "tablets", "capsules", "expired drugs"]
  },

  // --- E-WASTE (Amber / Orange Bin) ---
  {
    id: "item-39",
    name: "Dead AA / AAA Alkaline Batteries",
    category: "Portable Batteries",
    stream: "ewaste",
    binColor: "Amber",
    icon: "BatteryMedium",
    disposalTip: "Tape terminals with scotch tape to prevent short-circuit sparks in communal e-bins.",
    keywords: ["battery", "aa battery", "aaa battery", "cell", "alkaline"]
  },
  {
    id: "item-40",
    name: "Old Smartphone & Feature Phones",
    category: "Telecom Electronics",
    stream: "ewaste",
    binColor: "Amber",
    icon: "Smartphone",
    disposalTip: "Perform factory reset to protect personal data before depositing for safe precious metal retrieval.",
    keywords: ["phone", "smartphone", "mobile", "android", "iphone"]
  },
  {
    id: "item-41",
    name: "Tangled Phone & USB Charging Cables",
    category: "Cables & Wiring",
    stream: "ewaste",
    binColor: "Amber",
    icon: "Cable",
    disposalTip: "Copper core inside is highly valuable. Bundle with rubber bands for e-waste drives.",
    keywords: ["cable", "usb cable", "charger", "cord", "lightning"]
  },
  {
    id: "item-42",
    name: "Burned Out LED Light Bulbs",
    category: "Solid State Lighting",
    stream: "ewaste",
    binColor: "Amber",
    icon: "Lightbulb",
    disposalTip: "LEDs have driver circuit boards. Keep separate from fragile fluorescent gas tubes.",
    keywords: ["led", "bulb", "led lamp", "lighting"]
  },
  {
    id: "item-43",
    name: "Broken Headphones & Earphones",
    category: "Audio Accessories",
    stream: "ewaste",
    binColor: "Amber",
    icon: "Headphones",
    disposalTip: "Contains rare earth magnets and copper coils. Hand over at monthly e-waste collection drives.",
    keywords: ["headphone", "earphone", "airpods", "headset"]
  },
  {
    id: "item-44",
    name: "Broken Laptop Charger & Power Brick",
    category: "Power Electronics",
    stream: "ewaste",
    binColor: "Amber",
    icon: "Zap",
    disposalTip: "Keep power brick with its detachable AC cord for registered recycler processing.",
    keywords: ["charger", "adapter", "power brick", "laptop charger"]
  },
  {
    id: "item-45",
    name: "Old Computer Mouse & Keyboard",
    category: "IT Peripherals",
    stream: "ewaste",
    binColor: "Amber",
    icon: "Mouse",
    disposalTip: "Electronics contain flame retardant plastics. Hand over to authorized dismantler.",
    keywords: ["mouse", "keyboard", "pc accessory", "trackpad"]
  },
  {
    id: "item-46",
    name: "Lithium-Ion Power Bank",
    category: "Portable Power",
    stream: "ewaste",
    binColor: "Amber",
    icon: "BatteryCharging",
    disposalTip: "Never puncture or drop in normal bins! High fire risk if compacted by garbage trucks.",
    keywords: ["power bank", "lithium", "battery pack", "portable charger"]
  },

  // --- HAZARDOUS WASTE (Red Hazard Bin) ---
  {
    id: "item-47",
    name: "Broken Tube Light / Fluorescent Lamp",
    category: "Hazardous Chemical / Gas",
    stream: "hazard",
    binColor: "Red Hazard",
    icon: "AlertTriangle",
    disposalTip: "DANGER: Contains toxic mercury vapor. Do NOT shatter. Wrap unbroken tubes in newspaper or corrugated sleeve.",
    keywords: ["tube light", "fluorescent", "cfl", "broken glass", "mercury", "light"]
  },
  {
    id: "item-48",
    name: "Paint Thinner, Turpentine & Solvent Cans",
    category: "Flammable Chemicals",
    stream: "hazard",
    binColor: "Red Hazard",
    icon: "Flame",
    disposalTip: "Highly flammable volatile organic compounds. Tightly seal lid and drop at toxic waste depot.",
    keywords: ["paint thinner", "turpentine", "solvent", "varnish", "paint"]
  },
  {
    id: "item-49",
    name: "Pesticide & Insect Spray Containers",
    category: "Toxic Agrochem",
    stream: "hazard",
    binColor: "Red Hazard",
    icon: "Skull",
    disposalTip: "Poisonous chemicals contaminate soil water tables. Triple rinse only if directed; hand to toxic hazard van.",
    keywords: ["pesticide", "insecticide", "hit spray", "poison", "pest"]
  },
  {
    id: "item-50",
    name: "Broken Mercury Clinical Thermometer",
    category: "Heavy Metal Hazard",
    stream: "hazard",
    binColor: "Red Hazard",
    icon: "ThermometerSnowflake",
    disposalTip: "Never vacuum spilled mercury beads! Scoop carefully with cardboard into a sealed glass jar with water.",
    keywords: ["thermometer", "mercury", "clinical", "glass thermometer"]
  }
];

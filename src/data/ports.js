// Kerala Ports and Maritime Infrastructure Data
// Sources: Kerala Maritime Board (KMB) & Ministry of Ports, Shipping and Waterways
// 1 Major Port (Central Government / Port Authority) + 17 Notified Non-Major Ports (under Kerala Maritime Board)

export const keralaPorts = [
  {
    id: "cochin",
    name: "Cochin Port",
    classification: "Major Port",
    status: "Operational",
    type: "All-weather natural deep-water port with dedicated International Container Transshipment Terminal (ICTT Vallarpadam)",
    district: "Ernakulam",
    details:
      "India's premier maritime spice gateway on the Arabian Sea. Equipped with full commercial container handling, bulk cargo berths, and direct global liner connectivity.",
    spiceExportRole: "Primary commercial gateway used for maritime spice export shipments from Kerala.",
  },
  {
    id: "vizhinjam",
    name: "Vizhinjam Port",
    classification: "Notified Non-Major Port",
    status: "Operational / Commissioning",
    type: "Deep-water international multi-purpose transshipment seaport",
    district: "Thiruvananthapuram",
    details:
      "Strategic deep-water transshipment facility located close to international east-west shipping channels, equipped for ultra-large container vessels.",
    spiceExportRole: "Modern deep-water transshipment infrastructure enhancing South India's maritime export capabilities.",
  },
  {
    id: "beypore",
    name: "Beypore Port",
    classification: "Notified Non-Major Port",
    status: "Operational",
    type: "Riverine coastal port & historic trading wharf",
    district: "Kozhikode",
    details:
      "Historic maritime hub near the mouth of the Chaliyar River, handling regional coastal cargo, passenger traffic to Lakshadweep, and lighterage vessels.",
    spiceExportRole: "Historic North Kerala trading port connecting Malabar coastal commerce.",
  },
  {
    id: "kollam",
    name: "Kollam Port",
    classification: "Notified Non-Major Port",
    status: "Operational",
    type: "Coastal cargo port with modern wharf facilities",
    district: "Kollam",
    details:
      "All-weather coastal port handling general bulk cargo, raw cashew shipments, and domestic container feeder services along the southwest coast.",
    spiceExportRole: "Southern Kerala coastal trade infrastructure with customs clearance capability.",
  },
  {
    id: "azhikkal",
    name: "Azhikkal Port",
    classification: "Notified Non-Major Port",
    status: "Operational",
    type: "Estuarine coastal cargo port",
    district: "Kannur",
    details:
      "Situated at the mouth of the Valapattanam River in North Malabar, supporting coastal container feeder movements, cement, and regional trade.",
    spiceExportRole: "Regional North Malabar maritime facility supporting coastal connectivity.",
  },
  {
    id: "neendakara",
    name: "Neendakara Port",
    classification: "Notified Non-Major Port",
    status: "Operational / Fishing & Coastal",
    type: "Estuarine port at the confluence of Ashtamudi Lake and the Arabian Sea",
    district: "Kollam",
    details:
      "Historically significant coastal port and major marine hub with facilities for intermediate vessels and coastal navigation.",
    spiceExportRole: "Part of the notified port network administered by Kerala Maritime Board.",
  },
  {
    id: "alappuzha",
    name: "Alappuzha Port",
    classification: "Notified Non-Major Port",
    status: "Under Development / Heritage",
    type: "Historic open roadstead port with historic sea pier",
    district: "Alappuzha",
    details:
      "Celebrated historic port of Travancore that previously handled coir and spice exports; currently earmarked for maritime tourism and coastal revitalization.",
    spiceExportRole: "Historic heritage port of the Central Travancore spice and coir trade.",
  },
  {
    id: "kayamkulam",
    name: "Kayamkulam Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Development Stage",
    type: "Tidal inlet & coastal port area",
    district: "Alappuzha",
    details:
      "Notified port area located around the Kayamkulam backwaters and barrier beach, with ongoing maritime planning under KMB.",
    spiceExportRole: "Notified port location in Kerala's maritime network.",
  },
  {
    id: "valiyathura",
    name: "Valiyathura Port",
    classification: "Notified Non-Major Port",
    status: "Inactive for Commercial Cargo / Heritage",
    type: "Historic open sea pier",
    district: "Thiruvananthapuram",
    details:
      "Historic pier that served southern Kerala before modern containerization; now preserved as a coastal landmark with no commercial cargo operations.",
    spiceExportRole: "Historic heritage port site in southern Kerala.",
  },
  {
    id: "ponnani",
    name: "Ponnani Port",
    classification: "Notified Non-Major Port",
    status: "Under Development",
    type: "Estuarine tidal port at the mouth of Bharathapuzha",
    district: "Malappuram",
    details:
      "Historic Malabar maritime town with a notified port area undergoing phased commercial development for coastal cargo and small craft handling.",
    spiceExportRole: "Notified port infrastructure under the Kerala Maritime Board development plan.",
  },
  {
    id: "vatakara",
    name: "Vatakara Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Non-Operational for Cargo",
    type: "Coastal roadstead port",
    district: "Kozhikode",
    details:
      "Notified coastal port location in northern Kerala, historically active in coastal timber and produce lighterage.",
    spiceExportRole: "Notified non-major port under Kerala state jurisdiction.",
  },
  {
    id: "kozhikode",
    name: "Kozhikode Port",
    classification: "Notified Non-Major Port",
    status: "Inactive for Commercial Cargo / Heritage",
    type: "Historic open roadstead anchorage & sea piers",
    district: "Kozhikode",
    details:
      "The legendary 'City of Spices' port where historic spice galleons anchored. Modern commercial cargo operations in the district are handled at Beypore.",
    spiceExportRole: "The cradle of Malabar maritime spice trade history; commercial operations handled at nearby Beypore.",
  },
  {
    id: "thalassery",
    name: "Thalassery Port",
    classification: "Notified Non-Major Port",
    status: "Inactive for Commercial Cargo / Heritage",
    type: "Historic sea pier and roadstead",
    district: "Kannur",
    details:
      "Famous colonial spice port on the Malabar coast with an iconic sea pier; currently inactive for commercial cargo vessel movements.",
    spiceExportRole: "Historic center of northern Malabar spice trade.",
  },
  {
    id: "kannur",
    name: "Kannur Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Non-Operational for Cargo",
    type: "Coastal port location",
    district: "Kannur",
    details:
      "Notified port area along the northern coast. Most regional maritime traffic is accommodated at Azhikkal Port.",
    spiceExportRole: "Notified non-major port within the Kerala Maritime Board network.",
  },
  {
    id: "neeleswaram",
    name: "Neeleswaram Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Development Stage",
    type: "River mouth coastal inlet",
    district: "Kasaragod",
    details:
      "Notified port area located near the confluence of local river systems in Kasaragod district, planned for future coastal utilization.",
    spiceExportRole: "Part of the notified port framework of northern Kerala.",
  },
  {
    id: "manjeswaram",
    name: "Manjeswaram Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Non-Operational for Cargo",
    type: "Northernmost coastal roadstead area",
    district: "Kasaragod",
    details:
      "Located at the northern border of Kerala, designated as a notified minor port under state maritime jurisdiction.",
    spiceExportRole: "Northernmost notified maritime location in Kerala.",
  },
  {
    id: "kasaragod",
    name: "Kasaragod Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Small Craft Facility",
    type: "Riverine estuary port at Chandragiri river mouth",
    district: "Kasaragod",
    details:
      "Notified coastal port area handling local craft movements; included in state maritime development surveys.",
    spiceExportRole: "Notified minor port in northern Kerala.",
  },
  {
    id: "kodungalloor",
    name: "Kodungalloor Port",
    classification: "Notified Non-Major Port",
    status: "Notified / Under Development",
    type: "Estuarine port near ancient Muziris trade basin",
    district: "Thrissur",
    details:
      "Located near the legendary ancient spice trade capital of Muziris; notified as a non-major port for coastal and riverine craft integration.",
    spiceExportRole: "Historic epicenter of ancient Roman and Greek spice trade voyages.",
  },
];

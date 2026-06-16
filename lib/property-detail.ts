import {
  Waves,
  Dumbbell,
  Car,
  Wifi,
  Snowflake,
  Flame,
  ShieldCheck,
  Trees,
  Utensils,
  Sun,
  Wind,
  Tv,
  type LucideIcon,
} from "lucide-react"

export interface SpecItem {
  label: string
  value: string
}

export interface Amenity {
  icon: LucideIcon
  label: string
}

export interface FloorPlan {
  id: string
  name: string
  level: string
  area: number
  beds: number
  baths: number
  image: string
}

export interface Institution {
  name: string
  type: string
  distance: string
  rating: number
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface PropertyDetail {
  id: string
  title: string
  address: string
  neighborhood: string
  price: number
  pricePerSqFt: number
  status: string
  beds: number
  baths: number
  area: number
  yearBuilt: number
  hoa: number
  description: string[]
  gallery: GalleryImage[]
  specs: SpecItem[]
  amenities: Amenity[]
  floorPlans: FloorPlan[]
  schools: Institution[]
  hospitals: Institution[]
  transit: Institution[]
  agent: {
    name: string
    title: string
    agency: string
    image: string
    phone: string
    rating: number
    deals: number
  }
}

export const propertyDetail: PropertyDetail = {
  id: "p1",
  title: "Skyline Glass Penthouse",
  address: "Burj Vista Tower 1, Downtown Dubai",
  neighborhood: "Downtown, Dubai",
  price: 4850000,
  pricePerSqFt: 782,
  status: "For Sale",
  beds: 4,
  baths: 5,
  area: 6200,
  yearBuilt: 2021,
  hoa: 2400,
  description: [
    "Perched on the upper floors of Burj Vista, this glass-wrapped penthouse delivers uninterrupted views of the Burj Khalifa and the Dubai Fountain. Floor-to-ceiling glazing floods the open-plan living spaces with natural light from sunrise to dusk.",
    "A private wraparound terrace with an infinity-edge pool extends the living area outdoors, while the chef's kitchen, smart-home automation, and a dedicated staff suite make this residence as functional as it is breathtaking.",
  ],
  gallery: [
    { src: "/pdp/living-room.png", alt: "Open-plan living room with skyline views" },
    { src: "/pdp/terrace.png", alt: "Private terrace with infinity pool" },
    { src: "/pdp/kitchen.png", alt: "Chef's kitchen with marble island" },
    { src: "/pdp/bedroom.png", alt: "Master bedroom suite" },
    { src: "/pdp/bathroom.png", alt: "Spa-style master bathroom" },
    { src: "/pdp/dining.png", alt: "Formal dining area" },
  ],
  specs: [
    { label: "Bedrooms", value: "4" },
    { label: "Bathrooms", value: "5" },
    { label: "Interior", value: "6,200 ft²" },
    { label: "Year Built", value: "2021" },
    { label: "HOA / month", value: "$2,400" },
    { label: "Parking", value: "3 Covered" },
  ],
  amenities: [
    { icon: Waves, label: "Infinity Pool" },
    { icon: Dumbbell, label: "Private Gym" },
    { icon: Car, label: "Valet Parking" },
    { icon: Wifi, label: "Smart Home" },
    { icon: Snowflake, label: "Central A/C" },
    { icon: Flame, label: "Gas Fireplace" },
    { icon: ShieldCheck, label: "24/7 Security" },
    { icon: Trees, label: "Sky Garden" },
    { icon: Utensils, label: "Chef's Kitchen" },
    { icon: Sun, label: "Wraparound Terrace" },
    { icon: Wind, label: "Air Purification" },
    { icon: Tv, label: "Home Cinema" },
  ],
  floorPlans: [
    {
      id: "fp1",
      name: "Main Level",
      level: "Floor 42",
      area: 3800,
      beds: 2,
      baths: 3,
      image: "/pdp/floorplan-1.png",
    },
    {
      id: "fp2",
      name: "Upper Level",
      level: "Floor 43",
      area: 2400,
      beds: 2,
      baths: 2,
      image: "/pdp/floorplan-2.png",
    },
  ],
  schools: [
    { name: "Dubai International Academy", type: "K-12 · IB", distance: "0.8 mi", rating: 9.2 },
    { name: "GEMS Wellington Primary", type: "Primary", distance: "1.2 mi", rating: 8.7 },
    { name: "Repton School Dubai", type: "Secondary", distance: "2.4 mi", rating: 9.0 },
  ],
  hospitals: [
    { name: "Mediclinic City Hospital", type: "General · 24h ER", distance: "1.1 mi", rating: 4.7 },
    { name: "Emirates Specialty Hospital", type: "Specialty", distance: "1.9 mi", rating: 4.6 },
    { name: "Aster Clinic Downtown", type: "Clinic", distance: "0.6 mi", rating: 4.5 },
  ],
  transit: [
    { name: "Burj Khalifa / Dubai Mall Metro", type: "Red Line", distance: "0.5 mi", rating: 5 },
    { name: "Downtown Tram Stop", type: "Tram", distance: "0.7 mi", rating: 4 },
    { name: "Sheikh Zayed Road Access", type: "Highway", distance: "0.3 mi", rating: 5 },
  ],
  agent: {
    name: "Sofia Marchetti",
    title: "Principal Broker",
    agency: "Melhek Private Office",
    image: "/agents/agent-1.png",
    phone: "+971 4 123 4567",
    rating: 4.9,
    deals: 312,
  },
}

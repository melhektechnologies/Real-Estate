export interface Property {
  id: string
  title: string
  location: string
  price: number
  beds: number
  baths: number
  area: number
  type: string
  verified: boolean
  images: string[]
  coords: { x: number; y: number }
}

export interface Neighborhood {
  id: string
  name: string
  country: string
  image: string
  listings: number
  avgPrice: string
}

export interface Agent {
  id: string
  name: string
  title: string
  image: string
  deals: number
  rating: number
  specialty: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
}

export const properties: Property[] = [
  {
    id: "p1",
    title: "Skyline Glass Penthouse",
    location: "Downtown, Dubai",
    price: 4850000,
    beds: 4,
    baths: 5,
    area: 6200,
    type: "Penthouse",
    verified: true,
    images: ["/properties/penthouse-dubai.png", "/properties/estate-california.png"],
    coords: { x: 28, y: 34 },
  },
  {
    id: "p2",
    title: "Minimalist Hillside Villa",
    location: "Beverly Hills, CA",
    price: 7200000,
    beds: 6,
    baths: 7,
    area: 9100,
    type: "Villa",
    verified: true,
    images: ["/properties/villa-modern.png", "/properties/apartment-singapore.png"],
    coords: { x: 62, y: 58 },
  },
  {
    id: "p3",
    title: "Industrial Loft Residence",
    location: "SoHo, New York",
    price: 3150000,
    beds: 3,
    baths: 3,
    area: 4400,
    type: "Loft",
    verified: true,
    images: ["/properties/loft-nyc.png", "/properties/townhouse-london.png"],
    coords: { x: 45, y: 22 },
  },
  {
    id: "p4",
    title: "Georgian Heritage Townhouse",
    location: "Kensington, London",
    price: 5650000,
    beds: 5,
    baths: 4,
    area: 5800,
    type: "Townhouse",
    verified: true,
    images: ["/properties/townhouse-london.png", "/properties/loft-nyc.png"],
    coords: { x: 74, y: 40 },
  },
  {
    id: "p5",
    title: "Marina Bay Sky Residence",
    location: "Marina Bay, Singapore",
    price: 4100000,
    beds: 4,
    baths: 4,
    area: 5100,
    type: "Apartment",
    verified: true,
    images: ["/properties/apartment-singapore.png", "/properties/penthouse-dubai.png"],
    coords: { x: 38, y: 70 },
  },
  {
    id: "p6",
    title: "Cliffside Modern Estate",
    location: "Malibu, CA",
    price: 9800000,
    beds: 7,
    baths: 8,
    area: 12400,
    type: "Estate",
    verified: false,
    images: ["/properties/estate-california.png", "/properties/villa-modern.png"],
    coords: { x: 55, y: 48 },
  },
]

export const neighborhoods: Neighborhood[] = [
  {
    id: "n1",
    name: "Dubai",
    country: "United Arab Emirates",
    image: "/neighborhoods/dubai.png",
    listings: 1284,
    avgPrice: "$2.4M",
  },
  {
    id: "n2",
    name: "New York",
    country: "United States",
    image: "/neighborhoods/new-york.png",
    listings: 2156,
    avgPrice: "$3.1M",
  },
  {
    id: "n3",
    name: "London",
    country: "United Kingdom",
    image: "/neighborhoods/london.png",
    listings: 1742,
    avgPrice: "£2.8M",
  },
  {
    id: "n4",
    name: "Singapore",
    country: "Singapore",
    image: "/neighborhoods/singapore.png",
    listings: 968,
    avgPrice: "$3.6M",
  },
]

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Sofia Marchetti",
    title: "Principal Broker",
    image: "/agents/agent-1.png",
    deals: 312,
    rating: 4.9,
    specialty: "Luxury Penthouses",
  },
  {
    id: "a2",
    name: "James Okafor",
    title: "Senior Advisor",
    image: "/agents/agent-2.png",
    deals: 268,
    rating: 4.8,
    specialty: "Commercial Estates",
  },
  {
    id: "a3",
    name: "Amara Lindqvist",
    title: "Buyer Specialist",
    image: "/agents/agent-3.png",
    deals: 197,
    rating: 5.0,
    specialty: "First-Time Buyers",
  },
  {
    id: "a4",
    name: "Daniel Reyes",
    title: "Investment Director",
    image: "/agents/agent-4.png",
    deals: 341,
    rating: 4.9,
    specialty: "Portfolio Assets",
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Melhek closed our cross-border purchase in 9 days. The automation is unlike anything in the industry.",
    name: "Priya Nair",
    role: "Investor, Singapore",
  },
  {
    id: "t2",
    quote:
      "The verified listings saved us months. Every property was exactly as represented.",
    name: "Marcus Webb",
    role: "Buyer, London",
  },
  {
    id: "t3",
    quote:
      "The AI assistant qualified leads while I slept. My close rate jumped 40% in a quarter.",
    name: "Elena Volkov",
    role: "Broker, Dubai",
  },
  {
    id: "t4",
    quote:
      "Finally a platform that feels like Linear for real estate. Fast, clean, precise.",
    name: "Thomas Schmidt",
    role: "Developer, Berlin",
  },
  {
    id: "t5",
    quote:
      "We manage 200+ assets globally. Melhek is the only OS that keeps up with us.",
    name: "Aisha Rahman",
    role: "Portfolio Manager, Dubai",
  },
]

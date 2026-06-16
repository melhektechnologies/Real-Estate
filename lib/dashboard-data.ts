export type StageId = "interested" | "showings" | "offer" | "contract"

export interface KanbanCard {
  id: string
  title: string
  location: string
  price: number
  beds: number
  baths: number
  area: number
  image: string
  stage: StageId
  agent: string
}

export interface StageColumn {
  id: StageId
  label: string
  accent: string
}

export const stages: StageColumn[] = [
  { id: "interested", label: "Interested", accent: "#6366f1" },
  { id: "showings", label: "Showings Booked", accent: "#0ea5e9" },
  { id: "offer", label: "Offer Submitted", accent: "#f59e0b" },
  { id: "contract", label: "Under Contract", accent: "#059669" },
]

export const initialCards: KanbanCard[] = [
  {
    id: "k1",
    title: "Skyline Glass Penthouse",
    location: "Downtown, Dubai",
    price: 4850000,
    beds: 4,
    baths: 5,
    area: 6200,
    image: "/properties/penthouse-dubai.png",
    stage: "interested",
    agent: "Sofia Marchetti",
  },
  {
    id: "k2",
    title: "Industrial Loft Residence",
    location: "SoHo, New York",
    price: 3150000,
    beds: 3,
    baths: 3,
    area: 4400,
    image: "/properties/loft-nyc.png",
    stage: "interested",
    agent: "James Okafor",
  },
  {
    id: "k3",
    title: "Marina Bay Sky Residence",
    location: "Marina Bay, Singapore",
    price: 4100000,
    beds: 4,
    baths: 4,
    area: 5100,
    image: "/properties/apartment-singapore.png",
    stage: "showings",
    agent: "Amara Lindqvist",
  },
  {
    id: "k4",
    title: "Georgian Heritage Townhouse",
    location: "Kensington, London",
    price: 5650000,
    beds: 5,
    baths: 4,
    area: 5800,
    image: "/properties/townhouse-london.png",
    stage: "showings",
    agent: "Daniel Reyes",
  },
  {
    id: "k5",
    title: "Minimalist Hillside Villa",
    location: "Beverly Hills, CA",
    price: 7200000,
    beds: 6,
    baths: 7,
    area: 9100,
    image: "/properties/villa-modern.png",
    stage: "offer",
    agent: "Sofia Marchetti",
  },
  {
    id: "k6",
    title: "Cliffside Modern Estate",
    location: "Malibu, CA",
    price: 9800000,
    beds: 7,
    baths: 8,
    area: 12400,
    image: "/properties/estate-california.png",
    stage: "contract",
    agent: "Daniel Reyes",
  },
]

export type DocStatus = "verified" | "action" | "review"

export interface VaultDocument {
  id: string
  name: string
  type: string
  size: string
  updated: string
  status: DocStatus
}

export const documents: VaultDocument[] = [
  {
    id: "d1",
    name: "Mortgage Pre-Approval Letter",
    type: "PDF",
    size: "284 KB",
    updated: "2 days ago",
    status: "verified",
  },
  {
    id: "d2",
    name: "Lease Agreement Draft — Penthouse",
    type: "DOCX",
    size: "1.2 MB",
    updated: "5 hours ago",
    status: "action",
  },
  {
    id: "d3",
    name: "Passport & National ID",
    type: "PDF",
    size: "640 KB",
    updated: "1 week ago",
    status: "verified",
  },
  {
    id: "d4",
    name: "Proof of Funds Statement",
    type: "PDF",
    size: "412 KB",
    updated: "3 days ago",
    status: "review",
  },
  {
    id: "d5",
    name: "Purchase Offer — Hillside Villa",
    type: "PDF",
    size: "356 KB",
    updated: "Yesterday",
    status: "action",
  },
]

export interface Appointment {
  id: string
  date: string
  day: string
  time: string
  title: string
  address: string
  agent: string
  mode: "In Person" | "Virtual"
}

export const appointments: Appointment[] = [
  {
    id: "ap1",
    date: "18",
    day: "Thu",
    time: "10:30 AM",
    title: "Skyline Glass Penthouse",
    address: "Downtown Blvd 12, Dubai",
    agent: "Sofia Marchetti",
    mode: "In Person",
  },
  {
    id: "ap2",
    date: "20",
    day: "Sat",
    time: "2:00 PM",
    title: "Industrial Loft Residence",
    address: "Greene St 88, SoHo, NY",
    agent: "James Okafor",
    mode: "In Person",
  },
  {
    id: "ap3",
    date: "23",
    day: "Tue",
    time: "9:00 AM",
    title: "Marina Bay Sky Residence",
    address: "Marina Way 5, Singapore",
    agent: "Amara Lindqvist",
    mode: "Virtual",
  },
  {
    id: "ap4",
    date: "26",
    day: "Fri",
    time: "4:30 PM",
    title: "Georgian Heritage Townhouse",
    address: "Palace Gate 3, Kensington",
    agent: "Daniel Reyes",
    mode: "In Person",
  },
]

export interface Recommendation {
  id: string
  title: string
  location: string
  price: number
  image: string
  matchScore: number
  reason: string
}

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    title: "Harbour View Sky Loft",
    location: "Marina Bay, Singapore",
    price: 3890000,
    image: "/properties/apartment-singapore.png",
    matchScore: 94,
    reason: "Close to Transit",
  },
  {
    id: "r2",
    title: "Coastal Glass Villa",
    location: "Malibu, CA",
    price: 8600000,
    image: "/properties/estate-california.png",
    matchScore: 91,
    reason: "Ocean Frontage",
  },
  {
    id: "r3",
    title: "Heritage Garden Townhouse",
    location: "Kensington, London",
    price: 5200000,
    image: "/properties/townhouse-london.png",
    matchScore: 88,
    reason: "Top-Rated Schools",
  },
  {
    id: "r4",
    title: "Penthouse Sky Terrace",
    location: "Downtown, Dubai",
    price: 4720000,
    image: "/properties/penthouse-dubai.png",
    matchScore: 86,
    reason: "Matches Budget",
  },
]

export const buyerProfile = {
  name: "Alexander Pierce",
  email: "a.pierce@melhek.io",
  role: "Premier Buyer",
  initials: "AP",
}

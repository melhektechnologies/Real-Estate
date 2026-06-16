# MELHEK REAL ESTATE OS (PROPTECH SAAS)
## System Architecture & Service Design Specification

This document details the production-grade system architecture and service-layer blueprint for the **Melhek Real Estate OS**, a multi-tenant PropTech SaaS platform. 

The architecture is designed to be **database-agnostic** by utilizing repository interfaces, enabling clean separation of concerns and future database swap capabilities.

---

## 1. System Architecture Overview

Melhek Real Estate OS uses a **layered modular architecture** with strict directional dependency flow. The system isolates the user interface, business logic, data abstraction, and third-party integrations into distinct modules.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PRESENTATION LAYER                            │
│           Next.js 14+ App Router (React Server Components, Client UX)   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                             API ROUTING LAYER                           │
│   Next.js API Route Handlers / Edge Middleware (CORS, Rate Limiting)   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                              SERVICE LAYER                              │
│       Pure Domain Services / Business Rules Engine (Database-Agnostic)  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        REPOSITORY ABSTRACTION LAYER                     │
│    Data Access Interfaces (Domain Entity Mappers, Tenant Isolation Engine)│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌──────────────────────────────────┐            ┌──────────────────────────────────┐
│        INFRASTRUCTURE DATA       │            │       INTEGRATION GATEWAYS       │
│  Mock Memory Store / Supabase   │            │   Stripe, Mapbox, Twilio, OCR,   │
│  / PostgreSQL (Interchangeable)  │            │     Vertex AI (GCP) Services     │
└──────────────────────────────────┘            └──────────────────────────────────┘
```

* **Data Flow Pattern**: The Client sends requests via the Presentation Layer. Next.js API route handlers validate requests and invoke Domain Services. Domain Services execute business operations using Repository abstractions and Integration Gateways. The Repository fetches and maps raw database models into domain-level TypeScript objects.

---

## 2. Frontend Architecture (Next.js App Router)

The project layout leverages Next.js App Router folders grouped by domain, utilizing Next.js route groups `(...)` to segment structural concerns without modifying public URL routing.

### 2.1. Folder Structure Layout
```
/
├── app/                           # Next.js Routing Entry points
│   ├── (marketplace)/             # Public consumer pages (Search, PDP)
│   │   ├── properties/
│   │   └── page.tsx
│   ├── (crm)/                     # Authenticated Agency CRM
│   │   ├── pipeline/
│   │   └── leads/
│   ├── (admin)/                   # Super Admin Portal
│   ├── (property-management)/     # Tenant / Landlord Portal
│   ├── api/                       # API Route Handlers
│   │   └── v1/
│   │       ├── auth/
│   │       ├── properties/
│   │       └── leads/
│   └── layout.tsx
├── components/                    # Shared Design System Elements
│   ├── ui/                        # Low-level primitives (Buttons, Modals)
│   └── shared/                    # Complex structural components (Maps, Timelines)
├── core/                          # Pure Core Business Code
│   ├── domain/                    # TypeScript interfaces / Entity models
│   ├── repositories/              # Repository Interfaces & Mock Implementations
│   └── services/                  # Business Logic Services
├── integrations/                  # Third-party API wrappers
│   ├── maps/
│   ├── payments/
│   └── notifications/
└── store/                         # Global client-side state managers
```

### 2.2. State Management Strategy
1. **Server State**: React Server Components (RSC) handle primary data fetching directly on the server. Client-side state synchronization, pagination, and caching are managed via **React Query (TanStack Query)**.
2. **Client UI State**: Lightweight, modular global state (e.g., sidebars, active mapping bounds, search query filters) is managed via **Zustand**.
3. **URL State**: Map coordinates, active filters, and list sorting preferences are stored in the URL search parameters to ensure high shareability.

---

## 3. Service Layer Design

All service components are written as pure TypeScript classes that inject repository and integration dependencies via their constructor.

```
          ┌───────────────────────────────────────────────────────────┐
          │                      PropertyService                      │
          └─────────────────────────────┬─────────────────────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
┌─────────────────────────┐┌─────────────────────────┐┌─────────────────────────┐
│   PropertyRepository    ││   NotificationService   ││       AIService         │
└─────────────────────────┘└─────────────────────────┘└─────────────────────────┘
```

### 3.1. PropertyService
* **Responsibilities**: Orchestrating property listings validation, publishing, and listing lifecycle transitions.
* **Dependencies**: `PropertyRepository`, `NotificationService`, `AIService`.
* **Interface**:
```typescript
interface IPropertyService {
  createDraft(ownerId: string, details: CreatePropertyDTO): Promise<Property>;
  submitForVerification(propertyId: string, tenantId: string): Promise<Property>;
  verifyListing(propertyId: string, adminId: string, status: 'APPROVED' | 'REJECTED'): Promise<Property>;
  search(filter: PropertyFilter, tenantId: string): Promise<Property[]>;
  updateProperty(propertyId: string, details: Partial<Property>, tenantId: string): Promise<Property>;
}
```

### 3.2. UserService
* **Responsibilities**: User profile management, organization mapping, and multi-factor setup.
* **Dependencies**: `UserRepository`, `NotificationService`.
* **Interface**:
```typescript
interface IUserService {
  registerUser(dto: RegisterUserDTO): Promise<User>;
  verifyMFA(userId: string, token: string): Promise<boolean>;
  assignToAgency(userId: string, agencyId: string, role: string): Promise<User>;
  getUserById(userId: string): Promise<User | null>;
}
```

### 3.3. LeadService
* **Responsibilities**: Automating lead intake parsing, matching, routing, and checking SLA response times.
* **Dependencies**: `LeadRepository`, `UserRepository`, `NotificationService`.
* **Interface**:
```typescript
interface ILeadService {
  ingestLead(dto: IngestLeadDTO): Promise<Lead>;
  assignLead(leadId: string, agencyId: string): Promise<Lead>;
  checkSLA(leadId: string): Promise<boolean>;
  updateLeadStatus(leadId: string, status: string, agentId: string): Promise<Lead>;
}
```

### 3.4. BookingService
* **Responsibilities**: Viewing calendar availability verification and reservation locking.
* **Dependencies**: `BookingRepository`, `PropertyRepository`, `NotificationService`.
* **Interface**:
```typescript
interface IBookingService {
  requestBooking(dto: CreateBookingDTO): Promise<Booking>;
  confirmBooking(bookingId: string, agentId: string): Promise<Booking>;
  cancelBooking(bookingId: string, reason: string): Promise<Booking>;
  getAgentCalendar(agentId: string, start: Date, end: Date): Promise<Booking[]>;
}
```

### 3.5. CRMService
* **Responsibilities**: Nurturing pipeline tracking, interactions logging, and task reminders.
* **Dependencies**: `LeadRepository`, `NotificationService`.
* **Interface**:
```typescript
interface ICRMService {
  logInteraction(leadId: string, agentId: string, type: 'CALL' | 'EMAIL' | 'SMS', note: string): Promise<Interaction>;
  updatePipelineStage(leadId: string, stage: string): Promise<Lead>;
  createTaskReminder(agentId: string, leadId: string, dueDate: Date, text: string): Promise<Task>;
}
```

### 3.6. AIService
* **Responsibilities**: Coordinating automated valuations (AVM), AI writing templates, and Document OCR validation.
* **Dependencies**: `PropertyRepository`, `StorageProvider`.
* **Interface**:
```typescript
interface IAIService {
  calculateAVM(propertyId: string): Promise<AVMResult>;
  generateListingDescription(features: string[], style: string): Promise<string>;
  parseDocument(documentUrl: string, type: 'KYC' | 'DEED' | 'PAYSTUB'): Promise<ParsedDocResult>;
}
```

### 3.7. AnalyticsService
* **Responsibilities**: Aggregating real-time dashboards indices, GCI tracking, and vacancy ratios.
* **Dependencies**: `PropertyRepository`, `LeadRepository`.
* **Interface**:
```typescript
interface IAnalyticsService {
  getAgencyDashboard(agencyId: string): Promise<AgencyAnalytics>;
  getMarketComps(zipCode: string, radius: number): Promise<MarketIndex>;
}
```

### 3.8. NotificationService
* **Responsibilities**: Dispatched notification routing (push, email, SMS, WhatsApp) across channel configurations.
* **Dependencies**: `EmailProvider`, `WhatsAppProvider`.
* **Interface**:
```typescript
interface INotificationService {
  sendDirectAlert(userId: string, payload: AlertPayload): Promise<void>;
  enqueueNotification(topic: string, templateId: string, variables: Record<string, string>): Promise<void>;
}
```

---

## 4. Repository Abstraction Layer

The system uses a repository layer to isolate database configurations from business logic. Data providers implement interfaces and map database records to clean Domain Entities.

```
                                  Domain Entities
                           (Property, User, Lead, etc.)
                                         ▲
                                         │
                         ┌───────────────┴───────────────┐
                         │      PropertyRepository       │ (TypeScript Interface)
                         └───────────────┬───────────────┘
                                         │
                     ┌───────────────────┴───────────────────┐
                     ▼                                       ▼
       InMemoryPropertyRepository                PrismaPropertyRepository
            (Mock JSON Store)                      (Supabase/PostgreSQL)
```

### 4.1. Core Domain Models (TypeScript Examples)
```typescript
export interface Property {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  amenities: Record<string, boolean>;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  agencyId?: string;
  roles: string[];
}

export interface Lead {
  id: string;
  contactName: string;
  contactEmail: string;
  assignedAgentId?: string;
  status: string;
  notes: string[];
}
```

### 4.2. Repository Interfaces
```typescript
export interface IPropertyRepository {
  findById(id: string): Promise<Property | null>;
  save(property: Property): Promise<Property>;
  delete(id: string): Promise<boolean>;
  findWithinBounds(bounds: { neLat: number; neLng: number; swLat: number; swLng: number }): Promise<Property[]>;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export interface ILeadRepository {
  findById(id: string): Promise<Lead | null>;
  save(lead: Lead): Promise<Lead>;
  findUnassignedLeads(): Promise<Lead[]>;
}

export interface IBookingRepository {
  findById(id: string): Promise<Booking | null>;
  save(booking: Booking): Promise<Booking>;
  findConflicting(agentId: string, start: Date, end: Date): Promise<Booking[]>;
}
```

### 4.3. Mock Repository Implementation Strategy (InMemory)
For the MVP stage, mock repositories store entities in-memory using JavaScript maps. This allows running the app and testing services without a running database.
```typescript
export class InMemoryPropertyRepository implements IPropertyRepository {
  private properties = new Map<string, Property>();

  async findById(id: string): Promise<Property | null> {
    return this.properties.get(id) || null;
  }

  async save(property: Property): Promise<Property> {
    if (!property.id) property.id = crypto.randomUUID();
    this.properties.set(property.id, property);
    return property;
  }

  async delete(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  async findWithinBounds(bounds: { neLat: number; neLng: number; swLat: number; swLng: number }): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(p => 
      p.latitude <= bounds.neLat && p.latitude >= bounds.swLat &&
      p.longitude <= bounds.neLng && p.longitude >= bounds.swLng
    );
  }
}
```

### 4.4. Swap Strategy
We use simple **Dependency Injection (DI)** container patterns (or factory patterns) to instantiate classes.

```typescript
// di-container.ts
import { InMemoryPropertyRepository } from "./repositories/InMemoryPropertyRepository";
import { PrismaPropertyRepository } from "./repositories/PrismaPropertyRepository";
import { PropertyService } from "./services/PropertyService";

// Toggle database mode here via configuration
const useProductionDB = process.env.DATABASE_SWAP === "PRODUCTION";

export const propertyRepository = useProductionDB
  ? new PrismaPropertyRepository()
  : new InMemoryPropertyRepository();

export const propertyService = new PropertyService(propertyRepository);
```

---

## 5. API Architecture

API route endpoints serve as controllers, using TypeScript validators to parse payloads and delegating the business execution to Services.

### 5.1. Route Map & Service Mapping

```
/api/v1/properties
 ├── GET  --> Maps parameters to PropertyService.search()
 └── POST --> Maps request payload to PropertyService.createDraft()

/api/v1/properties/{id}/verify
 └── POST --> Maps payload to PropertyService.verifyListing()

/api/v1/leads/{id}/route
 └── POST --> Maps request payload to LeadService.assignLead()

/api/v1/bookings
 ├── GET  --> Maps query to BookingService.getAgentCalendar()
 └── POST --> Maps request payload to BookingService.requestBooking()
```

### 5.2. Controller Validation Example (Next.js API route)
```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { propertyService } from "@/core/di-container";

const CreatePropertySchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  latitude: z.number(),
  longitude: z.number(),
  bedrooms: z.number().int().positive(),
  bathrooms: z.number().positive(),
  squareFootage: z.number().positive()
});

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const validatedData = CreatePropertySchema.parse(rawBody);
    
    // Auth context extracted via JWT middleware
    const userId = req.headers.get("x-user-id")!; 

    const property = await propertyService.createDraft(userId, validatedData);
    return NextResponse.json({ status: "success", data: property }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ status: "fail", data: error.errors }, { status: 400 });
    }
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
```

---

## 6. Multi-Tenant SaaS Architecture

### 6.1. Tenant Isolation Strategy
We utilize **Logical Isolation** on a shared database schema. Every database entity related to data operations contains an `agency_id` field.
* Subdomain dynamic extraction: A request coming from `agencyone.melhek.com` is intercepted by the Next.js middleware, which matches the subdomain against registered agencies, resolves the `agency_id`, and passes it in the request header (`x-tenant-id`).
* Every repository request must query with the tenant scope.

```typescript
// Inside Prisma/SQL Repository implementation
async findById(id: string, tenantId: string): Promise<Property | null> {
  // Enforces query isolation: property must belong to the tenant agency
  return prisma.property.findFirst({
    where: {
      id: id,
      agencyId: tenantId
    }
  });
}
```

### 6.2. RBAC Model & Scoping Hierarchy
Our security structure maps users through three scoping tiers:

1. **Global Scope (Super Admin / Admin)**: Bypass RLS constraints to moderate billing tiers, platform-wide disputes, and user compliance.
2. **Agency Scope (Broker Owner)**: Can view, modify, or delete all records (agents, CRM leads, properties) belonging to their `agency_id`.
3. **User Scope (Agent / Customer)**: Agents can access only their assigned leads and listings. Buyers, Sellers, and Tenants can access only their own profile details, signed agreements, and payment histories.

---

## 7. AI System Architecture

The AI module is structured as a dedicated backend service layer. **No LLM prompts or SDK integrations run directly within UI components.**

```
                                      AIService (API Interface)
                                                 │
                        ┌────────────────────────┼────────────────────────┐
                        ▼                        ▼                        ▼
               AVM Model Wrapper         Document Processor        Prompt Generator
             (Vertex AI / XGBoost)         (Document AI)           (Gemini API Client)
```

1. **AI Valuation Model (AVM)**: Integrates with trained predictive models. Property characteristics and local comps are processed and passed to prediction endpoints (e.g. Vertex AI prediction nodes), returning value ranges and accuracy metrics.
2. **AI Document Processor**: Accepts document streams, routes them to GCP Document AI endpoints, and maps raw text extraction payloads to structured interfaces (e.g., matching ID details against user accounts).
3. **AI Listing Generator**: Sanitizes agent inputs and processes them using structured JSON prompts passed to the Gemini/GPT API, returning optimized marketing descriptions.

---

## 8. Integration Layer

The integration layer isolates external API dependencies. Domain services interact with gateways through interfaces.

```typescript
// 1. MAPS PROVIDER INTERFACE
export interface IMapProvider {
  geocodeAddress(address: string): Promise<{ lat: number; lng: number }>;
  calculateTravelTime(start: [number, number], end: [number, number]): Promise<number>;
}

// 2. PAYMENT PROVIDER INTERFACE
export interface IPaymentProvider {
  createCustomer(email: string, name: string): Promise<string>;
  initiateSubscription(customerId: string, priceId: string): Promise<{ sessionId: string }>;
  processRentTransfer(tenantStripeId: string, landlordStripeId: string, amount: number): Promise<string>;
}

// 3. STORAGE PROVIDER INTERFACE
export interface IStorageProvider {
  uploadFile(path: string, buffer: Buffer, mimeType: string): Promise<string>;
  getPresignedUrl(fileKey: string): Promise<string>;
}
```

---

## 9. Security Architecture

### 9.1. Authentication System
* **Protocol**: JWT stateless tokens paired with session verification.
* **Storage**: Tokens are saved in HTTPS-Only, secure, SameSite cookies to protect against Cross-Site Scripting (XSS) attacks.
* **MFA**: Multi-factor authentication using Time-based One-time Passwords (TOTP) is enforced on all admin, broker, and agent profiles.

### 9.2. API Protection & Middleware Flow
Next.js Edge Middleware intercepts incoming requests to enforce rate-limiting and access policies:

```
Request ──► [ Rate Limiter (Redis) ] ──► [ Decrypt JWT ] ──► [ Scope Checker ] ──► Route Handler
```
* **Rate Limiting**: Integrated Redis token-bucket middleware restricting API calls to 100 requests per minute per IP address.
* **Role Check**: Requests targeting `/api/v1/admin/*` are rejected at the edge layer if the JWT payload does not contain the `SUPER_ADMIN` or `ADMIN` scope.

---

## 10. Scalability Strategy

The architecture is designed to scale across three deployment phases:

```
┌─────────────────────────────────┐
│     PHASE 1: MVP DEV STATE      │ --> In-Memory Mock Data Storage
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│      PHASE 2: SAAS LAUNCH       │ --> Supabase Serverless Postgres + Redis Cache
└────────────────┬────────────────┘
                 │
                 ▼
┌─────────────────────────────────┐
│     PHASE 3: ENTERPRISE SCALE   │ --> Multi-Region Kubernetes / Microservice Split
└─────────────────────────────────┘
```

### 10.1. Phase 1: MVP (Mock State)
* App is deployed on Vercel.
* The API layer instantiates `InMemoryRepository` mocks.
* Allows front-end developers, product managers, and testers to run and validate workflows without database configuration dependencies.

### 10.2. Phase 2: SaaS Launch (Supabase / Postgres)
* Replace mock classes with Postgres repositories (using Prisma, Drizzle, or Supabase JS SDK client configurations).
* Hook up Redis clusters to store sessions and cache listing searches.
* Enable basic load balancing on backend services.

### 10.3. Phase 3: Enterprise Scale (Multi-Region & Microservices)
* Transition database layers to a distributed multi-tenant layout (e.g., Citus Database extensions on Postgres for sharding by tenant ID).
* Separate search operations into standalone elastic microservices (ElasticSearch / Typesense) to offload database query processing.
* Spin off async heavy workers (AI video rendering, CSV bulk parsing, AVM model runs) to Celery/BullMQ job processing nodes.

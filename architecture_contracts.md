# MELHEK REAL ESTATE OS (PROPTECH SAAS)
## Architecture Contracts & Domain Specification

This document defines the core TypeScript domain models, repository interfaces, service contracts, tenant isolation models, API map configurations, and the repository mock strategy. 

All interfaces are designed to be database-agnostic.

---

## 1. Complete TypeScript Domain Entities (Interfaces Only)

```typescript
/**
 * 1. TENANT ENTITY
 * The fundamental root of multi-tenancy.
 * Defines the subscriber organization (e.g., Agency or Developer).
 */
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  customDomain?: string;
  planId: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PAST_DUE';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 2. SUBSCRIPTION / PLAN ENTITY
 * Defines features, caps, and pricing for Tenants.
 */
export interface SubscriptionPlan {
  id: string;
  name: 'FREE' | 'AGENT_PRO' | 'AGENCY_PREMIUM' | 'ENTERPRISE';
  priceMonthly: number;
  maxAgents: number;
  maxListings: number;
  features: string[]; // ['AVM_SEARCH', 'OCR_PARSING', 'WHITE_LABEL']
  createdAt: Date;
}

/**
 * 3. USER ENTITY
 * Base account structure. Relates to a Tenant for data scoping.
 */
export interface User {
  id: string;
  tenantId: string; // Enforces tenant context association
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  roles: string[]; // ['SUPER_ADMIN', 'AGENCY_BROKER', 'AGENT', 'BUYER', 'SELLER']
  isMfaEnabled: boolean;
  mfaSecret?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 4. AGENCY ENTITY
 * An organizational representation under a Tenant.
 */
export interface Agency {
  id: string;
  tenantId: string;
  name: string;
  licenseNumber: string;
  logoUrl?: string;
  brokerOfRecordId: string; // User ID of the chief broker
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 5. AGENT ENTITY
 * Extended profile details linking User to Agency.
 */
export interface Agent {
  id: string; // Maps to User.id
  tenantId: string;
  agencyId: string;
  licenseNumber: string;
  specialtyZipCodes: string[];
  languages: string[];
  averageRating: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 6. PROPERTY ENTITY
 * The core physical asset listing.
 */
export interface Property {
  id: string;
  tenantId: string;
  ownerId: string; // User ID of the seller/landlord
  title: string;
  description: string;
  propertyType: 'CONDO' | 'SINGLE_FAMILY' | 'LAND' | 'COMMERCIAL';
  transactionType: 'BUY' | 'RENT';
  price: number;
  currency: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  latitude: number;
  longitude: number;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage: number;
  yearBuilt?: number;
  amenities: Record<string, boolean>; // e.g. { "hasPool": true, "hasGarage": false }
  status: 'DRAFT' | 'PENDING_VERIFICATION' | 'ACTIVE' | 'UNDER_OFFER' | 'SOLD' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 7. LEAD ENTITY
 * Ingested user interest records.
 */
export interface Lead {
  id: string;
  tenantId: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  assignedAgentId?: string;
  source: string; // 'PORTAL', 'FACEBOOK', 'MLS_FEED'
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'LOST' | 'CONVERTED';
  notes: string[];
  targetZip?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 8. BOOKING ENTITY
 * Viewings scheduler reservation details.
 */
export interface Booking {
  id: string;
  tenantId: string;
  propertyId: string;
  agentId: string;
  guestId: string; // User ID of the buyer/tenant requesting showing
  scheduledTime: Date;
  status: 'REQUESTED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 9. MESSAGE ENTITY
 * Real-time conversation thread records.
 */
export interface Message {
  id: string;
  tenantId: string;
  threadId: string;
  senderId: string;
  recipientId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

/**
 * 10. NOTIFICATION ENTITY
 * Dispatched transaction alerts log.
 */
export interface Notification {
  id: string;
  tenantId: string;
  recipientId: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';
  status: 'PENDING' | 'SENT' | 'FAILED';
  payload: {
    title: string;
    body: string;
    actionUrl?: string;
  };
  createdAt: Date;
}
```

---

## 2. Repository Interface Layer (Database-Agnostic)

All Repository interfaces require a `tenantId` parameter on write/query operations to enforce tenant boundary isolation.

```typescript
export interface IPropertyRepository {
  findById(id: string, tenantId: string): Promise<Property | null>;
  save(property: Property, tenantId: string): Promise<Property>;
  delete(id: string, tenantId: string): Promise<boolean>;
  findWithinBounds(
    bounds: { neLat: number; neLng: number; swLat: number; swLng: number },
    tenantId: string
  ): Promise<Property[]>;
  listAll(tenantId: string, limit: number, offset: number): Promise<Property[]>;
}

export interface IUserRepository {
  findById(id: string, tenantId: string): Promise<User | null>;
  findByEmail(email: string, tenantId: string): Promise<User | null>;
  save(user: User, tenantId: string): Promise<User>;
  listAllByTenant(tenantId: string): Promise<User[]>;
}

export interface ILeadRepository {
  findById(id: string, tenantId: string): Promise<Lead | null>;
  save(lead: Lead, tenantId: string): Promise<Lead>;
  findByAgent(agentId: string, tenantId: string): Promise<Lead[]>;
  findUnassigned(tenantId: string): Promise<Lead[]>;
}

export interface IBookingRepository {
  findById(id: string, tenantId: string): Promise<Booking | null>;
  save(booking: Booking, tenantId: string): Promise<Booking>;
  findConflicting(agentId: string, start: Date, end: Date, tenantId: string): Promise<Booking[]>;
  listForUser(userId: string, tenantId: string): Promise<Booking[]>;
}

export interface IMessagingRepository {
  saveMessage(message: Message, tenantId: string): Promise<Message>;
  findThreadMessages(threadId: string, tenantId: string, limit: number, offset: number): Promise<Message[]>;
  listUserThreads(userId: string, tenantId: string): Promise<string[]>; // Returns list of thread IDs
}
```

---

## 3. Service Layer Contracts (Interfaces Only)

```typescript
export interface IPropertyService {
  createDraftListing(ownerId: string, details: Omit<Property, 'id' | 'status' | 'createdAt' | 'updatedAt'>, tenantId: string): Promise<Property>;
  submitVerificationRequest(propertyId: string, tenantId: string): Promise<Property>;
  approvePropertyListing(propertyId: string, adminId: string, tenantId: string): Promise<Property>;
  rejectPropertyListing(propertyId: string, adminId: string, reason: string, tenantId: string): Promise<Property>;
  searchProperties(filters: Record<string, any>, tenantId: string): Promise<Property[]>;
}

export interface ICRMService {
  logClientInteraction(leadId: string, agentId: string, type: 'CALL' | 'EMAIL' | 'SMS', note: string, tenantId: string): Promise<void>;
  assignIncomingLead(leadId: string, agencyId: string, tenantId: string): Promise<Lead>;
  updateLeadStatus(leadId: string, status: Lead['status'], agentId: string, tenantId: string): Promise<Lead>;
  getPipelineOverview(agentId: string, tenantId: string): Promise<Record<string, Lead[]>>;
}

export interface IAuthService {
  authenticateUser(email: string, passwordHash: string, tenantId: string): Promise<{ token: string; user: User }>;
  validateMFAToken(userId: string, token: string, tenantId: string): Promise<boolean>;
  registerNewTenantUser(details: Omit<User, 'id' | 'createdAt' | 'updatedAt'>, tenantId: string): Promise<User>;
}

export interface IAIService {
  runAVMValuation(propertyId: string, tenantId: string): Promise<{ estimatedValuation: number; marginOfError: number }>;
  generateAIDescription(propertyId: string, tenantId: string): Promise<string>;
  verifyDocumentAuthenticity(documentUrl: string, type: 'DEED' | 'PAYSTUB', tenantId: string): Promise<{ isAuthentic: boolean; extractedFields: Record<string, string> }>;
}

export interface INotificationService {
  dispatchImmediate(recipientId: string, channel: Notification['channel'], title: string, body: string, tenantId: string): Promise<void>;
  enqueueTemplateNotification(recipientId: string, channel: Notification['channel'], templateId: string, variables: Record<string, string>, tenantId: string): Promise<void>;
}

export interface IAnalyticsService {
  getGrossCommissionIncome(agencyId: string, tenantId: string): Promise<{ totalGCI: number; currency: string }>;
  getAverageDaysOnMarket(tenantId: string): Promise<number>;
  getLeadConversionRate(agentId: string, tenantId: string): Promise<number>;
}
```

---

## 4. Tenant Isolation Model

Data protection is enforced by passing the resolved `tenantId` through all operations.

```
       Client Request
            │
            ▼
┌───────────────────────┐
│ Next.js Edge Router   │  --> Resolves Subdomain (e.g. "agency1") to Tenant ID ("tenant_100")
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Service Layer Engine  │  --> Passes "tenant_100" down to Repository layer
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Repository Query     │  --> appends "WHERE tenant_id = 'tenant_100'" to all DB calls
└───────────────────────┘
```

### Data Scoping Rules per Service
1. **PropertyService**: Can only search, list, edit, or delete listings matching the current request's `tenantId`. Public marketplace routes share a global directory of *Approved* properties but use read-only queries restricted from accessing draft property entities of other tenants.
2. **CRMService**: Complete isolation. Lead files, notes, showing comments, and pipeline details are locked to the agency's `tenantId`. Inter-agency lead matching is prohibited.
3. **AuthService**: Users authenticate against accounts scoped within the corresponding `tenantId`. A single email address can exist across different tenants but behaves as completely isolated profiles.

### RBAC Hierarchy Matrix
Permissions resolve based on Roles mapped within the tenant scope:

```
[Super Admin] -> Access to all tenant tables, billing, and system global stats.
     │
     └── [Agency Broker] -> Admin access scoped to Tenant ID. Roster modification, billing tier.
              │
              └── [Agent] -> Read/Write access scoped to Tenant ID. Updates own Listings/Leads/Bookings.
                       │
                       └── [Client (Buyer/Seller)] -> Scoped to own record under Tenant ID.
```

---

## 5. API Contract Map

The API Gateway acts as a translation layer. Every URL request matches an edge route, delegates execution to the Service Layer, and is constrained by Repository interface rules.

| HTTP Method | API Route Path | Scoping Context | Mapped Service | Mapped Repository |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Headers: `x-tenant-id` | `IAuthService.authenticate` | `IUserRepository.findByEmail` |
| `POST` | `/api/v1/properties` | Headers: `x-tenant-id`, JWT | `IPropertyService.create` | `IPropertyRepository.save` |
| `GET` | `/api/v1/properties/search` | Query Bounds + `x-tenant-id` | `IPropertyService.search` | `IPropertyRepository.findWithinBounds` |
| `POST` | `/api/v1/leads` | Headers: `x-tenant-id` | `ICRMService.assignIncoming` | `ILeadRepository.save` |
| `GET` | `/api/v1/crm/pipeline` | Headers: `x-tenant-id`, JWT | `ICRMService.getPipeline` | `ILeadRepository.findByAgent` |
| `POST` | `/api/v1/bookings` | Headers: `x-tenant-id`, JWT | `IBookingService.request` | `IBookingRepository.save` |
| `GET` | `/api/v1/analytics/gci` | Headers: `x-tenant-id`, JWT (Broker) | `IAnalyticsService.getGCI` | `IPropertyRepository.listAll` |

---

## 6. Mock Data & Repository Factory Strategy

To run the platform in mock mode (development/testing), the platform uses **In-Memory** data storage.

### 6.1. In-Memory Data Store Structure (Internal Memory State)
```typescript
export class MockDatabase {
  public static tenants: Map<string, Tenant> = new Map();
  public static plans: Map<string, SubscriptionPlan> = new Map();
  public static users: Map<string, User> = new Map();
  public static agencies: Map<string, Agency> = new Map();
  public static agents: Map<string, Agent> = new Map();
  public static properties: Map<string, Property> = new Map();
  public static leads: Map<string, Lead> = new Map();
  public static bookings: Map<string, Booking> = new Map();
  public static messages: Map<string, Message> = new Map();
  public static notifications: Map<string, Notification> = new Map();
}
```

### 6.2. JSON Seed Structure Example (`mock_seed.json`)
The application loads initial state from structured JSON files during mock initialization:
```json
{
  "tenants": [
    {
      "id": "tenant_100",
      "name": "Apex Properties Inc",
      "subdomain": "apex",
      "planId": "plan_agency_premium",
      "status": "ACTIVE",
      "createdAt": "2026-06-16T22:29:15Z",
      "updatedAt": "2026-06-16T22:29:15Z"
    }
  ],
  "users": [
    {
      "id": "user_200",
      "tenantId": "tenant_100",
      "email": "broker.bob@apex.com",
      "passwordHash": "$2b$12$e09J...",
      "firstName": "Bob",
      "lastName": "Broker",
      "roles": ["AGENCY_BROKER"],
      "isMfaEnabled": false,
      "createdAt": "2026-06-16T22:29:15Z",
      "updatedAt": "2026-06-16T22:29:15Z"
    }
  ]
}
```

### 6.3. Factory Pattern for Repositories
The platform instantiates repositories dynamically using a factory pattern. This guarantees the service layer is unaware of the underlying database engine.

```typescript
import { IPropertyRepository } from "./repositories/IPropertyRepository";
import { MockPropertyRepository } from "./repositories/mock/MockPropertyRepository";
import { PrismaPropertyRepository } from "./repositories/prisma/PrismaPropertyRepository";

export class RepositoryFactory {
  private static propertyRepoInstance: IPropertyRepository | null = null;

  public static getPropertyRepository(): IPropertyRepository {
    if (this.propertyRepoInstance) {
      return this.propertyRepoInstance;
    }

    const provider = process.env.DATA_PROVIDER || "MOCK";

    switch (provider) {
      case "PRISMA_POSTGRES":
        this.propertyRepoInstance = new PrismaPropertyRepository();
        break;
      case "MOCK":
      default:
        this.propertyRepoInstance = new MockPropertyRepository();
        break;
    }

    return this.propertyRepoInstance;
  }
}
```

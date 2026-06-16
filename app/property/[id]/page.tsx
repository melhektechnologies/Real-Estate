import type { Metadata } from "next"
import { propertyDetail } from "@/lib/property-detail"
import { PdpTopBar } from "@/components/pdp/pdp-top-bar"
import { ImageSplitGrid } from "@/components/pdp/image-split-grid"
import { PropertyHeader } from "@/components/pdp/property-header"
import { SpecsOverview } from "@/components/pdp/specs-overview"
import { DescriptionBlock } from "@/components/pdp/description-block"
import { AmenitiesGrid } from "@/components/pdp/amenities-grid"
import { FloorPlanViewer } from "@/components/pdp/floor-plan-viewer"
import { MapLocationWidget } from "@/components/pdp/map-location-widget"
import { LocalInstitutions } from "@/components/pdp/local-institutions"
import { MortgageEstimator } from "@/components/pdp/mortgage-estimator"
import { StickyBookingCard } from "@/components/pdp/sticky-booking-card"
import { AgentContactCard } from "@/components/pdp/agent-contact-card"
import { SimilarProperties } from "@/components/pdp/similar-properties"

export const metadata: Metadata = {
  title: `${propertyDetail.title} · ${propertyDetail.neighborhood} | Melhek`,
  description: propertyDetail.description[0],
}

function Divider() {
  return <hr className="border-zinc-200/70" />
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await params
  const property = propertyDetail

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <PdpTopBar />

      <ImageSplitGrid images={property.gallery} />

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Left / main column */}
          <div className="lg:col-span-2">
            <PropertyHeader property={property} />

            <div className="mt-8 flex flex-col gap-10">
              <SpecsOverview property={property} />
              <Divider />
              <DescriptionBlock property={property} />
              <Divider />
              <AmenitiesGrid property={property} />
              <Divider />
              <FloorPlanViewer property={property} />
              <Divider />
              <MapLocationWidget property={property} />
              <Divider />
              <LocalInstitutions property={property} />
              <Divider />
              <MortgageEstimator price={property.price} hoa={property.hoa} />
            </div>
          </div>

          {/* Right / sticky sidebar */}
          <aside className="lg:col-span-1">
            <div className="flex flex-col gap-5 lg:sticky lg:top-20">
              <StickyBookingCard />
              <AgentContactCard agent={property.agent} />
            </div>
          </aside>
        </div>
      </div>

      <SimilarProperties currentId={property.id} />
    </div>
  )
}

import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { CustomerReviews } from '@/components/sections/CustomerReviews'
import { ProductLineup } from '@/components/sections/ProductLineup'
import { TasteIsEverything } from '@/components/sections/TasteIsEverything'
import { ChangeStartsSmall } from '@/components/sections/ChangeStartsSmall'
import { TradeEnquiries } from '@/components/sections/TradeEnquiries'
import { Newsletter } from '@/components/sections/Newsletter'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      {/* Hero - Red background with floating can */}
      <HeroSection />

      {/* Customer Reviews - Google rating display */}
      <CustomerReviews />

      {/* Product Lineup - Refreshing Can Lineup grid */}
      <ProductLineup />

      {/* Taste Is Everything - Dark section with product */}
      <TasteIsEverything />

      {/* Change Starts Small - Dark with splash image */}
      <ChangeStartsSmall />

      {/* Trade Enquiries - Business partnership section */}
      <TradeEnquiries />

      {/* Newsletter - Red background with signup */}
      <Newsletter />
    </>
  )
}

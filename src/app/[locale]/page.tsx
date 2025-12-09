import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { BestSellers } from '@/components/sections/BestSellers'
import { Retailers } from '@/components/sections/Retailers'
import { TasteIsEverything } from '@/components/sections/TasteIsEverything'
import { GivingPower } from '@/components/sections/GivingPower'
import { ChangeStartsSmall } from '@/components/sections/ChangeStartsSmall'
import { InstagramFeed } from '@/components/sections/InstagramFeed'
import { Newsletter } from '@/components/sections/Newsletter'
import { getBestSellers } from '@/lib/shopify/queries/products'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  // Fetch best sellers from Shopify (or mock data)
  const products = await getBestSellers(4)

  return (
    <>
      <HeroSection />
      <BestSellers products={products} />
      <Retailers />
      <TasteIsEverything />
      <GivingPower />
      <ChangeStartsSmall />
      <InstagramFeed />
      <Newsletter />
    </>
  )
}

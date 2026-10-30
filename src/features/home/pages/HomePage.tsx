import { EchoCollectorPanel } from '@/features/echo-collector'
import { HeroSection } from '@/features/hero'
import { FeaturedProjects } from '@/features/projects'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { SparkleField } from '@/shared/ui'

export function HomePage() {
  usePageTitle()

  return (
    <div className="relative">
      <SparkleField />
      <HeroSection />
      <EchoCollectorPanel />
      <FeaturedProjects />
    </div>
  )
}

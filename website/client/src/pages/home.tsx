import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { TagsLegend } from "@/components/tags-legend";
import { ProviderStats } from "@/components/provider-stats";
import { ProvidersTable } from "@/components/providers-table";
import { ProviderComparison } from "@/components/provider-comparison";
import { RecommendedApps } from "@/components/recommended-apps";
import { UsageGuide } from "@/components/usage-guide";
import { ContributeSection } from "@/components/contribute-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <TagsLegend />
      <ProviderStats />
      <ProvidersTable />
      <ProviderComparison />
      <RecommendedApps />
      <UsageGuide />
      <ContributeSection />
      <Footer />
    </div>
  );
}

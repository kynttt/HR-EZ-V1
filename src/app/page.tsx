import { FC } from "react";
import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud";
import FeaturesSection from "@/components/features-8";
import ContentSection from "@/components/content-2";
import StatsSection from "@/components/stats-4";
import TeamSection from "@/components/team";
import TestimonialsSection from "@/components/testimonials";
import CTASection from "@/components/call-to-action";
import FooterSection from "@/components/footer";
import PricingSection from "@/components/pricing";
import FAQSection from "@/components/faqs-4";
const HomePage: FC = () => (
  <div className="p-8 space-y-8">
    <HeroSection/>
    <LogoCloud/>
    <FeaturesSection/>
    <ContentSection/>
    <StatsSection/>
    <TeamSection/>
    <FAQSection/>
    <TestimonialsSection/>
    <CTASection/>
    <PricingSection/>
    <FooterSection/>
  </div>
);

export default HomePage;

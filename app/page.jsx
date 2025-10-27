import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import PropertyDetails from '@/components/PropertyDetails/PropertyDetails'
import AmenitiesSection from '@/components/AmenitiesSection/AmenitiesSection'
import Offerings from '@/components/Offerings/Offerings'
import WhyInvest, { WhyChooseAlvia1, WhyChooseAlvia2 } from '@/components/WhyInvest/WhyInvest'
import Locality from '@/components/Locality/Locality'
import PaymentPlan from '@/components/PaymentPlan/PaymentPlan'
import About from '@/components/About/About'
import Contact from '@/components/Contact/Contact'
import Footer from '@/components/Footer/Footer'

// Load data from markdown and JSON files
async function getData() {
  // Load markdown content
  const mdPath = path.join(process.cwd(), 'data', 'alvia.md')
  const mdContent = fs.readFileSync(mdPath, 'utf8')
  const { data: frontmatter, content } = matter(mdContent)

  // Load amenities
  const amenitiesPath = path.join(process.cwd(), 'data', 'amenities.json')
  const amenities = JSON.parse(fs.readFileSync(amenitiesPath, 'utf8'))

  // Load offerings
  const offeringsPath = path.join(process.cwd(), 'data', 'offerings.json')
  const offerings = JSON.parse(fs.readFileSync(offeringsPath, 'utf8'))

  return {
    hero: {
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      location: frontmatter.location,
      propertyType: frontmatter.propertyType,
      propertyStatus: frontmatter.propertyStatus,
      units: frontmatter.units,
      heroAbout: frontmatter.heroAbout,
      brochures: frontmatter.brochures
    },
    parallaxImages: frontmatter.parallaxImages,
    amenities,
    offerings,
    whyInvestImages: frontmatter.whyInvestImages,
    paymentPlans: frontmatter.paymentPlans,
    content
  }
}

export default async function HomePage() {
  const data = await getData()

  return (
    <main>
      <Navbar />
      <Hero data={data.hero} />
      <AmenitiesSection />
      <Offerings data={data.offerings} />
      <WhyInvest image={data.whyInvestImages?.[0]} />
      <WhyChooseAlvia1 image="/assets/whyinvest/image-2.jpg" />
      <WhyChooseAlvia2 image="/assets/whyinvest/image-3.jpg" />
      <Locality />
      {/* <PaymentPlan plans={data.paymentPlans} /> */}
      <About content={data.content} />
      <Contact />
      <Footer />
    </main>
  )
}


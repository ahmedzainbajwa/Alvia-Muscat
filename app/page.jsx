import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Navbar from '@/components/Navbar/Navbar'
import Hero from '@/components/Hero/Hero'
import ParallaxSection from '@/components/Parallax/ParallaxSection'
import Amenities from '@/components/Amenities/Amenities'
import Offerings from '@/components/Offerings/Offerings'
import WhyInvest from '@/components/WhyInvest/WhyInvest'
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
      <ParallaxSection images={data.parallaxImages} />
      <Amenities amenities={data.amenities} />
      <Offerings data={data.offerings} />
      <WhyInvest images={data.whyInvestImages} />
      <Locality />
      <PaymentPlan plans={data.paymentPlans} />
      <About content={data.content} />
      <Contact />
      <Footer />
    </main>
  )
}


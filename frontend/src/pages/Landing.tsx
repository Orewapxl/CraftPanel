import Hero from "../components/Landing/Hero"
import Features from "../components/Landing/Features"
import Pricing from "../components/Landing/Pricing"
import CTA from "../components/Landing/CTA"
import Navbar from "../components/Landing/Navbar"
import Footer from "../components/Landing/Footer"


export default function Landing() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <Features />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    )
}
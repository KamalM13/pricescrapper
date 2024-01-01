import HeroCarousel from "@/components/hero-carousel"
import ProductCard from "@/components/product-card"
import Searchbar from "@/components/search-bar"
import { getAllProducts } from "@/lib/actions"
import { ArrowRight } from "lucide-react"

const Home = async () => {
  const products = await getAllProducts()

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="flex gap-1 text-sm font-medium text-primary">
              Shop Smart With our website: <ArrowRight className="h-4 w-5 mt-[2px]" />
            </p>
            <h1 className="head-text">
              Implement the Power of
              <span className="text-primary"> PriceTracker</span>
            </h1>

            <p className="mt-6">
              Empower Your Savings and Unleash the Potential of <span className="text-primary">PriceTracker</span> with Seamless Web Scraping on Our Website.
            </p>

            <Searchbar/>
          </div>
          <HeroCarousel/>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">
          Trending
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </section>

    </>
  )
}

export default Home
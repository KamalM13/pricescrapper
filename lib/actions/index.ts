"use server"

import { scrapeAmazonProduct } from "../scraper"

export async function scrapeAndStore(productUrl: string) {
    if (!productUrl) return
    
    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl)
    } catch (error) {
        throw new Error(`Error scraping and storing product: ${error}`)
    }
}
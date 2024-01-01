"use server"

import { revalidatePath } from "next/cache"
import Product from "../models/product.model"
import { connectToDb } from "../mongoose"
import { scrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils"


export async function scrapeAndStore(productUrl: string) {
    if (!productUrl) return

    try {

        connectToDb()

        const scrapedProduct = await scrapeAmazonProduct(productUrl)

        if (!scrapedProduct) return

        let product = scrapedProduct

        const existingProduct = await Product.findOne({ url: scrapedProduct.url })

        if (existingProduct) {
            const updatedPriceHistory:any=[
                ...scrapedProduct.priceHistory,
                { price: scrapedProduct.currentPrice, date: new Date() }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

            }
        }

        const newProduct = await Product.findOneAndUpdate({ url: scrapedProduct.url },
            product,
            { upsert: true, new: true })

        revalidatePath("`/products/${newProduct._id}`")

    } catch (error) {
        throw new Error(`Error scraping and storing product: ${error}`)
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDb()

        const product = await Product.findOne({ _id: productId })

        return product ? product : null
    } catch (error) {
        throw new Error(`Error getting product by id: ${error}`)
    }
}

export async function getAllProducts() { 
    try {
        connectToDb()

        const products = await Product.find()

        return products ? products : null
    } catch (error) {
        throw new Error(`Error getting all products: ${error}`)
    }
}
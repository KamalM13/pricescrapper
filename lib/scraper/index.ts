import axios from "axios"
import * as cheerio from "cheerio"
import { extractCurrency, extractPrice } from "../utils"

export async function scrapeAmazonProduct(url: string) {
    if (!url) return


    //BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME)
    const password = String(process.env.BRIGHT_DATA_PASSWORD)
    const port = 22225
    const session_id = (1000000 * Math.random()) | 0
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password: password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,

    }
    try {
        //Fetch product page
        const response = await axios.get(url, options)
        const $ = cheerio.load(response.data)

        // Extract product data
        const title = $("#productTitle").text().trim()
        const currentPrice = extractPrice(
            $(".priceToPay span.a-price-whole"),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base')

        )
        const originalPrice = extractPrice(
            $("#priceblock_ourprice"),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )

        const outOfStock = $("#availability span").text().trim().toLowerCase() === "currently unavailable"

        const images =
            $("#imgBLKFront").attr('data-a-dynamic-image') ||
            $("#landingImage").attr('data-a-dynamic-image') ||
            '{}'

        const imageUrls = Object.keys(JSON.parse(images || "{}"))

        const currency = extractCurrency($(".a-price.a-text-price span.a-offscreen"))

        const discountRate = (originalPrice - currentPrice) / originalPrice * 100
        
        const reviewsCount = parseInt($("#acrCustomerReviewText").text().split(" ")[0].replace(",", ""))

        const rating = parseFloat($("#acrPopover").text())

        // Construct object
        const data = {
            url,
            title,
            currentPrice,
            originalPrice,
            discountRate: Number(discountRate.toFixed(0)) || 0,
            priceHistory: [],
            reviewsCount: 99 || reviewsCount,
            rating: 4.5 || rating, 
            currency: currency || "$",
            image: imageUrls[0],
            isOutOfStock: outOfStock,
        }
        console.log(data)
    } catch (error) {
        throw new Error(`Error scraping Amazon product: ${error}`)
    }
}


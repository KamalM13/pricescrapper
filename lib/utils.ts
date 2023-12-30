export function extractPrice(...elements: any) {
    for (const element of elements) {
        const price = element.text().split('.')[0]
        const priceText = price.trim()
        if (priceText) return parseInt(priceText.replace(/[^\d.]/g, ''))
    }
    return 0
}

export function extractCurrency(...elements: any) {
    for (const element of elements) {
        const price = element.text().split('.')[0]
        const priceText = price.trim()
        if (priceText) return priceText.replace(/[\d.]/g, '')
    }
    return null
}
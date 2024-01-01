import Rating from '@/components/rating'
import { getProductById } from '@/lib/actions'
import { formatNumber } from '@/lib/utils'
import { Product } from '@/types'
import { Bookmark, Heart, Share, Star, Stars } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
    const product: Product = await getProductById(id)
    if (!product) redirect('/')


    return (
        <div className='product-container'>
            <div className='flex gap-28 xl:flex-row flex-col'>
                <div className='product-image'>
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className='mx-auto'
                    />
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                        <div className='flex flex-col gap-3'>
                            <p className="text-[28px] text-secondary font-semibold"> {product.title}</p>
                        </div>
                        <Link
                            href={product.url}
                            target='_blank'
                            className='text-base text-black opacity-50'
                        >
                            Visit Product
                        </Link>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='product-hearts'>
                            <Heart className='w-4 h-4' />
                            <p className='text-base font-semibold text-[#D46F77]'>{product.reviewsCount}</p>
                        </div>
                        <div className='p-2 bg-white-200 rounded-10'>
                            <Bookmark className='w-5 h-5' />
                        </div>
                        <div className='p-2 bg-white-200 rounded-10'>
                            <Share className='w-5 h-5' />
                        </div>
                    </div>
                </div>
                <div className='product-info'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[34px] text-secondary font-bold'>
                            {product.currency}{formatNumber(product.currentPrice)}
                        </p>
                        <p className='text-[21px] text-black opacity-50 line-through'>
                            {product.currency}{formatNumber(product.originalPrice)}
                        </p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-3'>
                            <div className='product-stars'>
                                <Rating
                                    rating={product.rating} />
                                {product.rating}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
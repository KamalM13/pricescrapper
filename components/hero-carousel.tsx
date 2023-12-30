"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";

const heroImages = [
    { imgUrl: 'assets/images/hero-1.svg' },
    { imgUrl: 'assets/images/hero-2.svg' },
    { imgUrl: 'assets/images/hero-3.svg' },
    { imgUrl: 'assets/images/hero-4.svg' },
    { imgUrl: 'assets/images/hero-5.svg' },
]

const HeroCarousel = () => {
    return (
        <div className="hero-carousel">
            <Carousel
                showThumbs={false}
                //autoPlay={true}
                infiniteLoop={true}
                //interval={2000}
                showArrows={false}
                showStatus={false}
            >
                {heroImages.map((item, index) => (
                    <div key={index}>
                        <Image
                            src={item.imgUrl}
                            alt={"test"}
                            width={500}
                            height={500}
                            className="object-contain"
                            key = {index}
                        />
                    </div>
                )
                )}
            </Carousel>

            <Image
                src="assets/icons/hand-drawn-arrow.svg"
                alt="arrow"
                width={175}
                height={175}
                className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
            />
        </div>
    )
}

export default HeroCarousel
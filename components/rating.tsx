import { Star, StarHalf } from "lucide-react"

interface RatingProps {
    rating: number
}


const Rating = ({ rating }: RatingProps) => {
    const filledStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    const stars = []

    for (let i = 0; i < filledStars; i++) {
        stars.push(<Star key={i} className='w-4 h-4' fill="#D46F77" />)
    }

    if (hasHalfStar) {
        stars.push(<StarHalf className="w-4 h-4" fill="#D46F77" />);
    }

    return (
        <div className="flex">
            {stars}
        </div>
    )
}

export default Rating
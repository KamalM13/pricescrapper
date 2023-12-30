import { Heart, Home, Search, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




const Navbar = () => {
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link href="/" className='flex items-center gap-1'>
          <Home  className='w-5 h-5 text-primary mb-1'/>
          <p className='nav-logo'>
            Price<span className='text-primary'>Tracker</span>
          </p>
        </Link>
        <div className='flex items-center gap-5'>
          <Search className='w-5 h-5' />
          <Heart className='w-5 h-5' />
          <User className='w-5 h-5' />
        </div>
      </nav>
    </header>
  )
}

export default Navbar
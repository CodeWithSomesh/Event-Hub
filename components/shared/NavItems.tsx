'use client';


import { navLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItems = () => {

  const pathname = usePathname();

  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
        {navLinks.map(link => {
            const isActive = pathname === link.route;

            return (
                <li key={link.route} className={`flex-center p-medium-16 whitespace-nowrap ${isActive && 'text-primary-500 border-b-2 border-black'}`}>
                    <Link href={link.route} >{link.label}</Link>
                </li>
            )
        })}
    </ul>
  )
}

export default NavItems
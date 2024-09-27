import { bottombarLinks } from '@/constants';
import React from 'react'
import {Link, useLocation } from 'react-router-dom'


const BottomBar = () => {
  const {pathname} = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
            const isActive = pathname === link.route;

            return (
           
                <Link
                to={link.route}
                key={link.label}
               className={`flex flex-col items-center gap-3 p-2 ${isActive && 'bg-primary-500 rounded-lg '}`}
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    height={16}
                    width={16}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  <p className='tiny-medium text-light-2'>{link.label}</p>
                </Link>
           
            );
          })}

    </section>
  )
}

export default BottomBar
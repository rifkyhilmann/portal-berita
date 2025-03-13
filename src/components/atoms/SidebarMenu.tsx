"use client";

import { SidebarMenuProps } from '@/types/components.types'
import Each from '@/utils/each.utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const SidebarMenu = ({
    title,
    url,
    Icon,
    type, 
    submenu
} : SidebarMenuProps) => {
    const pathname = usePathname();

    return (
        <>
            {type === 'submenu' ? (
                <div className='flex flex-col gap-2'>
                    <span className='text-sm font-medium'>{title}</span>
                    <div className='flex flex-col gap-1'>
                        <Each 
                            of={submenu !== undefined ? submenu : []}
                            render={(item, i) => (
                                <Link
                                    href={item.url ? item.url : '#'}
                                    key={i}
                                >
                                    <div 
                                        className={`w-full h-10 flex items-center px-3
                                            ${item.url === pathname ? 'bg-black text-white' : 'bg-transparent'}
                                            hover:bg-black hover:text-white rounded-lg
                                            `}
                                    >
                                        <div className='flex items-center justify-center h-10 w-10 '>
                                            {item.Icon && <item.Icon className="text-lg" />}   
                                        </div>
                                        <p className="text-sm font-medium">{item.title}</p>
                                    </div>
                                </Link>
                            )}
                        />
                    </div>
                </div>
            ) : (
                <Link href={url ? url : '#'}>
                    <div 
                        className={`w-full h-10 flex items-center px-3
                            ${url === pathname ? 'bg-black text-white' : 'bg-transparent'}
                            hover:bg-black hover:text-white rounded-lg
                            `}
                    >
                        <div className='flex items-center justify-center h-10 w-10'>
                            {Icon && <Icon className="text-lg" />}   
                        </div>
                        <p className="text-sm font-medium">{title}</p>
                    </div>
                </Link>
            )}
        </>
    )
}

export default SidebarMenu
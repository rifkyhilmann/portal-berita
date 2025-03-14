"use client"

import { DataMenuSidebar } from "@/data"
import { SidebarProps } from "@/types/components.types"
import Each from "@/utils/each.utils"
import SidebarMenu from "../atoms/SidebarMenu"
import { MdLogout } from "react-icons/md"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { Logo } from "@/assets/icons"


const Sidebar = ({
    isOpen
} : SidebarProps) => {

    const handleLogout = () => {
        signOut({ callbackUrl : "/admin/sign-in" });
    }

    return (
        <aside
        className={`fixed z-20 bg-primary h-screen w-[250px] flex flex-col transform transition-transform duration-300  
            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0 ${isOpen ? "lg:hidden" : ""} bg-white shadow-sm`}
        >
            <div className="h-16 w-full flex items-center  gap-3 pl-4">
                <Image 
                    src={Logo}
                    alt="Logo"
                    className="h-12 w-12"
                />
                <p className="text-lg font-semibold">FlashNews</p>
            </div>
            <div className="flex flex-col gap-3 px-4 py-5">
                <Each 
                    of={DataMenuSidebar}
                    render={(item, i) => (
                        <SidebarMenu 
                            key={i}
                            title={item.title}
                            url={item.url}
                            Icon={item.Icon}
                            type={item.type}
                            submenu={item.submenu}  
                        />
                    )}
                />
                <div   
                    onClick={() => handleLogout()} 
                    className="w-full cursor-pointer h-10 flex items-center px-3 hover:bg-black hover:text-white rounded-lg"
                >
                    <div className="flex items-center justify-center h-10 w-10 ">
                        <MdLogout />
                    </div>
                    <span className="text-sm font-medium">Sign Out</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
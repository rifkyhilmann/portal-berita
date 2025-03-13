"use client";

import { LayoutAdminProps } from "@/types/components.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../organism/Sidebar";
import { FaBars } from "react-icons/fa";

const LayoutAdmin = ({
    children
} : LayoutAdminProps) => {
    const router = useRouter();
    const { status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/admin/sign-in");
        }
    }, [status, router])

    return (
        <div className='w-full min-h-screen h-max flex bg-gray-50'>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-[#00000056] bg-opacity-30 z-10 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <Sidebar 
                isOpen={isOpen}
            />

            <div  className={`w-full h-max min-h-screen flex flex-col transition-all duration-200 
                    ${isOpen ? "ml-0" : "lg:ml-[250px]"}`}>
                <div className="w-full h-12 bg-white shadow flex items-center justify-between px-5">
                    <FaBars 
                        className="text-black text-lg cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>
                <div className="p-5 flex flex-col gap-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default LayoutAdmin
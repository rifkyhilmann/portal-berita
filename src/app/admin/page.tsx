"use client"

import LayoutAdmin from "@/components/template/LayoutAdmin"
import { Breadcrumb } from "antd"


const Page = () => {
    return (
        <LayoutAdmin>
            <Breadcrumb 
                items={[
                    {
                        title: "Dashboard",
                        className : 'font-medium text-lg'
                    }
                ]}
            />
            <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4">
                <div className="h-[150px] w-full bg-white shadow flex flex-col items-center p-5 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                        
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Page
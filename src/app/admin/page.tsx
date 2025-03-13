"use client"

import LayoutAdmin from "@/components/template/LayoutAdmin"
import useFetch from "@/hooks/useFetch"
import { ApiResponse, DashboardStatsProps } from "@/types/data.types"
import Each from "@/utils/each.utils"
import { Breadcrumb } from "antd"
import { MdArticle, MdFolder } from "react-icons/md"


const Page = () => {
    const { data } = useFetch<ApiResponse<DashboardStatsProps>>("/api/dashboard-stats", "GET");

    
    const dashboardCards = [
        { 
            title: "Jumlah Published", 
            value: data?.data.published || 0, 
            icon: <MdArticle /> 
        },
        { 
            title: "Jumlah Draft",
            value: data?.data.draft || 0, 
            icon: <MdArticle /> 
        },
        { 
            title: "Jumlah Category", 
            value: data?.data.category || 0, 
            icon: <MdFolder /> 
        }
    ];

    return (
        <LayoutAdmin>
            <Breadcrumb 
                items={[
                    {
                        title: "Dashboard",
                        className : 'font-medium '
                    }
                ]}
            />
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <Each 
                    of={dashboardCards}
                    render={(items, i) => (
                        <div 
                            key={i} 
                            className="h-[150px] w-full bg-white shadow flex flex-col justify-center gap-4 items-center p-5 rounded-lg"
                        >
                            <div className="h-12 w-12 text-white text-xl rounded-full bg-black flex items-center justify-center">
                                {items.icon}
                            </div>
                            <div className="flex flex-col items-center  ">
                                <h1 className="text-sm">{items.title}</h1>
                                <h1 className="text-sm font-semibold">{items.value}</h1>
                            </div>
                        </div>
                    )}
                />
            </div>
        </LayoutAdmin>
    )
}

export default Page
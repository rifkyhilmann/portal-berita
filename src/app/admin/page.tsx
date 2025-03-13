"use client"

import LayoutAdmin from "@/components/template/LayoutAdmin"
import useFetch from "@/hooks/useFetch"
import { ApiResponse, DashboardStatsProps } from "@/types/data.types"
import { Breadcrumb } from "antd"
import { MdArticle, MdFolder, MdOutlineArticle } from "react-icons/md"


const Page = () => {
    const { data, loading, error } = useFetch<ApiResponse<DashboardStatsProps>>("/api/dashboard-stats", "GET");

    if (loading) {
        return <p>Loadin...</p>
    }

    if (error) {
        return <p>Error...</p>
    }

    console.log(data);

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
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="h-[150px] w-full bg-white shadow flex flex-col justify-center gap-4 items-center p-5 rounded-lg">
                    <div className="h-12 w-12 text-white text-xl rounded-full bg-black flex items-center justify-center">
                        <MdArticle  />
                    </div>
                    <div className="flex flex-col items-center  ">
                        <h1 className="text-sm">Jumlah Published</h1>
                        <h1 className="text-sm font-semibold">{data?.data.published ? data.data.published : 0}</h1>
                    </div>
                </div>
                <div className="h-[150px] w-full bg-white shadow flex flex-col justify-center gap-4 items-center p-5 rounded-lg">
                    <div className="h-12 w-12 text-white text-xl rounded-full bg-black flex items-center justify-center">
                        <MdArticle  />
                    </div>
                    <div className="flex flex-col items-center  ">
                        <h1 className="text-sm">Jumlah Draft</h1>
                        <h1 className="text-sm font-semibold">0</h1>
                    </div>
                </div>
                <div className="h-[150px] w-full bg-white shadow flex flex-col justify-center gap-4 items-center p-5 rounded-lg">
                    <div className="h-12 w-12 text-white text-xl rounded-full bg-black flex items-center justify-center">
                        <MdFolder  />
                    </div>
                    <div className="flex flex-col items-center  ">
                        <h1 className="text-sm">Jumlah Category</h1>
                        <h1 className="text-sm font-semibold">0</h1>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Page
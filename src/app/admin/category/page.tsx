"use client";

import Input from "@/components/atoms/Input"
import LayoutAdmin from "@/components/template/LayoutAdmin"
import useFetch from "@/hooks/useFetch"
import { ApiResponse, CategoryProps } from "@/types/data.types";
import { Breadcrumb, Table } from "antd"
import Link from "next/link";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"
import { MdOutlineSearch } from "react-icons/md"

const Page = () => {
    const { data } = useFetch<ApiResponse<CategoryProps>>('/api/category', "GET");

    const columns = [
        {
            title : "No",
            key : "no",
            render: (_: unknown, __: unknown, index: number) => index + 1,
        },
        {
            title : "Name",
            dataIndex : "name",
            key : "name",
        },
        {
            title : "Action",
            key : "action",
            render: (_: unknown, record: CategoryProps) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/category/update/${record.id}`}>
                        <button className="btn-action bg-purple-700 hover:bg-purple-800">
                            <FaPen />
                        </button>
                    </Link>
                    <button className="btn-action bg-gray-700 hover:bg-gray-800 ">
                        <FaTrash />
                    </button>
                </div>
            )
        }
    ]

    return (
        <LayoutAdmin>
            <Breadcrumb 
                items={[
                    {
                        title: "Category",
                        className : 'font-medium text-lg'
                    }
                ]}
            />

            <div className="w-full h-max bg-white shadow-md rounded-lg p-5 flex flex-col gap-5">
                <div className="h-10 w-full  flex justify-between">
                    <Input 
                        type="text"
                        placeholder="Search"
                        className="w-[90%] max-w-[200px] h-9"
                        size="small"
                        icon={<MdOutlineSearch className="mr-1 text-gray-300 text-lg" />}
                    />
                    <button
                        className="btn-table"
                    >
                        <FaPlus />
                        <p className="md:flex hidden">
                            Tambah
                        </p>
                    </button>
                </div>
                <div className="h-max w-full">
                    <Table 
                        dataSource={Array.isArray(data?.data) ? data.data : []}
                        columns={columns}
                        rowKey="id"
                        pagination={{
                            showSizeChanger: true,
                            pageSizeOptions: ["5", "10", "20", "50"],
                            defaultPageSize: 5,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`,
                        }}
                    />
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default Page
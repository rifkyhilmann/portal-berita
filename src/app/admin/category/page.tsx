"use client";

import Input from "@/components/atoms/Input"
import LayoutAdmin from "@/components/template/LayoutAdmin"
import useFetch from "@/hooks/useFetch"
import { ApiResponse, CategoryProps } from "@/types/data.types";
import { showDialog, showToast } from "@/utils/alert.utils";
import { Breadcrumb, Table } from "antd"
import Link from "next/link";
import { useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa"
import { MdOutlineSearch } from "react-icons/md"

const Page = () => {
    const [search, setSearch] = useState("");
    const { data, refetch } = useFetch<ApiResponse<CategoryProps>>(
        '/api/category', "GET");

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
                    <button 
                        onClick={() => handleDelete(record.id)} 
                        className="btn-action bg-gray-700 hover:bg-gray-800 "
                    >
                        <FaTrash />
                    </button>
                </div>
            )
        }
    ]

    const { refetch: deleteCategory } = useFetch<ApiResponse<CategoryProps>>(
        "/api/category", 
        "DELETE", 
        null, 
        undefined, 
        true 
    );

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteCategory(`/api/category?id=${id}`); 
            
            if (res?.status === 200) {
                showToast("success", "Delete Data Success!");
                refetch(); 
            }
        } catch (error) {
            showDialog("error", "Error", "Error deleting");
        }
    };

    const filteredData = Array.isArray(data?.data)
        ? data.data.filter((item) => 
            item.name.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    return (
        <LayoutAdmin>
            <Breadcrumb 
                items={[
                    {
                        title: "Category",
                        className : 'font-medium '
                    }
                ]}
            />

            <div className="content-box">
                <div className="h-10 w-full  flex justify-between">
                    <Input 
                        type="text"
                        placeholder="Search"
                        className="w-[90%] max-w-[200px] h-8"
                        size="small"
                        icon={<MdOutlineSearch className="mr-1 text-gray-300 text-lg" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link href={'/admin/category/create'}>
                        <button
                            className="btn-table"
                        >
                            <FaPlus />
                            <p className="md:flex hidden">
                                Create
                            </p>
                        </button>
                    </Link>
                </div>
                <div className="h-max w-full">
                    <Table 
                        dataSource={filteredData}
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
"use client";

import Input from '@/components/atoms/Input';
import LayoutAdmin from '@/components/template/LayoutAdmin'
import useFetch from '@/hooks/useFetch';
import { ApiResponse, CategoryProps } from '@/types/data.types';
import { Breadcrumb, Breakpoint, Table } from 'antd'
import Link from 'next/link';
import React, { useState } from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { MdOutlineSearch } from 'react-icons/md'

const Page = () => {
    const [search, setSearch] = useState("");
    const { data } = useFetch<ApiResponse<CategoryProps>>('/api/articles', 'GET');

    const columns = [
        {
            title : "No",
            key : "no",
            render: (_: unknown, __: unknown, index: number) => index + 1,
        },
        {
            title : "title",
            key : "title",
            dataIndex : "title",
        },
        {
            title : "slug",
            key : "slug",
            dataIndex : "slug",
            responsive: ["md" as Breakpoint],
        },
        {
            title : "Category",
            key : "category",
            dataIndex : ["category", "name"],
            render: (text: string) => text || "No Category",
            responsive: ["md" as Breakpoint],
        },
        {
            title : "Status",
            key : "status",
            dataIndex : "status",
            render: (status: string) => (
                <span className={status === "published" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            ),
        },
        {
            title : "Action",
            key : "action",
            render: (_: unknown, record: any) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/category/update/${record.id}`}>
                        <button className="btn-action bg-purple-700 hover:bg-purple-800">
                            <FaPen />
                        </button>
                    </Link>
                    <button 
                        // onClick={() => handleDelete(record.id)} 
                        className="btn-action bg-gray-700 hover:bg-gray-800 "
                    >
                        <FaTrash />
                    </button>
                </div>
            )
        }
    ]

    const filteredData = Array.isArray(data?.data)
        ? data.data.filter((item) => 
            item.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];
 
    return (
        <LayoutAdmin>
            <Breadcrumb 
                items={[
                    {
                        title: "Articles",
                        className : 'font-medium '
                    }
                ]}
            />

            <div className='content-box'>
                <div className='h-10 w-full flex items-center justify-between'>
                    <Input 
                        type="text"
                        placeholder="Search title..."
                        className="w-[90%] max-w-[200px] h-8"
                        size="small"
                        icon={<MdOutlineSearch className="mr-1 text-gray-300 text-lg" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link href={'/admin/articles/create'}>
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

                <div className='w-full h-max'>
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
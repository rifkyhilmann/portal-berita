"use client";

import InputField from "@/components/molecules/InputField"
import SelectDropdown from "@/components/molecules/SelectDropdown";
import LayoutAdmin from "@/components/template/LayoutAdmin"
import { Breadcrumb } from "antd"
import { Formik, Form } from "formik"
import Link from "next/link"
import '@ant-design/v5-patch-for-react-19';
import useImageUpload from "@/hooks/useImageUpload";
import useFetch from "@/hooks/useFetch";
import { ApiResponse, ArticlesProps, CategoryProps } from "@/types/data.types";
import TextEditor from "@/components/molecules/TextEditor";
import { showDialog, showToast } from "@/utils/alert.utils";
import { ArticlesSchema } from "@/validation/articles.schema";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const Page = () => {
    const { id } = useParams();
    const { data : dataArticles } = useFetch<ApiResponse<ArticlesProps>>(`/api/articles?id=${id}`, "GET");

    const { image } = useImageUpload();
    const { data : dataCategory } = useFetch<ApiResponse<CategoryProps[]>>('/api/category', "GET");

    const categoryOptions = dataCategory?.data?.map((category : CategoryProps) => ({
        label: category.name,
        value: category.id
    })) || [];

    const [initialValues, setInitialValues] = useState({
        title : "",
        slug : "",
        content : "",
        image_url : undefined,
        category_id : "",
        published_at : "",
        status : ""
    });

    const { refetch } = useFetch<ApiResponse<ArticlesProps>>('/api/articles', "POST", undefined, undefined, true); 

    const handleSubmit = async (values: { 
        title: string; 
        slug: string; 
        content: string; 
        image_url: undefined; 
        category_id: string; 
        published_at: string; 
        status: string; 
    }, { resetForm }: { resetForm: () => void }) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("slug", values.slug);
            formData.append("content", values.content);
            formData.append("category_id", values.category_id);
            formData.append("published_at", values.published_at);
            formData.append("status", values.status);

            if (image) {
                formData.append("image_url", image);
            }

            const response = await refetch('/api/articles', formData);


            if (response?.status === 200) {
                resetForm();
                showToast("success", "Success!");
            }
 

        } catch (error) {
            console.log(error);
            showDialog("error", "Error", "Gagal menyimpan kategori!");
        }
    };


    useEffect(() => {
        if (dataArticles) {
            setInitialValues({
                title : dataArticles.data.title,
                slug : dataArticles.data.slug,
                content : dataArticles.data.content,
                image_url : undefined,
                category_id : dataArticles.data.category_id,
                published_at : dataArticles.data.published_at,
                status : dataArticles.data.status
            })
        }
    }, [id, dataArticles]);

    console.log(dataArticles);
    

    return (
        <LayoutAdmin>
            <Breadcrumb 
                items={[
                    {
                        title: <Link href="/admin/articles" className="text-black">Articles</Link>,
                        className: "font-medium text-black",
                    },
                    {
                        title: "Create",
                        className: "font-medium text-gray-600",
                    },
                ]}
            />

            <div className="content-box">
                <h1 className="text-sm font-medium">Create Articles</h1>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={ArticlesSchema}
                >   
                    {({ values, errors, touched, handleChange, handleReset, setFieldValue, setTouched }) => (
                        <Form className="grid md:grid-cols-2 grid-cols-1 gap-5">
                            <div className="flex flex-col gap-1">
                                <InputField
                                    name="title"
                                    label="Title"
                                    type="text"
                                    placeholder="title..."
                                    value={values.title}
                                    onChange={handleChange}
                                />
                                {touched.title && errors.title && (
                                    <p className="title-error">{errors.title}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <InputField
                                    name="slug"
                                    label="Slug"
                                    type="text"
                                    placeholder="slug..."
                                    value={values.slug}
                                    onChange={handleChange}
                                />
                                {touched.slug && errors.slug && (
                                    <p className="title-error">{errors.slug}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <InputField
                                    name="published_at"
                                    label="Published Date"
                                    type="date"
                                    value={values.published_at}
                                    onChange={handleChange}
                                />
                                {touched.published_at && errors.published_at && (
                                    <p className="title-error">{errors.published_at}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <SelectDropdown
                                    label="Status"
                                    placeholder="select a status"
                                    options={[
                                        { label: "Published", value: "published" },
                                        { label: "Draft", value: "draft" },
                                    ]}
                                    value={values.status}
                                    onSelectChange={(value) => setFieldValue("status", value)}
                                />
                                {touched.status && errors.status && (
                                    <p className="title-error">{errors.status}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1">
                                <InputField
                                    name="image_url"
                                    label="Image"
                                    type="file"
                                    onChange={(event : any) => {
                                        const file = event.currentTarget.files[0];
                                        setFieldValue("image_url", file);
                                        setTouched({ ...touched, image_url: true });
                                    }}
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <SelectDropdown
                                    label="Category"
                                    placeholder="select a category"
                                    options={categoryOptions}
                                    value={values.category_id}
                                    onSelectChange={(value) => setFieldValue("category_id", value)}
                                />
                                {touched.category_id && errors.category_id && (
                                    <p className="title-error">{errors.category_id}</p>
                                )}
                            </div>

                            <div className="md:col-span-2 col-span-1 h-max flex flex-col gap-1">
                                <TextEditor
                                    value={values.content}
                                    onChange={(value) => setFieldValue("content", value)}
                                    placeholder="Content"
                                />
                                {touched.content && errors.content && (
                                    <p className="title-error">{errors.content}</p>
                                )}
                            </div>

                            <div className="md:col-span-2 col-span-1 flex items-center gap-2 justify-end mt-4">
                                <Link href="/admin/articles">
                                    <button type="button" className="btn-action-form bg-gray-700 hover:bg-gray-800">
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="btn-action-form bg-black hover:opacity-80"
                                    
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset} 
                                    className="btn-action-form bg-gray-500 hover:opacity-80"
                                >
                                    Reset
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </LayoutAdmin>
    )
}

export default Page
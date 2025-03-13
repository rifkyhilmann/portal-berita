"use client";

import InputField from "@/components/molecules/InputField";
import LayoutAdmin from "@/components/template/LayoutAdmin";
import useFetch from "@/hooks/useFetch";
import { showDialog, showToast } from "@/utils/alert.utils";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { MdOutlineFolder } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nama kategori tidak boleh kosong!"),
});

const Page = () => {
    const { refetch: createCategory, loading } = useFetch<{ message: string; status: number }>(
        "/api/category",
        "POST",
        null,
        undefined,
        true 
    );

    const handleSubmit = async (values: { name: string }, { resetForm }: { resetForm: () => void }) => {
        try {
            const response = await createCategory("/api/category", { name: values.name });

            if (response?.status === 200) {
                showToast("success", "Success!");
                resetForm(); 
            }
        } catch (error) {
            showDialog("error", "Error", "Gagal menyimpan kategori!");
        }
    };

    return (
        <LayoutAdmin>
            <Breadcrumb
                items={[
                    {
                        title: <Link href="/admin/category" className="text-black">Category</Link>,
                        className: "font-medium text-black",
                    },
                    {
                        title: "Create",
                        className: "font-medium text-gray-600",
                    },
                ]}
            />

            <div className="content-box">
                <h1 className="text-sm font-medium">Create Category</h1>
                <Formik
                    initialValues={{ name: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleReset }) => (
                        <Form>
                            <InputField
                                label="Name"
                                type="text"
                                placeholder="name category..."
                                name="name"
                                icon={<MdOutlineFolder className="mr-1 text-lg text-gray-300" />}
                                value={values.name}
                                onChange={handleChange}
                            />
                            {touched.name && errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                            <div className="flex items-center gap-2 justify-end mt-4">
                                <Link href="/admin/category">
                                    <button type="button" className="btn-action-form bg-gray-700 hover:bg-gray-800">
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="btn-action-form bg-black hover:opacity-80"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save"}
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
    );
};

export default Page;

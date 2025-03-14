"use client";

import InputField from "@/components/molecules/InputField"
import { MdOutlineLock } from "react-icons/md"
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Formik } from "formik";
import { showDialog, showToast } from "@/utils/alert.utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SpinnerWhite } from "@/assets/gif";
import Image from "next/image";
import { LoginSchema } from "@/validation/auth.schema";
import { Logo } from "@/assets/icons";

const Page = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (
        values: { email: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
        resetForm: () => void
    ) => {
        setIsLoading(true);
        resetForm();


        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });

            setSubmitting(false);
    
            
            console.log(res);

            if (!res?.ok && res?.error) {
                showDialog('error', 'Error', res.error);
            } else {
                router.push("/admin");
                showToast("success", "Login success");
            }
        } catch (error) {
            showDialog('error', 'Error', "Something went wrong");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-[90%] max-w-[350px] h-max bg-white rounded shadow px-10 pt-7 pb-10 flex flex-col gap-5">
                <div className="h-16 w-full flex items-center justify-center  gap-3 pl-4">
                    <Image 
                        src={Logo}
                        alt="Logo"
                        className="h-12 w-12"
                    />
                    <p className="text-lg font-semibold">FlashNews</p>
                </div>
                
                <Formik 
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => handleSubmit(values, { setSubmitting }, resetForm)}
                >
                    {({ handleChange, handleSubmit, values, isSubmitting, errors, touched }) => (
                        <form 
                            onSubmit={handleSubmit}
                            className="w-full h-max flex flex-col gap-3"
                        >
                            <div className="flex flex-col gap-2">
                                <InputField
                                    name="email"
                                    label="Email"
                                    placeholder="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    icon={<MailOutlined  className="mr-1 text-gray-200" />}
                                /> 
                                {touched.email && errors.email && (
                                    <div className="text-red-500 text-[10px]">{errors.email}</div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <InputField
                                    name="password"
                                    label="Password"
                                    placeholder="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    icon={<MdOutlineLock className="mr-1 text-gray-200" />}
                                />  
                                {touched.password && errors.password && (
                                    <div className="text-red-500 text-[10px]">{errors.password}</div>
                                )}
                            </div>
                            
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="h-9 w-full bg-black hover:opacity-70 cursor-pointer rounded-lg text-white text-xs mt-5 flex items-center justify-center "
                            >
                                {isLoading ? (
                                    <Image 
                                        src={SpinnerWhite}
                                        alt="Gif Spiiner white"
                                        className="h-6 w-6"
                                    />
                                ) : (
                                    <p>Login</p>
                                )}
                            </button>
                        </form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default Page
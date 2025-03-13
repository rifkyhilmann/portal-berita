import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, "Nama minimal 2 karakter").required("Nama wajib diisi"),
    email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
    password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
});

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),    
    password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
});
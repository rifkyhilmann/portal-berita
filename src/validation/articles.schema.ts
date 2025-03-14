import * as Yup from "yup";

export const ArticlesSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title wajib diisi")
        .min(5, "Title minimal 5 karakter"),
    slug: Yup.string()
        .required("Slug wajib diisi")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug tidak valid"),
    content: Yup.string().required("Content wajib diisi"),
    category_id: Yup.string().required("Category wajib dipilih"),
    published_at: Yup.date().required("Tanggal publish wajib diisi"),
    status: Yup.string().oneOf(["published", "draft"], "Status tidak valid"),
    image_url: Yup.mixed()
    .required("Gambar wajib diunggah")
    .test(
        "fileType",
        "Format gambar tidak valid. Hanya PNG, JPG, dan JPEG yang diperbolehkan.",
        (value) => {
        if (!value) return false; // Required check
        if (!(value instanceof File)) return false; // Pastikan value adalah file
        const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
        return supportedFormats.includes(value.type);
        }
    )
    .test(
        "fileSize",
        "Ukuran gambar maksimal 2MB.",
        (value) => {
        if (!value) return false; // Required check
        if (!(value instanceof File)) return false; // Pastikan value adalah file
        return value.size <= 2 * 1024 * 1024; // Maksimum 2MB
        }
    ),

});

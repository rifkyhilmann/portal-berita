import * as Yup from "yup";

export const ValidationCategory = Yup.object().shape({
    name: Yup.string().required("Nama kategori tidak boleh kosong!"),
});
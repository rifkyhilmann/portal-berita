import { useState } from "react";

const useImageUpload = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Buat preview
        }
    };

    return { image, imagePreview, handleImageChange, setImage };
};

export default useImageUpload;

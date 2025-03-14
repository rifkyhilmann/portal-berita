"use client";

import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import type { UploadProps } from "antd";

interface UploadFileProps {
  value?: File | null; // Simpan sebagai objek File
  onChange?: (file: File | null) => void; // Fungsi untuk update Formik
}

const UploadFile: React.FC<UploadFileProps> = ({ value, onChange }) => {
  const uploadProps: UploadProps = {
    name: "file",
    maxCount: 1,
    beforeUpload: (file) => {
      onChange?.(file); // Simpan file ke Formik
      return false; // Mencegah upload otomatis ke server
    },
    onRemove: () => {
      onChange?.(null); // Hapus file dari Formik
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary" icon={<UploadOutlined />}>
        Upload File
      </Button>
     
    </Upload>
  );
};

export default UploadFile;

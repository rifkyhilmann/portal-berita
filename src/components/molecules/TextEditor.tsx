"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";

import { TextEditorProps } from "@/types/components.types";

// Dynamically import JoditEditor to prevent SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ 
  value, 
  onChange, 
  placeholder 
}: TextEditorProps) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // Bisa diedit
    placeholder: placeholder || "Tulis sesuatu...",
    toolbarButtonSize: "small" as const, // Update this line
    toolbarAdaptive: false, // Agar toolbar tetap terlihat
    buttons: "bold,italic,underline,strikethrough,|,ul,ol,|,link,image,video,|,align,undo,redo",
    uploader: { insertImageAsBase64URI: true }, // Memudahkan upload gambar
  };

  return (
    <div className="flex flex-col gap-1 w-full h-full">
      {placeholder && <p className="text-xs">{placeholder}</p>}
      <div className="w-full h-max lg:h-full text-sm">
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          onBlur={(newContent) => onChange(newContent)}
        />
      </div>
    </div>
  );
};

export default TextEditor;

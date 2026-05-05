// components/SimpleEditor.tsx
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // светлая тема

const SimpleEditor: React.FC = () => {
  const [value, setValue] = useState("");

  // Минимальный набор инструментов в тулбаре
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Начните писать..."
      />
    </div>
  );
};

export default SimpleEditor;

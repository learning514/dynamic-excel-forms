
import React from "react";
import { Upload } from "lucide-react";
import * as XLSX from "xlsx";

interface ExcelUploadProps {
  onColumnsExtracted: (columns: string[]) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onColumnsExtracted }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      if (!data) return;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      if (Array.isArray(json) && json.length > 0) {
        const columns: string[] =
          Array.isArray(json[0]) && json[0].length > 0
            ? json[0].map((c) => (typeof c === "string" ? c : ""))
            : [];
        onColumnsExtracted(columns.filter(Boolean));
      }
    };
    reader.readAsBinaryString(file);
    // Reset input so same file can be selected again
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition ml-2">
      <Upload size={18} className="mr-2" />
      Upload Excel
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  );
};

export default ExcelUpload;

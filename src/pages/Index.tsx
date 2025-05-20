
import React, { useState } from "react";
import ExcelUpload from "@/components/ExcelUpload";
import { Plus, FileText, Edit, Pencil, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type FormField = {
  label: string;
  value: string;
};

const Index = () => {
  const [formName, setFormName] = useState("employee details");
  const [fields, setFields] = useState<FormField[]>([{ label: "name", value: "" }]);

  // Called when ExcelUpload extracts columns
  const handleExcelColumns = (columns: string[]) => {
    setFields(columns.map((col) => ({ label: col, value: "" })));
    if (columns[0]) setFormName(columns[0]);
  };

  // Handle dynamic input change
  const handleFieldChange = (idx: number, value: string) => {
    setFields((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, value } : f))
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <span className="font-medium mr-2 text-slate-700 text-lg">Form Name:</span>
          <input
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none bg-white min-w-[270px]"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Button className="bg-[#0c1624] hover:bg-[#122142] px-6 mr-2">Save Form</Button>
          <ExcelUpload onColumnsExtracted={handleExcelColumns} />
          <button className="ml-2 px-5 py-2 rounded-lg border bg-white hover:bg-gray-50 border-gray-300 font-semibold flex items-center">
            <span className="mr-2">
              <FileText size={18} />
            </span>
            Download JSON
          </button>
        </div>
      </div>
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Sidebar */}
        <div className="col-span-1 bg-white border rounded-xl shadow-sm p-6 flex flex-col max-w-xs min-w-[270px]">
          <h3 className="font-semibold text-lg mb-4">Field Types</h3>
          <div className="grid grid-cols-2 gap-3 mb-7">
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2 text-gray-700">T</span> Text
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">
                <Pencil size={16} />
              </span>
              Select
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">
                <Edit size={16} />
              </span>
              Textarea
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">
                <Plus size={16} />
              </span>
              Radio
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">
                <input type="checkbox" disabled className="accent-black" />
              </span>
              Checkbox
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">
                <Upload size={16} />
              </span>
              Upload
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">@</span>
              Email
            </button>
            <button className="flex items-center border px-3 py-2 rounded-lg hover:bg-gray-50">
              <span className="mr-2">📞</span>
              Phone
            </button>
          </div>
          <Button className="w-full bg-[#0c1624] hover:bg-[#122142] mb-6">Create New Form</Button>
          <div>
            <span className="font-semibold text-base text-gray-800 mb-2 block">Saved Forms</span>
            <div className="space-y-2">
              <div className="flex items-center px-3 py-2 bg-[#f7f8fa] rounded border">
                <span className="flex-1 text-gray-800">student details</span>
                <FileText size={17} className="ml-2 text-slate-600" />
              </div>
              <div className="flex items-center px-3 py-2 bg-[#f7f8fa] rounded border">
                <span className="flex-1 text-gray-800">student details</span>
                <FileText size={17} className="ml-2 text-slate-600" />
              </div>
              <div className="flex items-center px-3 py-2 bg-[#f7f8fa] rounded border">
                <span className="flex-1 text-gray-800">employee details</span>
                <FileText size={17} className="ml-2 text-slate-600" />
              </div>
            </div>
          </div>
        </div>
        {/* Dynamic Form Main */}
        <div className="col-span-2">
          <div className="bg-white border p-7 rounded-xl shadow-sm w-full min-h-[340px]">
            <h2 className="text-2xl font-bold mb-6">{formName}</h2>
            <form className="space-y-6">
              {fields.map((field, i) => (
                <div key={i}>
                  <label className="block font-medium mb-2">{field.label}</label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    value={field.value}
                    onChange={(e) => handleFieldChange(i, e.target.value)}
                  />
                </div>
              ))}
              <Button className="w-full bg-[#0c1624] hover:bg-[#122142] mt-10">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

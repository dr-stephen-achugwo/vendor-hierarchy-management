import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadDriverDocument } from "@/redux/subVendorSlice";

const UploadDriverDocsModal = ({ driverId, onClose }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = () => {
    if (selectedFile) {
      dispatch(uploadDriverDocument({ driverId, document: URL.createObjectURL(selectedFile) }));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded w-1/3">
        <h2 className="text-xl font-bold mb-4">Upload Driver Document</h2>

        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="border p-2 w-full mb-4" />

        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleFileUpload}>
          Upload
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadDriverDocsModal;

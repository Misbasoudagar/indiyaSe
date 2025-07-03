import React, { useState } from "react";
import { motion } from "framer-motion";
import { CloudUpload } from "lucide-react";

const UploadPrescription = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile && uploadedFile.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreview(null);
    }
  };

  const handleRemovePreview = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload.");
    setLoading(true);

    setTimeout(() => {
      console.log("Uploaded:", file.name);
      alert("Prescription uploaded successfully!");
      setFile(null);
      setPreview(null);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl border border-blue-700"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <CloudUpload className="w-16 h-16 text-blue-400" />
        </motion.div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Your Prescription
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="block mb-2 text-sm font-medium">Choose a file</span>
            <input
              type="file"
              accept="image/*,.pdf"
              capture="environment"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 hover:file:bg-blue-700"
            />
          </label>

          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-4 relative"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-lg border border-gray-600"
              />
              <button
                type="button"
                onClick={handleRemovePreview}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs rounded"
              >
                ✕
              </button>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {loading ? "Uploading..." : "Upload"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Accepted formats: JPG, PNG, PDF. Max size: 5MB
        </p>
      </motion.div>
    </div>
  );
};

export default UploadPrescription;

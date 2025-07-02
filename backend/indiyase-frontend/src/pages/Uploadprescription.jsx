import React, { useState } from "react";

const Uploadprescription = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload.");

    // TODO: Send file to backend or Firebase
    console.log("File submitted:", file.name);
  };

  return (
    <div className="upload-prescription-page" style={{ padding: "2rem" }}>
      <h2>Upload Your Prescription</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} />
        {preview && (
          <div>
            <h4>Preview:</h4>
            <img src={preview} alt="Preview" style={{ maxWidth: "300px", marginTop: "10px" }} />
          </div>
        )}
        <button type="submit" style={{ marginTop: "1rem" }}>Upload</button>
      </form>
    </div>
  );
};

export default Uploadprescription;

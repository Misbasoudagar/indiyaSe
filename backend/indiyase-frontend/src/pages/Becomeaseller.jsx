import React, { useState } from "react";

const Becomeaseller = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gstOrUin: "",
    bankAccount: "",
    category: "",
    idProof: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TEMP placeholder for file (later use Firebase/Cloudinary)
    const idProofUrl = "https://dummyurl.com/id-proof.png";

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      gstOrUin: form.gstOrUin,
      bankAccount: form.bankAccount,
      category: form.category || "Unspecified",
      idProofUrl,
    };

    try {
      const res = await fetch("http://localhost:5000/api/sellers/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong while submitting.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
          <p>Your request to become a seller has been received. We'll contact you soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Become an IndiyaSe Seller
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "GSTIN or UIN", name: "gstOrUin", type: "text" },
            { label: "Bank Account Details", name: "bankAccount", type: "text" },
            { label: "Product Category", name: "category", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                required
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload ID or Business Proof
            </label>
            <input
              type="file"
              name="idProof"
              required
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Register Now
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          By registering, you agree to IndiyaSe’s seller terms & conditions.
        </p>
      </div>
    </div>
  );
};

export default Becomeaseller;

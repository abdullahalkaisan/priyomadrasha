


import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCreateOrgStore } from "../../store/useCreateOrgStore";
import { useAuthStore } from "../../store/useAuthStore";



const StepperInfo = () => {


  const {
    formData,
    setFormData,
    isAnyGalleryUploading,
    galleryUrls,
    logoFile,
    setLogoFile,
    coverFile,
    setCoverFile,
    galleryFiles,
    setGalleryFiles,
    logoPreview,
    setLogoPreview,
    coverPreview,
    setCoverPreview,
    galleryPreviews,
    setGalleryPreviews,
    uploadLogo,
    uploadCover,
    uploadSingleGalleryImage,
    submitOrganization,
    isUploadComplete,
    isUploading,
    logoUploading,
    coverUploading,
    galleryUploadingStatus,
    loading,
    validateForm,
    resetAll,
    min_gallery,
    max_gallery,
  } = useCreateOrgStore();

  const navigate = useNavigate();
  const { user } = useAuthStore();

  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [errors, setErrors] = useState([]);

  // Handle logo file change
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));

    try {
      await uploadLogo(file);
    } catch (error) {
      toast.error("Logo upload failed: " + error.message);
    }
  };

  // Handle cover file change
  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));

    try {
      await uploadCover(file);
    } catch (error) {
      toast.error("Cover upload failed: " + error.message);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      emailUser: user.email,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors");
      return;
    }

    // Check uploads
    if (!isUploadComplete()) {
      toast.error("Please complete all image uploads before submitting");
      return;
    }

    try {
      await submitOrganization();
      Swal.fire({
        icon: "success",
        title: "Successfully Created!",
        text: "Your organization has been created successfully.",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/pending");
        resetAll();
      });
    } catch (error) {
      toast.error("Failed to create organization: " + error.message);
    }
  };




  return (
      <div className="max-w-2xl mx-auto p-6">
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Name * (প্রতিষ্ঠানের নাম)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization URL ID * প্রতিষ্ঠানের ইউআরএল আইডি
                </label>
                <input
                  type="text"
                  name="urlID"
                  value={formData.urlID}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="unique-url-id"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Email * (প্রতিষ্ঠানের ইমেইল)
                </label>
                <input
                  type="email"
                  name="orgEmail"
                  value={formData.orgEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="organization@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number * (যোগাযোগ নম্বর)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="+880 1234567890"
                />
              </div>


              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Details (প্রতিষ্ঠানের বিবরণ)
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={6}
                  maxLength={2000}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Organization description..."
                />
                <p
                  className={`text-sm ${
                    formData.details.length > 2000
                      ? "text-red-500"
                      : "text-gray-500"
                  } mt-1`}
                >
                  {formData.details.length}/2000 characters
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
  )
}

export default StepperInfo


import PageHeader from "../components/PageHeader";
import { useCreateOrgStore } from "../store/useCreateOrgStore";
import { useRef, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DistrictsSelect from "../components/selects/DistrictSelector";
import DivisionSelect from "../components/selects/DivisionSelector";
import UpozilaSelector from "../components/selects/UpozilaSelector";
import HorizontalLinearStepper from "../components/stepper/HorizontalLinearStepper";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import AbashikFilterSelector from "../components/selects/ResidencyTypeSelector";
import ResidencyTypeSelector from "../components/selects/ResidencyTypeSelector";
import CheckCreate from "../components/selects/CheckCreate";

export default function CreateOrganizationPage() {
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
    checkBoxValue,
  } = useCreateOrgStore();


  console.log(formData);

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

    if(!checkBoxValue){
      toast.error("Please select your education grades");
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

  const remainingGalleryLeft = () => {
    const remaining = min_gallery - galleryFiles.length;
    if (remaining > 0) {
      return (
        <div className="bg-rose-100 text-rose-600 rounded-full px-3 py-1 cursor-pointer">
          {remaining} {remaining === 1 ? "Image" : "Images"} left
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <PageHeader
        title={"Create Organization"}
        subtitle={
          "আপনার প্রতিষ্ঠানের প্রোফাইল তৈরি করতে নিচের তথ্যগুলো পূরণ করুন।"
        }
      />

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
                  autoFocus
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
                {/* <input
                  type="text"
                  name="urlID"
                  value={formData.urlID}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="unique-url-id"
                /> */}
                {/* <input
                    type="text"
                    name="urlID"
                    value={formData.urlID}
                    onChange={(e) => {
                      // remove any spaces as user types
                      const sanitized = e.target.value.replace(/\s+/g, "");
                      setFormData((prev) => ({
                        ...prev,
                        urlID: sanitized,
                      }));
                    }}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="unique-url-id"
                  /> */}

                <input
                  type="text"
                  name="urlID"
                  value={formData.urlID}
                  onChange={(e) => {
                    // Only allow lowercase letters, numbers, and hyphens
                    const sanitized = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, ""); // removes invalid chars

                    setFormData((prev) => ({
                      ...prev,
                      urlID: sanitized,
                    }));
                  }}
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

              <div className="flex flex-wrap gap-6 w-full">
                <DivisionSelect />
                <DistrictsSelect />
                <UpozilaSelector />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Local Address (স্থানীয় ঠিকানা)
                </label>
                <input
                  type="text"
                  name="localAddress"
                  value={formData.localAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Street address"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City * (শহর)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="City name"
                />
              </div> */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zip Code * (পোস্ট কোড)
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="1234"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Google Maps Link (গুগল ম্যাপ লিংক)
                </label>
                <input
                  type="url"
                  name="mapLink"
                  value={formData.mapLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Google Maps URL"
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
                    formData.details?.length > 2000
                      ? "text-red-500"
                      : "text-gray-500"
                  } mt-1`}
                >
                  {formData.details?.length}/2000 characters
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow gap-3 flex flex-col">
            <ResidencyTypeSelector/>
            <CheckCreate/>
          </div>

          {/* Logo Upload */}
          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Logo *
            </label>
            <div
              onClick={() => !logoUploading && logoInputRef.current?.click()}
              className={`border-2 border-dashed border-gray-300 p-6 text-center ${
                logoUploading
                  ? "cursor-wait opacity-80"
                  : "cursor-pointer hover:border-teal-500"
              } transition rounded-lg`}
            >
              {logoPreview ? (
                <div className="relative inline-block">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  {logoUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8">
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Click to upload logo
                  </span>
                </div>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                hidden
              />
            </div>
          </div>

          {/* Cover Upload */}
          <div className="bg-white p-6 rounded-lg shadow">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image *
            </label>
            <div
              onClick={() => !coverUploading && coverInputRef.current?.click()}
              className={`border-2 border-dashed border-gray-300 p-6 text-center ${
                coverUploading
                  ? "cursor-wait opacity-80"
                  : "cursor-pointer hover:border-teal-500"
              } transition rounded-lg`}
            >
              {coverPreview ? (
                <div className="relative inline-block w-full">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {coverUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8">
                  <Upload size={24} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Click to upload cover
                  </span>
                </div>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                hidden
              />
            </div>
          </div>

          {/* Gallery Upload */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-start flex items-start flex-col space-y-6">
              <label className="block text-sm text-start font-semibold text-gray-700 mb-2">
                Gallery Images * (কমপক্ষে {min_gallery} ছবি আপলোড করতে হবে)
              </label>
              <label className="items-center gap-3 flex text-sm text-start font-semibold text-gray-700 mb-4">
                {`${galleryFiles.length}/${max_gallery}`}
                {remainingGalleryLeft()}
              </label>

              <div
                onClick={() => {
                  if (galleryFiles.length >= max_gallery) {
                    toast.error(`Maximum ${max_gallery} images allowed`);
                    return;
                  }
                  galleryInputRef.current?.click();
                }}
                className={`border-2 w-full border-dashed border-gray-300 p-6 text-center ${
                  isAnyGalleryUploading()
                    ? "cursor-wait opacity-80"
                    : "cursor-pointer hover:border-teal-500"
                } transition rounded-lg`}
              >
                {galleryPreviews.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {galleryUploadingStatus[index] ? (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();

                                const newFiles = [...galleryFiles];
                                const newPreviews = [...galleryPreviews];
                                const newUrls = [...galleryUrls];
                                const newStatuses = [...galleryUploadingStatus];

                                newFiles.splice(index, 1);
                                newPreviews.splice(index, 1);
                                newUrls.splice(index, 1);
                                newStatuses.splice(index, 1);

                                setGalleryFiles(newFiles);
                                setGalleryPreviews(newPreviews);
                                useCreateOrgStore.setState({
                                  galleryUrls: newUrls,
                                  galleryUploadingStatus: newStatuses,
                                });

                                toast("Image removed from gallery");
                              }}
                              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2 pb-8 pt-4">
                      <div className="flex justify-center items-center gap-2 h-10 w-10 rounded-full">
                        <Upload size={24} className="text-gray-400" />
                      </div>
                      <span className="text-sm text-gray-500">
                        Click to upload gallery images
                      </span>
                      <span className="text-xs text-gray-400">
                        Select {min_gallery}–{max_gallery} images
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2 py-8">
                    <div className="flex justify-center items-center gap-2 h-10 w-10 rounded-full">
                      <Upload size={24} className="text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-500">
                      Click to upload gallery images
                    </span>
                    <span className="text-xs text-gray-400">
                      Select {min_gallery}–{max_gallery} images
                    </span>
                  </div>
                )}
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (galleryFiles.length >= max_gallery) {
                      toast.error(`Maximum ${max_gallery} images allowed`);
                      e.target.value = "";
                      return;
                    }

                    const index = galleryFiles.length;
                    setGalleryFiles([...galleryFiles, file]);
                    setGalleryPreviews([
                      ...galleryPreviews,
                      URL.createObjectURL(file),
                    ]);

                    const newStatuses = [...galleryUploadingStatus];
                    newStatuses[index] = true;
                    useCreateOrgStore.setState({
                      galleryUploadingStatus: newStatuses,
                      galleryUrls: [...galleryUrls, null],
                    });

                    try {
                      await uploadSingleGalleryImage(file, index);
                    } catch (error) {
                      toast.error("Gallery upload failed: " + error.message);
                    } finally {
                      e.target.value = "";
                    }
                  }}
                  hidden
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex w-full justify-end">
            <button
              type="submit"
              disabled={loading || isUploading() || !isUploadComplete()}
              className={`px-8 w-full py-3 rounded-lg font-semibold ${
                loading || isUploading() || !isUploadComplete()
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700 cursor-pointer text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
















































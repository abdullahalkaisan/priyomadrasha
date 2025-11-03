
// import { useEffect, useRef } from "react";
// import {
//   Upload,
//   X,
//   Plus,
//   Loader2,
//   CheckCircle,
//   ArrowLeft,
//   CircleCheckBig,
//   RefreshCw,
// } from "lucide-react";
// import { useCreateOrgStore } from "../store/useCreateOrgStore";
// import BackButton from "../components/buttons/BackButton";
// import PageHeader from "../components/PageHeader";

// const MAX_GALLERY_IMAGES = 20;

// export default function CreateOrganizationPage({ user }) {
//   const {
//     logoFile,
//     setLogoFile,
//     coverFile,
//     setCoverFile,
//     galleryFiles,
//     setGalleryFiles,
//     logoPreview,
//     setLogoPreview,
//     coverPreview,
//     setCoverPreview,
//     galleryPreviews,
//     setGalleryPreviews,
//     logoUrl,
//     coverUrl,
//     galleryUrls,
//     galleryUploadingStatus,
//     logoUploading,
//     coverUploading,
//     loading,
//     setLoading,
//     formData,
//     setFormData,
//     uploadLogo,
//     uploadCover,
//     uploadSingleGalleryImage,
//     isAnyGalleryUploading,
//     isUploading,
//     resetAll,
//   } = useCreateOrgStore();

//   const logoInputRef = useRef(null);
//   const coverInputRef = useRef(null);
//   const galleryInputRef = useRef(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle Logo Upload
//   const handleLogoChange = async (file) => {
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setLogoFile(file);
//       setLogoPreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Upload immediately
//     try {
//       await uploadLogo(file);
//     } catch (error) {
//       alert("Logo upload failed. Please try again.");
//     }
//   };

//   // Handle Cover Upload
//   const handleCoverChange = async (file) => {
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setCoverFile(file);
//       setCoverPreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Upload immediately
//     try {
//       await uploadCover(file);
//     } catch (error) {
//       alert("Cover upload failed. Please try again.");
//     }
//   };

//   // Handle Gallery Upload - Upload each image independently
//   const handleGalleryAdd = async (files) => {
//     if (!files || files.length === 0) return;

//     const currentCount = galleryFiles?.length || 0;
//     const newFilesArray = Array.from(files);

//     // Check max limit
//     if (currentCount + newFilesArray.length > MAX_GALLERY_IMAGES) {
//       alert(`Maximum ${MAX_GALLERY_IMAGES} gallery images allowed`);
//       return;
//     }

//     const newFiles = [];
//     const newPreviews = [];
//     let loadedCount = 0;

//     newFilesArray.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         newFiles.push(file);
//         newPreviews.push(reader.result);
//         loadedCount++;

//         if (loadedCount === newFilesArray.length) {
//           const updatedFiles = [...(galleryFiles || []), ...newFiles];
//           const updatedPreviews = [...(galleryPreviews || []), ...newPreviews];
//           const updatedUrls = [
//             ...(galleryUrls || []),
//             ...new Array(newFiles.length).fill(null),
//           ];
//           const updatedStatus = [
//             ...(galleryUploadingStatus || []),
//             ...new Array(newFiles.length).fill(false),
//           ];

//           setGalleryFiles(updatedFiles);
//           setGalleryPreviews(updatedPreviews);

//           // Initialize the arrays in the store - FIXED: Changed from useImageStore to useCreateOrgStore
//           useCreateOrgStore.setState({
//             galleryUrls: updatedUrls,
//             galleryUploadingStatus: updatedStatus,
//           });

//           // Upload each new image independently
//           newFiles.forEach((file, idx) => {
//             const actualIndex = currentCount + idx;
//             uploadSingleGalleryImage(file, actualIndex).catch(() => {
//               console.error(`Failed to upload gallery image ${actualIndex}`);
//             });
//           });
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // Remove gallery image - instant delete
//   const removeGalleryImage = (index) => {
//     const updatedFiles = galleryFiles.filter((_, i) => i !== index);
//     const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);
//     const updatedUrls = galleryUrls.filter((_, i) => i !== index);
//     const updatedStatus = galleryUploadingStatus.filter((_, i) => i !== index);

//     setGalleryFiles(updatedFiles);
//     setGalleryPreviews(updatedPreviews);

//     // Update store immediately - FIXED: Changed from useImageStore to useCreateOrgStore
//     useCreateOrgStore.setState({
//       galleryUrls: updatedUrls,
//       galleryUploadingStatus: updatedStatus,
//     });
//   };

//   // Form Validation
//   const isFormValid = () => {
//     const uploadedGalleryCount = galleryUrls.filter(
//       (url) => url !== null
//     ).length;

//     return (
//       formData?.name?.trim() !== "" &&
//       formData?.number?.trim() !== "" &&
//       formData?.address?.trim() !== "" &&
//       logoUrl !== null &&
//       coverUrl !== null &&
//       uploadedGalleryCount >= 1 &&
//       uploadedGalleryCount <= MAX_GALLERY_IMAGES
//     );
//   };

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       alert("Please fill all required fields and upload required images");
//       return;
//     }

//     if (isUploading()) {
//       alert("Please wait for all uploads to complete");
//       return;
//     }

//     setLoading(true);

//     try {
//       const submissionData = {
//         name: formData.name,
//         emailUser: user.email,
//         phone: formData.number,
//         address: formData.address,
//         mapLink: formData.mapLink || null,
//         details: formData.details || null,
//         logoUrl,
//         coverUrl,
//         galleryUrls: galleryUrls.filter((url) => url !== null),
//       };

//       console.log("📤 Submitting data:", submissionData);

//       // POST to API
//       const response = await fetch("/api/organizations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(submissionData),
//       });

//       const result = await response.json();
//       const { success, message, data } = result;

//       if (!response.ok) {
//         throw new Error(message || "Organization creation failed");
//       }

//       if (success) {
//         alert(message || "Organization created successfully!");
//         resetAll();
//         // Optional: redirect to dashboard or org page
//         // window.location.href = `/organizations/${data._id}`;
//       }
//     } catch (error) {
//       console.error("Error creating organization:", error);
//       alert(error.message || "Failed to create organization");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <PageHeader
//         title={"Create Your Organization"}
//         subtitle={
//           "Fill in the details below to create your organization profile"
//         }
//       />

//       {/* <div className=" top-0 z-10 bg-gradient-to-b from-white to-transparent p-10 px-10">
//         <div className="flex items-center justify-between">
//           <BackButton bgColor={"bg-gray-100"} />
//           <div className="text-center w-full flex justify-center flex-col items-center ">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
//               Create Your Organization
//             </h1>
//             <p className=" text-gray-600">
//               Fill in the details below to create your organization profile
//             </p>
//           </div>

//           <button
//             // onClick={fetchPendingOrganizations}
//             className="bg-teal-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors flex items-center gap-2"
//           >
//             <RefreshCw className="w-4 h-4" />
//             Reload
//           </button>
//         </div>
//       </div> */}

//       {/* <BackButton />
//       <div className="w-full flex justify-center flex-col items-center mb-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
//           Create Your Organization
//         </h1>
//         <p className="text-gray-600">
//           Fill in the details below to create your organization profile
//         </p>
//       </div> */}

//       <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         <div className="space-y-6">
//           {/* Organization Name */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Organization Name * (প্রতিষ্ঠানের নাম)
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Enter your organization name"
//               required
//               className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/* Contact Number */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Contact Number * (যোগাযোগ নম্বর)
//             </label>
//             <input
//               type="tel"
//               name="number"
//               value={formData.number}
//               onChange={handleInputChange}
//               placeholder="Enter your contact number"
//               required
//               className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/*City */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               City * (শহর)
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Ex. Dhaka"
//               required
//               className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/*Local Address */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Zip code* (পোস্ট কোড)
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Enter your zip code"
//               required
//               className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/*Local Address */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Local Address * (স্থানীয় ঠিকানা)
//             </label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Ex. Jatrabari"
//               required
//               className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/* Google map link */}
//           <div>
//             <label className="block text-sm font-semibold text-black text-gray-700 mb-2">
//               Google Map Link (গুগল ম্যাপ লিংক)
//             </label>
//             <input
//               type="url"
//               name="mapLink"
//               value={formData.mapLink}
//               onChange={handleInputChange}
//               placeholder="Enter your google map link"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>

//           {/* Details */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Organization Details (প্রতিষ্ঠানের বিবরণ)
//             </label>
//             <textarea
//               name="details"
//               value={formData.details}
//               onChange={handleInputChange}
//               placeholder="Enter organization description"
//               rows="4"
//               className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           </div>





//           {/* Logo Upload */}
//           <div className="text-center flex items-center flex-col">
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Organization Logo *
//             </label>
//             <div
//               onClick={() => !logoUploading && logoInputRef.current?.click()}
//               className={`border-2 w-32 h-32 border-dashed border-gray-300 p-6 text-center ${
//                 logoUploading
//                   ? "cursor-not-allowed"
//                   : "cursor-pointer hover:border-teal-500"
//               } transition rounded-full justify-center flex items-center relative`}
//             >
//               {logoUploading ? (
//                 <div className="flex flex-col items-center gap-2">
//                   <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
//                   <span className="text-xs text-gray-600">Uploading...</span>
//                 </div>
//               ) : logoPreview ? (
//                 <div className="relative inline-block">
//                   <div className="relative h-24 w-24">
//                     <img
//                       src={logoPreview}
//                       alt="Logo"
//                       className="h-24 w-24 object-cover rounded-full"
//                     />
//                   </div>

//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setLogoPreview(null);
//                       setLogoFile(null);
//                       // FIXED: Changed from useImageStore to useCreateOrgStore
//                       useCreateOrgStore.setState({ logoUrl: null });
//                     }}
//                     className="absolute -top-2 -right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex justify-center items-center gap-2 bg-gray-100 h-10 w-10 rounded-full">
//                   <Upload size={24} className="text-gray-400" />
//                 </div>
//               )}
//               <input
//                 ref={logoInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleLogoChange(e.target.files[0])}
//                 disabled={logoUploading}
//                 hidden
//               />
//             </div>
//           </div>

//           {/* Cover Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Cover Image *
//             </label>
//             <div
//               onClick={() => !coverUploading && coverInputRef.current?.click()}
//               className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${
//                 coverUploading
//                   ? "cursor-not-allowed"
//                   : "cursor-pointer hover:border-teal-500"
//               } transition relative`}
//             >
//               {coverUploading ? (
//                 <div className="flex flex-col items-center gap-2">
//                   <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
//                   <span className="text-sm text-gray-600">
//                     Uploading cover...
//                   </span>
//                 </div>
//               ) : coverPreview ? (
//                 <div className="relative inline-block">
//                   <img
//                     src={coverPreview}
//                     alt="Cover"
//                     className="h-32 w-full object-cover rounded-xl max-w-xs mx-auto"
//                   />

//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setCoverPreview(null);
//                       setCoverFile(null);
//                       // FIXED: Changed from useImageStore to useCreateOrgStore
//                       useCreateOrgStore.setState({ coverUrl: null });
//                     }}
//                     className="absolute -top-2 -right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center gap-2">
//                   <Upload size={24} className="text-gray-400" />
//                   <p className="text-gray-600">Click to upload cover image</p>
//                 </div>
//               )}
//               <input
//                 ref={coverInputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleCoverChange(e.target.files[0])}
//                 disabled={coverUploading}
//                 hidden
//               />
//             </div>
//           </div>

//           {/* Gallery Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Gallery Images * ({galleryUrls.filter((u) => u !== null).length}/
//               {MAX_GALLERY_IMAGES} uploaded)
//             </label>
//             <div className="grid grid-cols-4 gap-4 mb-4">
//               {galleryPreviews?.map((preview, index) => (
//                 <div key={index} className="relative group cursor-pointer">
//                   <img
//                     src={preview}
//                     alt={`Gallery ${index}`}
//                     className="w-full h-32 object-cover rounded-xl"
//                   />

//                   {/* Show upload status for this specific image */}
//                   {galleryUploadingStatus[index] ? (
//                     <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
//                       <Loader2 className="w-6 h-6 text-white animate-spin" />
//                     </div>
//                   ) : galleryUrls[index] ? (
//                     <div className="absolute top-2 right-2 bg-green-500 rounded-full p-0">
//                       {/* <CheckCircle size={12} className="text-white" /> */}
//                     </div>
//                   ) : null}

//                   <button
//                     type="button"
//                     onClick={() => removeGalleryImage(index)}
//                     className="absolute -top-2 -right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             {(galleryPreviews?.length || 0) < MAX_GALLERY_IMAGES && (
//               <button
//                 type="button"
//                 onClick={() => galleryInputRef.current?.click()}
//                 className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-teal-500 transition flex items-center justify-center gap-2 text-gray-600"
//               >
//                 <Plus size={20} />
//                 Add Gallery Images (Min 1, Max {MAX_GALLERY_IMAGES})
//               </button>
//             )}
//             <input
//               ref={galleryInputRef}
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) => handleGalleryAdd(e.target.files)}
//               hidden
//             />
//           </div>






//           {/* Submit Button */}
//           {/* {!loading ||
//             !isUploading() ||
//             (isFormValid() && (
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || isUploading() || !isFormValid()}
//                 className="w-full  bg-teal-600 hover:bg-teal-700 cursor-pointer disabled:bg-teal-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Creating organization...
//                   </>
//                 ) : isUploading() ? (
//                   <>
//                     <Loader2 className="w-5 h-5 animate-spin" />
//                     Uploading Images...
//                   </>
//                 ) : (
//                   "Create organization"
//                 )}
//               </button>
//             ))} */}

//           <div className="w-full flex justify-end">
//             <button
//               onClick={handleSubmit}
//               disabled={loading || isUploading() || !isFormValid()}
//               className="w-full px-5 rounded-lg bg-teal-600 hover:bg-teal-700 cursor-pointer disabled:bg-teal-600 disabled:cursor-not-allowed text-white font-semibold py-3  transition flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Creating organization...
//                 </>
//               ) : isUploading() ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Uploading Images...
//                 </>
//               ) : (
//                 "Create organization"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














































































// import PageHeader from "../components/PageHeader";
// import { useCreateOrgStore } from "../store/useCreateOrgStore";
// import { useRef, useState } from "react";
// import { Loader2, Upload, X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// export default function CreateOrganizationPage() {
//   const {
//     formData,
//     setFormData,
//     isAnyGalleryUploading,
//     galleryUrls,
//     logoFile,
//     setLogoFile,
//     coverFile,
//     setCoverFile,
//     galleryFiles,
//     setGalleryFiles,
//     logoPreview,
//     setLogoPreview,
//     coverPreview,
//     setCoverPreview,
//     galleryPreviews,
//     setGalleryPreviews,
//     uploadLogo,
//     uploadCover,
//     uploadSingleGalleryImage,
//     submitOrganization,
//     isUploadComplete,
//     isUploading,
//     logoUploading,
//     coverUploading,
//     galleryUploadingStatus,
//     loading,
//     validateForm,
//     resetAll,
//     min_gallery,
//     max_gallery,
//   } = useCreateOrgStore();

//   const navigate = useNavigate();


//   const {user} = useAuthStore()
//   console.log(user.email);

//     const logoInputRef = useRef(null);
//     const coverInputRef = useRef(null);
//     const galleryInputRef = useRef(null);

//   const [errors, setErrors] = useState([]);

//   // Handle logo file change
//   const handleLogoChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setLogoFile(file);
//     setLogoPreview(URL.createObjectURL(file));

//     try {
//       await uploadLogo(file);
//     } catch (error) {
      
//       console.log("Logo upload failed: " + error.message);
//     }
//   };

//   // Handle cover file change
//   const handleCoverChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setCoverFile(file);
//     setCoverPreview(URL.createObjectURL(file));

//     try {
//       await uploadCover(file);
//     } catch (error) {
//       console.log("Cover upload failed: " + error.message);
//     }
//   };

//   // Handle gallery files change
//   const handleGalleryChange = async (e) => {
//     const files = Array.from(e.target.files);

//     // if (files.length < 3) {
//     //   alert("Please select at least 3 images");
//     //   return;
//     // }

//     if (files.length > 20) {
//       console.log("Maximum 20 images allowed");
//       return;
//     }

//     setGalleryFiles(files);

//     // Create previews
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setGalleryPreviews(previews);

//     // Upload each image
//     try {
//       for (let i = 0; i < files.length; i++) {
//         await uploadSingleGalleryImage(files[i], i);
//       }
//     } catch (error) {
//       console.log("Gallery upload failed: " + error.message);
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       emailUser: user.email,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // Check uploads
//     if (!isUploadComplete()) {
//       console.log("Please complete all image uploads before submitting");
//       return;
//     }

//     try {
//       const result = await submitOrganization();
//       console.log("Organization created:", result);
//       console.log("Organization submitted successfully! Pending approval.");
//       // resetAll();
//       // setErrors([]);
//         Swal.fire({
//           icon: "success",
//           title: "Successfully Created!",
//           text: "Your organization has been created successfully.",
//           showConfirmButton: false,
//           timer: 2000,
//         }).then(() => {
//           navigate("/pending");
//         });

//       // navigate("/pending");
//     } catch (error) {
//       console.log("Failed to create organization: " + error.message);
//     }
//   };





//   const getValidGalleryUrls = () =>
//   useCreateOrgStore.getState().galleryUrls.filter((url) => url);

//   // const remainingGalleryLeft = ()=>{
//   //       if(galleryFiles.length < min_gallery){
//   //           return (
//   //               <div className="bg-rose-100 text-rose-600 rounded-full px-3 py-1 cursor-pointer">
//   //                 {galleryFiles.length - min_gallery} Images left
//   //               </div>  
//   //           )
//   //       }
//   // }

//   const remainingGalleryLeft = () => {
//     const remaining = min_gallery - galleryFiles.length;
//     if (remaining > 0) {
//       return (
//         <div className="bg-rose-100 text-rose-600 rounded-full px-3 py-1 cursor-pointer">
//           {remaining} {remaining === 1 ? "Image" : "Images"} left
//         </div>
//       );
//     }
//   };




//   return (
//     <div>
//       <PageHeader
//         title={"Create Organization"}
//         subtitle={
//           "আপনার প্রতিষ্ঠানের প্রোফাইল তৈরি করতে নিচের তথ্যগুলো পূরণ করুন।"
//         }
//         // Fill in the details below to create your organization profile
//         // আপনার প্রতিষ্ঠানের প্রোফাইল তৈরি করতে নিচের তথ্যগুলো পূরণ করুন।
//       />
//       <div className=" max-w-2xl mx-auto p-6">
//         {errors.length > 0 && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             <ul className="list-disc list-inside">
//               {errors.map((error, index) => (
//                 <li key={index}>{error}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             {/* <h2 className="text-xl font-semibold mb-4">Basic Information</h2> */}

//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Organization Name * (প্রতিষ্ঠানের নাম)
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   maxLength={100}
//                   required
//                   placeholder="Enter your organization name"
//                   className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Organization URL ID * প্রতিষ্ঠানের ইউআরএল আইডি
//                 </label>
//                 <input
//                   type="text"
//                   name="urlID"
//                   value={formData.urlID}
//                   onChange={handleInputChange}
//                   maxLength={100}
//                   required
//                   placeholder="https://www.priomadrasha.com/[Your URL Name]"
//                   className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Organization Email * (প্রতিষ্ঠানের ইমেইল)
//                 </label>
//                 <input
//                   type="email"
//                   name="orgEmail"
//                   value={formData.orgEmail}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Enter your organization email"
//                   className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Phone Number * (যোগাযোগ নম্বর)
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   placeholder="+8801234567890"
//                   required
//                   className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Address Information */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             {/* <h2 className="text-xl font-semibold mb-4">Address</h2> */}

//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     City * (শহর)
//                   </label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Ex. Dhaka"
//                     className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Zip Code * (পোস্ট কোড)
//                   </label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={formData.zipCode}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your area post code"
//                     className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Local Address * (স্থানীয় ঠিকানা)
//                 </label>
//                 <input
//                   type="text"
//                   name="localAddress"
//                   value={formData.localAddress}
//                   onChange={handleInputChange}
//                   required
//                   placeholder="Ex. Jatrabari Kutubkhali"
//                   className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Google Maps Link (গুগল ম্যাপ লিংক)
//                 </label>
//                 <input
//                   type="url"
//                   name="mapLink"
//                   value={formData.mapLink}
//                   onChange={handleInputChange}
//                   placeholder="https://www.google.com/maps/..."
//                   className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Details */}
//           <div className="bg-white p-6 rounded-lg shadow space-y-6">
//             {/* <h2 className="text-xl font-semibold mb-4">Details</h2> */}

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Organization Details (প্রতিষ্ঠানের বিবরণ)
//               </label>
//               <textarea
//                 name="details"
//                 value={formData.details}
//                 onChange={handleInputChange}
//                 maxLength={2000}
//                 rows={6}
//                 placeholder="Enter your organization details"
//                 className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg
//               focus:outline-none focus:ring-2 focus:ring-teal-500"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 {formData.details.length}/2000 characters
//               </p>
//             </div>
//           </div>

//           {/* // Logo Upload Section */}
//           <div className="bg-white p-6 rounded-lg shadow space-y-6">
//             <div className="text-start flex items-center flex-col">
//               <label className="block w-full text-sm font-semibold text-gray-700 mb-2">
//                 Organization Logo *
//               </label>
//               <div
//                 onClick={() => !logoUploading && logoInputRef.current?.click()}
//                 className={`border-2 w-32 h-32 border-dashed border-gray-300 p-6 text-center ${
//                   logoUploading
//                     ? "cursor-not-allowed"
//                     : "cursor-pointer hover:border-teal-500"
//                 } transition rounded-full justify-center flex items-center relative`}
//               >
//                 {logoUploading ? (
//                   <div className="flex flex-col items-center gap-2">
//                     <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
//                     <span className="text-xs text-gray-600">Uploading...</span>
//                   </div>
//                 ) : logoPreview ? (
//                   <div className="relative inline-block">
//                     <div className="relative h-24 w-24">
//                       <img
//                         src={logoPreview}
//                         alt="Logo"
//                         className="h-24 w-24 object-cover rounded-full"
//                       />
//                     </div>

//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setLogoPreview(null);
//                         setLogoFile(null);
//                         useCreateOrgStore.setState({ logoUrl: null });
//                       }}
//                       className="absolute -top-2 -right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex justify-center items-center gap-2 h-10 w-10 rounded-full">
//                     <Upload size={24} className="text-gray-400" />
//                   </div>
//                 )}
//                 <input
//                   ref={logoInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={async (e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;

//                     setLogoFile(file);
//                     setLogoPreview(URL.createObjectURL(file));

//                     try {
//                       await uploadLogo(file);
//                     } catch (error) {
//                       console.log("Logo upload failed: " + error.message);
//                       setLogoPreview(null);
//                       setLogoFile(null);
//                     }
//                   }}
//                   disabled={logoUploading}
//                   hidden
//                 />
//               </div>
//             </div>
//             {/* // Cover Upload Section */}
//             <div className="text-center flex items-start flex-col space-y-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Cover Image *
//               </label>
//               <div
//                 onClick={() =>
//                   !coverUploading && coverInputRef.current?.click()
//                 }
//                 className={`border-2 w-full h-auto border-dashed border-gray-300 p-6 text-center ${
//                   coverUploading
//                     ? "cursor-not-allowed"
//                     : "cursor-pointer hover:border-teal-500"
//                 } transition rounded-lg justify-center flex items-center relative`}
//               >
//                 {coverUploading ? (
//                   <div className="flex flex-col items-center gap-2">
//                     <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
//                     <span className="text-xs text-gray-600">Uploading...</span>
//                   </div>
//                 ) : coverPreview ? (
//                   <div className="relative w-full h-full">
//                     <img
//                       src={coverPreview}
//                       alt="Cover"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                     <button
//                       type="button"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setCoverPreview(null);
//                         setCoverFile(null);
//                         useCreateOrgStore.setState({ coverUrl: null });
//                       }}
//                       className="absolute top-2 right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                     >
//                       <X size={16} />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col justify-center items-center gap-2 ">
//                     <div className="flex justify-center items-center gap-2  h-10 w-10 rounded-full">
//                       <Upload size={24} className="text-gray-400" />
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       Click to upload cover image
//                     </span>
//                   </div>
//                 )}
//                 <input
//                   ref={coverInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={async (e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;

//                     setCoverFile(file);
//                     setCoverPreview(URL.createObjectURL(file));

//                     try {
//                       await uploadCover(file);
//                     } catch (error) {
//                       console.log("Cover upload failed: " + error.message);
//                       setCoverPreview(null);
//                       setCoverFile(null);
//                     }
//                   }}
//                   disabled={coverUploading}
//                   hidden
//                 />
//               </div>
//             </div>

//             {/* // Gallery Upload Section */}
//             {/* <div className="text-start hidden flex items-start flex-col space-y-6">
//               <label className="block text-sm text-start font-semibold text-gray-700 mb-2">
//                 Gallery Images * (3-20 images)
//               </label>
//               <div
//                 onClick={() =>
//                   !isAnyGalleryUploading() && galleryInputRef.current?.click()
//                 }
//                 className={`border-2 w-full  border-dashed border-gray-300 p-6 text-center ${
//                   isAnyGalleryUploading()
//                     ? "cursor-not-allowed"
//                     : "cursor-pointer hover:border-teal-500"
//                 } transition rounded-lg`}
//               >
//                 {galleryPreviews.length > 0 ? (
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {galleryPreviews.map((preview, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={preview}
//                           alt={`Gallery ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                         {galleryUploadingStatus[index] ? (
//                           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
//                             <Loader2 className="w-6 h-6 text-white animate-spin" />
//                           </div>
//                         ) : (
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               // Remove this specific image
//                               const newFiles = [...galleryFiles];
//                               newFiles.splice(index, 1);
//                               setGalleryFiles(newFiles);

//                               const newPreviews = [...galleryPreviews];
//                               newPreviews.splice(index, 1);
//                               setGalleryPreviews(newPreviews);

//                               const newUrls = [...galleryUrls];
//                               newUrls.splice(index, 1);
//                               useCreateOrgStore.setState({
//                                 galleryUrls: newUrls,
//                               });

//                               const newStatuses = [...galleryUploadingStatus];
//                               newStatuses.splice(index, 1);
//                               useCreateOrgStore.setState({
//                                 galleryUploadingStatus: newStatuses,
//                               });
//                             }}
//                             className="absolute top-1 right-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                           >
//                             <X size={14} />
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex flex-col justify-center items-center gap-2 py-8">
//                     <div className="flex justify-center items-center gap-2  h-10 w-10 rounded-full">
//                       <Upload size={24} className="text-gray-400" />
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       Click to upload gallery images
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       Select 3-20 images
//                     </span>
//                   </div>
//                 )}
//                 <input
//                   ref={galleryInputRef}
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={async (e) => {
//                     const files = Array.from(e.target.files);

//                     if (files.length < 3) {
//                       console.log("Please select at least 3 images");
//                       return;
//                     }

//                     if (files.length > 20) {
//                       console.log("Maximum 20 images allowed");
//                       return;
//                     }

//                     setGalleryFiles(files);

//                     // Create previews
//                     const previews = files.map((file) =>
//                       URL.createObjectURL(file)
//                     );
//                     setGalleryPreviews(previews);

//                     // Initialize upload status array
//                     const initialStatuses = new Array(files.length).fill(false);
//                     useCreateOrgStore.setState({
//                       galleryUploadingStatus: initialStatuses,
//                       galleryUrls: new Array(files.length).fill(null),
//                     });

//                     // Upload each image
//                     try {
//                       for (let i = 0; i < files.length; i++) {
//                         await uploadSingleGalleryImage(files[i], i);
//                       }
//                     } catch (error) {
//                       console.log("Gallery upload failed: " + error.message);
//                     }
//                   }}
//                   disabled={isAnyGalleryUploading()}
//                   hidden
//                 />
//               </div>
//             </div> */}

//             {/* // Gallery Upload Section */}
//             <div className="text-start flex items-start flex-col space-y-6">
//               <label className="block text-sm text-start font-semibold text-gray-700 mb-2">
//                 Gallery Images * (কমপক্ষে {min_gallery} ছবি আপলোড করতে হবে)
//               </label>
//               <label className=" items-center gap-3 flex text-sm text-start font-semibold text-gray-700 mb-4">
//                 {`${galleryFiles.length}/${max_gallery}`}
//                 {remainingGalleryLeft()}
//               </label>

//               <div
//                 onClick={() => {
//                   if (galleryFiles.length >= max_gallery) {
//                     toast.error(`Maximum ${max_gallery} images allowed`);
//                     return;
//                   }
//                   galleryInputRef.current?.click();
//                 }}
//                 className={`border-2 w-full border-dashed border-gray-300 p-6 text-center ${
//                   isAnyGalleryUploading()
//                     ? "cursor-wait opacity-80"
//                     : "cursor-pointer hover:border-teal-500"
//                 } transition rounded-lg`}
//               >
//                 {galleryPreviews.length > 0 ? (
//                   <div className="flex flex-col  gap-4">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                       {galleryPreviews.map((preview, index) => (
//                         <div key={index} className="relative">
//                           <img
//                             src={preview}
//                             alt={`Gallery ${index + 1}`}
//                             className="w-full h-32 object-cover rounded-lg"
//                           />
//                           {galleryUploadingStatus[index] ? (
//                             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
//                               <Loader2 className="w-6 h-6 text-white animate-spin" />
//                             </div>
//                           ) : (
//                             <button
//                               type="button"
//                               onClick={(e) => {
//                                 e.stopPropagation();

//                                 // Remove this specific image
//                                 const newFiles = [...galleryFiles];
//                                 const newPreviews = [...galleryPreviews];
//                                 const newUrls = [...galleryUrls];
//                                 const newStatuses = [...galleryUploadingStatus];

//                                 newFiles.splice(index, 1);
//                                 newPreviews.splice(index, 1);
//                                 newUrls.splice(index, 1);
//                                 newStatuses.splice(index, 1);

//                                 setGalleryFiles(newFiles);
//                                 setGalleryPreviews(newPreviews);
//                                 useCreateOrgStore.setState({
//                                   galleryUrls: newUrls,
//                                   galleryUploadingStatus: newStatuses,
//                                 });

//                                 toast("Image removed from gallery");
//                               }}
//                               className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
//                             >
//                               <X size={14} />
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex flex-col  justify-center items-center gap-2 pb-8 pt-4">
//                       <div className="flex justify-center items-center gap-2 h-10 w-10 rounded-full">
//                         <Upload size={24} className="text-gray-400" />
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         Click to upload gallery images
//                       </span>
//                       <span className="text-xs text-gray-400">
//                         Select {min_gallery}–{max_gallery} images
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col justify-center items-center gap-2 py-8">
//                     <div className="flex justify-center items-center gap-2 h-10 w-10 rounded-full">
//                       <Upload size={24} className="text-gray-400" />
//                     </div>
//                     <span className="text-sm text-gray-500">
//                       Click to upload gallery images
//                     </span>
//                     <span className="text-xs text-gray-400">
//                       Select {min_gallery}–{max_gallery} images
//                     </span>
//                   </div>
//                 )}
//                 <input
//                   ref={galleryInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={async (e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;

//                     if (galleryFiles.length >= max_gallery) {
//                       toast.error(`Maximum ${max_gallery} images allowed`);
//                       return;
//                     }

//                     const index = galleryFiles.length;
//                     setGalleryFiles([...galleryFiles, file]);
//                     setGalleryPreviews([
//                       ...galleryPreviews,
//                       URL.createObjectURL(file),
//                     ]);

//                     // Initialize upload status slot
//                     const newStatuses = [...galleryUploadingStatus];
//                     newStatuses[index] = true;
//                     useCreateOrgStore.setState({
//                       galleryUploadingStatus: newStatuses,
//                       galleryUrls: [...galleryUrls, null],
//                     });

//                     // Start uploading the single image
//                     try {
//                       await uploadSingleGalleryImage(file, index);
//                       // const updatedUrls = getValidGalleryUrls();
//                       // if (updatedUrls.length < min_gallery) {
//                       //   toast(
//                       //     `At least ${min_gallery} gallery images recommended`,
//                       //     {
//                       //       icon: "⚠️",
//                       //     }
//                       //   );
//                       // }
//                     } catch (error) {
//                       toast.error("Gallery upload failed: " + error.message);
//                     } finally {
//                       e.target.value = ""; // reset input to allow re-upload of same file
//                     }
//                   }}
//                   hidden
//                 />
//               </div>
//             </div>
//           </div>
//           {/* Submit Button */}
//           <div className="flex w-full justify-end">
//             <button
//               type="submit"
//               disabled={loading || isUploading() || !isUploadComplete()}
//               className={`px-8 w-full py-3 rounded-lg font-semibold ${
//                 loading || isUploading() || !isUploadComplete()
//                   ? "bg-gray-300 cursor-not-allowed"
//                   : "bg-teal-600 hover:bg-teal-700 cursor-pointer text-white"
//               }`}
//             >
//               {loading ? "Submitting..." : "Submit Organization"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



































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
















































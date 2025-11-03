
// import { create } from 'zustand';
// import toast from 'react-hot-toast';

// const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// export const useCreateOrgStore = create((set, get) => ({
//     // ===============================
//     // 🔹 STATE
//     // ===============================
//     min_gallery: 4,
//     max_gallery: 4,

//     logoFile: null,
//     coverFile: null,
//     galleryFiles: [],

//     logoPreview: null,
//     coverPreview: null,
//     galleryPreviews: [],

//     logoUrl: null,
//     coverUrl: null,
//     galleryUrls: [],
//     galleryUploadingStatus: [],

//     logoUploading: false,
//     coverUploading: false,
//     galleryUploading: false,
//     loading: false,

//     formData: {
//         name: "",
//         urlID: "",
//         emailUser: "",
//         orgEmail: "",
//         phone: "",
//         localAddress: "",

//         district: "",
//         division: "",
//         upozila:"",

//         zipCode: "",
//         mapLink: "",
//         details: "",

//         abashik: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],

//     },



//     // ===============================
//     // 🔹 SETTERS
//     // ===============================
//     setLogoFile: (file) => set({ logoFile: file }),
//     setCoverFile: (file) => set({ coverFile: file }),
//     setGalleryFiles: (files) => set({ galleryFiles: files }),
//     setLogoPreview: (preview) => set({ logoPreview: preview }),
//     setCoverPreview: (preview) => set({ coverPreview: preview }),
//     setGalleryPreviews: (previews) => set({ galleryPreviews: previews }),
//     setLoading: (state) => set({ loading: state }),
//     setFormData: (updater) =>
//         set((state) => ({
//             formData: typeof updater === 'function' ? updater(state.formData) : updater,
//         })),

//     // ===============================
//     // 🔹 UPLOAD TO IMGBB
//     // ===============================
//     uploadToImgBB: async (file) => {
//         if (!file) return null;
//         if (!IMGBB_API_KEY) {
//             throw new Error('ImgBB API key is not configured');
//         }

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!res.ok) throw new Error('ImgBB upload failed');

//             const data = await res.json();
//             if (!data.success) {
//                 throw new Error(data.error?.message || 'Upload failed');
//             }

//             return data.data.url;
//         } catch (error) {
//             console.error('ImgBB upload error:', error);
//             throw error;
//         }
//     },

//     // ===============================
//     // 🔹 UPLOAD LOGO
//     // ===============================
//     uploadLogo: async (file) => {
//         if (!file) return null;

//         const toastId = toast.loading('Uploading logo...');
//         set({ logoUploading: true });

//         try {
//             const url = await get().uploadToImgBB(file);
//             set({ logoUrl: url, logoUploading: false });
//             toast.success('Logo uploaded successfully!', { id: toastId });
//             return url;
//         } catch (error) {
//             set({ logoUploading: false });
//             toast.error('Failed to upload logo', { id: toastId });
//             throw error;
//         }
//     },

//     // ===============================
//     // 🔹 UPLOAD COVER
//     // ===============================
//     uploadCover: async (file) => {
//         if (!file) return null;

//         const toastId = toast.loading('Uploading cover...');
//         set({ coverUploading: true });

//         try {
//             const url = await get().uploadToImgBB(file);
//             set({ coverUrl: url, coverUploading: false });
//             toast.success('Cover uploaded successfully!', { id: toastId });
//             return url;
//         } catch (error) {
//             set({ coverUploading: false });
//             toast.error('Failed to upload cover', { id: toastId });
//             throw error;
//         }
//     },

//     // ===============================
//     // 🔹 UPLOAD SINGLE GALLERY IMAGE
//     // ===============================
//     uploadSingleGalleryImage: async (file, index) => {
//         if (!file) return null;

//         const newStatus = [...get().galleryUploadingStatus];
//         newStatus[index] = true;
//         set({ galleryUploadingStatus: newStatus });

//         const toastId = toast.loading(`Uploading gallery image ${index + 1}...`);

//         try {
//             const url = await get().uploadToImgBB(file);
//             const newUrls = [...get().galleryUrls];
//             newUrls[index] = url;
//             newStatus[index] = false;

//             set({
//                 galleryUrls: newUrls,
//                 galleryUploadingStatus: newStatus
//             });
//             toast.success(`Image ${index + 1} uploaded!`, { id: toastId });
//             return url;
//         } catch (error) {
//             newStatus[index] = false;
//             set({ galleryUploadingStatus: newStatus });
//             toast.error(`Failed to upload image ${index + 1}`, { id: toastId });
//             throw error;
//         }
//     },

//     // ===============================
//     // 🔹 UPLOAD ALL GALLERY IMAGES
//     // ===============================
//     uploadAllGalleryImages: async (files) => {
//         if (!files || files.length === 0) return [];
//         const toastId = toast.loading('Uploading gallery images...');

//         set({ galleryUploading: true });

//         try {
//             const urls = await Promise.all(
//                 Array.from(files).map((file, i) => get().uploadSingleGalleryImage(file, i))
//             );
//             set({ galleryUploading: false });
//             toast.success('All gallery images uploaded successfully!', { id: toastId });
//             return urls;
//         } catch (error) {
//             set({ galleryUploading: false });
//             toast.error('Some gallery uploads failed', { id: toastId });
//             throw error;
//         }
//     },

//     // ===============================
//     // 🔹 SUBMIT ORGANIZATION
//     // ===============================
//     submitOrganization: async () => {
//         const state = get();

//         const validationErrors = state.validateForm();
//         if (validationErrors.length > 0) {
//             validationErrors.forEach((err) => toast.error(err));
//             throw new Error('Validation failed');
//         }

//         if (!state.isUploadComplete()) {
//             toast.error('Please complete all uploads before submitting');
//             throw new Error('Incomplete uploads');
//         }

//         if (state.galleryUrls.filter(url => url).length > state.max_gallery) {
//             toast.error(`Gallery cannot contain more than ${state.max_gallery} images`);
//             throw new Error('Too many gallery images');
//         }

//         const toastId = toast.loading('Creating organization...');
//         set({ loading: true });

//         try {
//             const validGalleryUrls = state.galleryUrls.filter(url => url);
            
//             const payload = {
//                 ...state.formData,
//                 logoUrl: state.logoUrl,
//                 coverUrl: state.coverUrl,
//                 galleryUrls: validGalleryUrls,
//             };

//             console.log(payload)


//             const res = await fetch(`${API_BASE_URL}/api/organizations`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload),
//             });

//             if (!res.ok) {
//                 const errData = await res.json();
//                 throw new Error(errData.message || 'Failed to create organization');
//             }

//             const data = await res.json();
//             set({ loading: false });
//             toast.success('Organization created successfully!', { id: toastId });
//             return data;
//         } catch (error) {
//             console.error('Organization creation error:', error);
//             set({ loading: false });
//             toast.error(error.message || 'Failed to create organization', { id: toastId });
//             throw error;
//         }
//     },

//     // ===============================
//     // 🔹 HELPERS
//     // ===============================
//     isAnyGalleryUploading: () => get().galleryUploadingStatus.some((s) => s),
    
//     // FIXED: This was the main issue - checking valid URLs instead of array length
//     isUploadComplete: () => {
//         const state = get();
//         const validGalleryUrls = state.galleryUrls.filter(url => url !== null);
        
//         return (
//             Boolean(state.logoUrl) &&
//             Boolean(state.coverUrl) &&
//             validGalleryUrls.length >= state.min_gallery &&
//             !state.isUploading()
//         );
//     },
    
//     isUploading: () => {
//         const s = get();
//         return s.logoUploading || s.coverUploading || s.isAnyGalleryUploading();
//     },

//     validateForm: () => {
//         const { formData } = get();
//         const errors = [];
        
//         if (!formData.name?.trim()) errors.push('Organization name is required');
//         if (formData.name?.length > 100) errors.push('Name cannot exceed 100 characters');
//         if (!formData.urlID?.trim()) errors.push('URL ID is required');
//         if (!formData.emailUser?.trim()) errors.push('User email is required');
//         if (!formData.orgEmail?.trim()) errors.push('Organization email is required');
//         if (!formData.phone?.trim()) errors.push('Phone number is required');
//         // if (!formData.localAddress?.trim()) errors.push('Local address is required');


//         if (!formData.division || !formData.division.name) {
//             errors.push("Division is required");
//         }

//         if (!formData.district || !formData.district.name) {
//             errors.push("District is required");
//         }

//         if (!formData.upazila || !formData.upazila.name) {
//             errors.push("Upazila is required");
//         }


//         if (!formData.zipCode?.trim()) errors.push('Zip code is required');
        
//         return errors;
//     },

    


//     resetAll: () =>
//         set({
//             logoFile: null,
//             coverFile: null,
//             galleryFiles: [],
//             logoPreview: null,
//             coverPreview: null,
//             galleryPreviews: [],
//             logoUrl: null,
//             coverUrl: null,
//             galleryUrls: [],
//             galleryUploadingStatus: [],
//             logoUploading: false,
//             coverUploading: false,
//             galleryUploading: false,
//             loading: false,
//             formData: {
//                 name: "",
//                 urlID: "",
//                 emailUser: "",
//                 orgEmail: "",
//                 phone: "",
//                 localAddress: "",
//                 district: "",
//                 division: "",
//                 upozila: "",
//                 zipCode: "",
//                 mapLink: "",
//                 details: "",
//             },
//         }),
// }));





























import {
    create
} from "zustand";
import toast from "react-hot-toast";

const IMGBB_API_KEY =
    import.meta.env.VITE_IMGBB_API_KEY;
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const useCreateOrgStore = create((set, get) => ({
    // ===============================
    // 🔹 STATE
    // ===============================
    min_gallery: 4,
    max_gallery: 4,

    logoFile: null,
    coverFile: null,
    galleryFiles: [],

    logoPreview: null,
    coverPreview: null,
    galleryPreviews: [],

    logoUrl: null,
    coverUrl: null,
    galleryUrls: [],
    galleryUploadingStatus: [],

    logoUploading: false,
    coverUploading: false,
    galleryUploading: false,
    loading: false,


    residencyOptions: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],
    madrashaList: [
        "All",
        "কিন্ডার গার্ডেন",
        "নূরানী",
        "হিফজ",
        "কিতাব খানা",
        "তাকাসসুন",
    ],
    selectedCheckBox: ["All"],
    checkBoxValue: [],


        // ✅ Madrasha checkbox logic
    toggleCheckBox: (item) => {
            const {
                madrashaList
            } = get();

            if (item === "All") {
                set({
                    selectedCheckBox: ["All"],
                    checkBoxValue: madrashaList.filter((i) => i !== "All"),
                });
            } else {
                const current = get().selectedCheckBox;
                let updated = [];

                if (current.includes(item)) {
                    updated = current.filter((i) => i !== item);
                } else {
                    updated = [...current.filter((i) => i !== "All"), item];
                }

                if (updated.length === 0) updated = ["All"];

                set({
                    selectedCheckBox: updated,
                    checkBoxValue: updated.includes("All") && updated.length === 1 ?
                        madrashaList.filter((i) => i !== "All") : updated,
                });
            }
        },

        // ✅ Residency selector
        setResidency: (value) => set({
            selectedResidency: value
        }),

        // ✅ Effective madrasha list
        getEffectiveSelection: () => {
            const {
                selectedCheckBox,
                madrashaList
            } = get();
            return selectedCheckBox.includes("All") ? madrashaList : selectedCheckBox;
        },






    formData: {
        name: "",
        urlID: "",
        emailUser: "",
        orgEmail: "",
        phone: "",
        localAddress: "",
        district: "",
        division: "",
        upazila: "",
        zipCode: "",
        mapLink: "",
        details: "",
        residencyType: "", 
        checkBoxValues:[]
    },



    // ===============================
    // 🔹 SETTERS
    // ===============================
    setLogoFile: (file) => set({
        logoFile: file
    }),
    setCoverFile: (file) => set({
        coverFile: file
    }),
    setGalleryFiles: (files) => set({
        galleryFiles: files
    }),
    setLogoPreview: (preview) => set({
        logoPreview: preview
    }),
    setCoverPreview: (preview) => set({
        coverPreview: preview
    }),
    setGalleryPreviews: (previews) => set({
        galleryPreviews: previews
    }),
    setLoading: (state) => set({
        loading: state
    }),
    setFormData: (updater) =>
        set((state) => ({
            formData: typeof updater === "function" ? updater(state.formData) : updater,
        })),

    // ===============================
    // 🔹 UPLOAD TO IMGBB
    // ===============================
    uploadToImgBB: async (file) => {
        if (!file) return null;
        if (!IMGBB_API_KEY) throw new Error("ImgBB API key is not configured");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: "POST",
                    body: formData,
                }
            );

            if (!res.ok) throw new Error("ImgBB upload failed");

            const data = await res.json();
            if (!data.success)
                throw new Error(data.error?.message || "Upload failed");

            return data.data.url;
        } catch (error) {
            console.error("ImgBB upload error:", error);
            throw error;
        }
    },

    // ===============================
    // 🔹 UPLOAD LOGO
    // ===============================
    uploadLogo: async (file) => {
        if (!file) return null;
        const toastId = toast.loading("Uploading logo...");
        set({
            logoUploading: true
        });

        try {
            const url = await get().uploadToImgBB(file);
            set({
                logoUrl: url,
                logoUploading: false
            });
            toast.success("Logo uploaded successfully!", {
                id: toastId
            });
            return url;
        } catch (error) {
            set({
                logoUploading: false
            });
            toast.error("Failed to upload logo", {
                id: toastId
            });
            throw error;
        }
    },

    // ===============================
    // 🔹 UPLOAD COVER
    // ===============================
    uploadCover: async (file) => {
        if (!file) return null;
        const toastId = toast.loading("Uploading cover...");
        set({
            coverUploading: true
        });

        try {
            const url = await get().uploadToImgBB(file);
            set({
                coverUrl: url,
                coverUploading: false
            });
            toast.success("Cover uploaded successfully!", {
                id: toastId
            });
            return url;
        } catch (error) {
            set({
                coverUploading: false
            });
            toast.error("Failed to upload cover", {
                id: toastId
            });
            throw error;
        }
    },

    // ===============================
    // 🔹 UPLOAD SINGLE GALLERY IMAGE
    // ===============================
    uploadSingleGalleryImage: async (file, index) => {
        if (!file) return null;

        const newStatus = [...get().galleryUploadingStatus];
        newStatus[index] = true;
        set({
            galleryUploadingStatus: newStatus
        });

        const toastId = toast.loading(`Uploading gallery image ${index + 1}...`);

        try {
            const url = await get().uploadToImgBB(file);
            const newUrls = [...get().galleryUrls];
            newUrls[index] = url;
            newStatus[index] = false;

            set({
                galleryUrls: newUrls,
                galleryUploadingStatus: newStatus,
            });
            toast.success(`Image ${index + 1} uploaded!`, {
                id: toastId
            });
            return url;
        } catch (error) {
            newStatus[index] = false;
            set({
                galleryUploadingStatus: newStatus
            });
            toast.error(`Failed to upload image ${index + 1}`, {
                id: toastId
            });
            throw error;
        }
    },

    // ===============================
    // 🔹 UPLOAD ALL GALLERY IMAGES
    // ===============================
    uploadAllGalleryImages: async (files) => {
        if (!files || files.length === 0) return [];
        const toastId = toast.loading("Uploading gallery images...");
        set({
            galleryUploading: true
        });

        try {
            const urls = await Promise.all(
                Array.from(files).map((file, i) =>
                    get().uploadSingleGalleryImage(file, i)
                )
            );
            set({
                galleryUploading: false
            });
            toast.success("All gallery images uploaded successfully!", {
                id: toastId,
            });
            return urls;
        } catch (error) {
            set({
                galleryUploading: false
            });
            toast.error("Some gallery uploads failed", {
                id: toastId
            });
            throw error;
        }
    },

    // ===============================
    // 🔹 SUBMIT ORGANIZATION
    // ===============================
    submitOrganization: async () => {
        const state = get();

        const validationErrors = state.validateForm();
        if (validationErrors.length > 0) {
            validationErrors.forEach((err) => toast.error(err));
            throw new Error("Validation failed");
        }

        if (!state.isUploadComplete()) {
            toast.error("Please complete all uploads before submitting");
            throw new Error("Incomplete uploads");
        }

        const validGalleryUrls = state.galleryUrls.filter((url) => url);
        if (validGalleryUrls.length > state.max_gallery) {
            toast.error(`Gallery cannot contain more than ${state.max_gallery} images`);
            throw new Error("Too many gallery images");
        }

        const toastId = toast.loading("Creating organization...");
        set({
            loading: true
        });

        try {
            const payload = {
                ...state.formData,
                logoUrl: state.logoUrl,
                coverUrl: state.coverUrl,
                galleryUrls: validGalleryUrls,
            };

            const res = await fetch(`${API_BASE_URL}/api/organizations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to create organization");
            }

            const data = await res.json();
            toast.success("Organization created successfully!", {
                id: toastId
            });
            return data;
        } catch (error) {
            console.error("Organization creation error:", error);
            toast.error(error.message || "Failed to create organization", {
                id: toastId,
            });
            throw error;
        } finally {
            set({
                loading: false
            });
        }
    },

    // ===============================
    // 🔹 HELPERS
    // ===============================
    isAnyGalleryUploading: () => get().galleryUploadingStatus.some((s) => s),

    isUploadComplete: () => {
        const state = get();
        const validGalleryUrls = state.galleryUrls.filter((url) => url !== null);

        return (
            Boolean(state.logoUrl) &&
            Boolean(state.coverUrl) &&
            validGalleryUrls.length >= state.min_gallery &&
            !state.isUploading()
        );
    },

    isUploading: () => {
        const s = get();
        return s.logoUploading || s.coverUploading || s.isAnyGalleryUploading();
    },

    validateForm: () => {
        const {
            formData
        } = get();
        const errors = [];

        if (!formData.name?.trim()) errors.push("Organization name is required");
        if (!formData.urlID?.trim()) errors.push("URL ID is required");
        if (!formData.emailUser?.trim()) errors.push("User email is required");
        if (!formData.orgEmail?.trim()) errors.push("Organization email is required");
        if (!formData.phone?.trim()) errors.push("Phone number is required");
        if (!formData.zipCode?.trim()) errors.push("Zip code is required");

        if (!formData.division || !formData.division.name)
            errors.push("Division is required");
        if (!formData.district || !formData.district.name)
            errors.push("District is required");
        if (!formData.upazila || !formData.upazila.name)
            errors.push("Upazila is required");

        if (!formData.residencyType) errors.push("Resident type is required");
        if (!formData.checkBoxValues) errors.push("check Box Values is required");


        return errors;
    },

    resetAll: () =>
        set({
            logoFile: null,
            coverFile: null,
            galleryFiles: [],
            logoPreview: null,
            coverPreview: null,
            galleryPreviews: [],
            logoUrl: null,
            coverUrl: null,
            galleryUrls: [],
            galleryUploadingStatus: [],
            logoUploading: false,
            coverUploading: false,
            galleryUploading: false,
            loading: false,
            formData: {
                name: "",
                urlID: "",
                emailUser: "",
                orgEmail: "",
                phone: "",
                localAddress: "",
                district: "",
                division: "",
                upazila: "",
                zipCode: "",
                mapLink: "",
                details: "",
                residencyType: "",
                checkBoxValues:[]
            },
        }),
}));

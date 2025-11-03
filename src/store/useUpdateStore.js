

import {
    create
} from 'zustand';
import toast from 'react-hot-toast';

const IMGBB_API_KEY =
    import.meta.env.VITE_IMGBB_API_KEY;
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const useUpdateStore = create((set, get) => ({
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

    // Track if new files were uploaded
    hasNewLogo: false,
    hasNewCover: false,

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
        logoUrl: "",
        coverUrl: "",
        galleryUrls: [],
        checkBoxValues:null
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
            formData: typeof updater === 'function' ? updater(state.formData) : updater,
        })),

    // ===============================
    // 🔹 UPLOAD TO IMGBB
    // ===============================
    uploadToImgBB: async (file) => {
        if (!file) return null;
        if (!IMGBB_API_KEY) {
            throw new Error('ImgBB API key is not configured');
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('ImgBB upload failed');

            const data = await res.json();
            if (!data.success) {
                throw new Error(data.error?.message || 'Upload failed');
            }

            return data.data.url;
        } catch (error) {
            console.error('ImgBB upload error:', error);
            throw error;
        }
    },

    // ===============================
    // 🔹 UPLOAD LOGO
    // ===============================
    uploadLogo: async (file) => {
        if (!file) return null;

        const toastId = toast.loading('Uploading logo...');
        set({
            logoUploading: true,
            hasNewLogo: true
        });

        try {
            const url = await get().uploadToImgBB(file);
            set({
                logoUrl: url,
                logoUploading: false
            });
            toast.success('Logo uploaded successfully!', {
                id: toastId
            });
            return url;
        } catch (error) {
            set({
                logoUploading: false,
                hasNewLogo: false
            });
            toast.error('Failed to upload logo', {
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

        const toastId = toast.loading('Uploading cover...');
        set({
            coverUploading: true,
            hasNewCover: true
        });

        try {
            const url = await get().uploadToImgBB(file);
            set({
                coverUrl: url,
                coverUploading: false
            });
            toast.success('Cover uploaded successfully!', {
                id: toastId
            });
            return url;
        } catch (error) {
            set({
                coverUploading: false,
                hasNewCover: false
            });
            toast.error('Failed to upload cover', {
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
                galleryUploadingStatus: newStatus
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
    // 🔹 SUBMIT ORGANIZATION (CREATE)
    // ===============================
    submitOrganization: async () => {
        const state = get();

        const validationErrors = state.validateForm();
        if (validationErrors.length > 0) {
            validationErrors.forEach((err) => toast.error(err));
            throw new Error('Validation failed');
        }

        if (!state.isUploadComplete()) {
            toast.error('Please complete all uploads before submitting');
            throw new Error('Incomplete uploads');
        }

        if (state.galleryUrls.filter(url => url).length > state.max_gallery) {
            toast.error(`Gallery cannot contain more than ${state.max_gallery} images`);
            throw new Error('Too many gallery images');
        }

        const toastId = toast.loading('Creating organization...');
        set({
            loading: true
        });

        try {
            const validGalleryUrls = state.galleryUrls.filter(url => url);

            const payload = {
                ...state.formData,
                logoUrl: state.logoUrl,
                coverUrl: state.coverUrl,
                galleryUrls: validGalleryUrls,
            };

            console.log(payload)

            const res = await fetch(`${API_BASE_URL}/api/organizations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to create organization');
            }

            const data = await res.json();
            set({
                loading: false
            });
            toast.success('Organization created successfully!', {
                id: toastId
            });
            return data;
        } catch (error) {
            console.error('Organization creation error:', error);
            set({
                loading: false
            });
            toast.error(error.message || 'Failed to create organization', {
                id: toastId
            });
            throw error;
        }
    },

    // ===============================
    // 🔹 UPDATE ORGANIZATION
    // ===============================
    updateOrganization: async (organizationId) => {
        const state = get();

        const validationErrors = state.validateForm();
        if (validationErrors.length > 0) {
            validationErrors.forEach((err) => toast.error(err));
            throw new Error('Validation failed');
        }

        // Check if there are any uploads in progress
        if (state.isUploading()) {
            toast.error('Please wait for all uploads to complete');
            throw new Error('Uploads in progress');
        }

        // For update, we need at least the existing URLs or new ones
        const finalLogoUrl = state.hasNewLogo ? state.logoUrl : state.formData.logoUrl;
        const finalCoverUrl = state.hasNewCover ? state.coverUrl : state.formData.coverUrl;

        // Merge existing gallery URLs with new ones
        const finalGalleryUrls = state.galleryUrls.filter(url => url && url.trim() !== '');

        if (!finalLogoUrl) {
            toast.error('Logo is required');
            throw new Error('Logo is required');
        }

        if (!finalCoverUrl) {
            toast.error('Cover image is required');
            throw new Error('Cover image is required');
        }

        if (finalGalleryUrls.length < state.min_gallery) {
            toast.error(`At least ${state.min_gallery} gallery images are required`);
            throw new Error('Insufficient gallery images');
        }

        if (finalGalleryUrls.length > state.max_gallery) {
            toast.error(`Gallery cannot contain more than ${state.max_gallery} images`);
            throw new Error('Too many gallery images');
        }

        const toastId = toast.loading('Updating organization...');
        set({
            loading: true
        });

        try {
            const payload = {
                ...state.formData,
                logoUrl: finalLogoUrl,
                coverUrl: finalCoverUrl,
                galleryUrls: finalGalleryUrls,
            };

            console.log('Update payload:', payload);

            const res = await fetch(`${API_BASE_URL}/api/organizations/${organizationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to update organization');
            }

            const data = await res.json();
            set({
                loading: false
            });
            toast.success('Organization updated successfully!', {
                id: toastId
            });
            return data;
        } catch (error) {
            console.error('Organization update error:', error);
            set({
                loading: false
            });
            toast.error(error.message || 'Failed to update organization', {
                id: toastId
            });
            throw error;
        }
    },

    // ===============================
    // 🔹 HELPERS
    // ===============================
    isAnyGalleryUploading: () => get().galleryUploadingStatus.some((s) => s),

    isUploadComplete: () => {
        const state = get();

        // For update mode, check if we have valid URLs (either new or existing)
        const hasValidLogo = state.hasNewLogo ? Boolean(state.logoUrl) : Boolean(state.formData.logoUrl);
        const hasValidCover = state.hasNewCover ? Boolean(state.coverUrl) : Boolean(state.formData.coverUrl);

        const validGalleryUrls = state.galleryUrls.filter(url => url !== null && url.trim() !== '');
        const hasValidGallery = validGalleryUrls.length >= state.min_gallery;

        return (
            hasValidLogo &&
            hasValidCover &&
            hasValidGallery &&
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

        if (!formData.name?.trim()) errors.push('Organization name is required');
        if (formData.name?.length > 100) errors.push('Name cannot exceed 100 characters');
        if (!formData.urlID?.trim()) errors.push('URL ID is required');
        if (!formData.emailUser?.trim()) errors.push('User email is required');
        if (!formData.orgEmail?.trim()) errors.push('Organization email is required');
        if (!formData.phone?.trim()) errors.push('Phone number is required');

        if (!formData.division || !formData.division.name) {
            errors.push("Division is required");
        }

        if (!formData.district || !formData.district.name) {
            errors.push("District is required");
        }

        if (!formData.upazila || !formData.upazila.name) {
            errors.push("Upazila is required");
        }

        if (!formData.zipCode?.trim()) errors.push('Zip code is required');

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
            hasNewLogo: false,
            hasNewCover: false,
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
                logoUrl: "",
                coverUrl: "",
                galleryUrls: [],
                checkBoxValues: null

            },
        }),
}));
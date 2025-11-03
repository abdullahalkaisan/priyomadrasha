
import {
    create
} from "zustand";
import axiosInstance from "../api/axiosInstance";



export const useOrganizationStore = create((set, get) => ({
    organizations: [],
    selectedOrganization: null,

    selectedOrganizationID: null,
    setSelectedOrganizationID: (id) => set({
        selectedOrganizationID: id
    }),
    loading: false,
    error: null,

    value: 0,
    setValue: (newValue) => set({
        value: newValue
    }),


    getAllOrganizations: async () => {
        set({
            loading: true,
            error: null
        });
        try {
            const res = await axiosInstance.get('/organizations/'); // adjust endpoint if needed
            set({
                organizations: res.data.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch organizations',
                loading: false,
            });
        }
    },

    getAllActiveOrganizations: async () => {
        set({
            loading: true,
            error: null
        });
        try {
            const res = await axiosInstance.get('/organizations/active'); // adjust endpoint if needed
            set({
                organizations: res.data.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch organizations',
                loading: false,
            });
        }
    },



    // Fetch organization by ID (optional helper)
    fetchOrganization: async (id) => {
        set({
            loading: true,
            error: null
        });
        try {
            const res = await axiosInstance.get(`/organizations/${id}`);
            set({
                selectedOrganization: res.data.data,
                loading: false
            });
        } catch (err) {
            set({
                error: err.response?.data?.message || err.message,
                loading: false
            });
        }
    },

    // Update organization
    updateOrganization: async (id, updateData) => {
        set({
            loading: true,
            error: null
        });
        try {
            const res = await axiosInstance.put(`/organizations/${id}`, updateData);
            set({
                selectedOrganization: res.data.data,
                loading: false,
            });
            return res.data; // allows components to await this
        } catch (err) {
            set({
                error: err.response ?.data?.message || "Error updating organization",
                loading: false
            });
            throw err; // rethrow for UI handling
        }
    },



    approveOrganization: async (id) => {
        set({loading: true});

        try {
            const res = await axiosInstance.patch(`/organizations/${id}/approve`, {}, {
                withCredentials: true,
            });
            // Update local state
            const updated = get().organizations.map((org) =>
                org._id === id ? res.data.data : org
            );
            set({
                organizations: updated,
                loading: false
            });
            return res.data.data; // optional: return updated org
        } catch (error) {
            console.error(error);
            set({
                error: error.response?.data?.message || 'Failed to approve organization',
                loading: false
            });
        }
    },


    rejectOrganization: async (id) => {
        set({
            loading: true
        });

        try {
            const res = await axiosInstance.patch(`/organizations/${id}/reject`, {}, {
                withCredentials: true,
            });
            // Update local state
            const updated = get().organizations.map((org) =>
                org._id === id ? res.data.data : org
            );
            set({
                organizations: updated,
                loading: false
            });
            return res.data.data; // optional: return updated org
        } catch (error) {
            console.error(error);
            set({
                error: error.response?.data?.message || 'Failed to approve organization',
                loading: false
            });
        }
    },

}));

import {
    create
} from 'zustand';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const usePendingOrgStore = create((set) => ({
    organizations: [],
    loading: false,
    error: null,

    // Fetch organizations by user email
    fetchUserOrganizations: async (email) => {
        set({
            loading: true,
            error: null
        });

        try {
            const res = await fetch(`${API_BASE_URL}/api/organizations/user/${email}`);

            if (!res.ok) {
                throw new Error('Failed to fetch organizations');
            }

            const data = await res.json();
            set({
                organizations: data.data,
                loading: false
            });
            return data.data;
        } catch (error) {
            set({
                error: error.message,
                loading: false
            });
            throw error;
        }
    },


deleteOrganization: async (id) => {
    const res = await fetch(`${API_BASE_URL}/api/organizations/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete organization');
    }

    set((state) => ({
        organizations: state.organizations.filter(org => org._id !== id),
    }));

    return true;
},



    // Update organization
updateOrganization: async (id, updates) => {
    const res = await fetch(`${API_BASE_URL}/api/organizations/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error('Failed to update organization');

    const data = await res.json();

    set((state) => ({
        organizations: state.organizations.map((org) =>
            org._id === id ? data.data : org
        ),
    }));

    return data.data;
},



}));
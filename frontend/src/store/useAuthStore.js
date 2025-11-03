// src/store/useAuthStore.js
import {
    create
} from "zustand";
import {
    auth,
    provider
} from "../firebase/config";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

export const useAuthStore = create((set) => ({
    user: null,
    loading: true,

    signInWithGoogle: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            set({
                user: result.user
            });
        } catch (error) {
            console.error("Error signing in:", error);
        }
    },

    logout: async () => {
        await signOut(auth);
        set({
            user: null
        });
    },

    initAuthListener: () => {
        onAuthStateChanged(auth, (user) => {
            set({
                user,
                loading: false
            });
        });
    },
}));

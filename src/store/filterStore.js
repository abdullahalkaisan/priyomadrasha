// store/filterStore.js
import {
    create
} from "zustand";

export const madrashaList = [
    "All",
    "কিন্ডার গার্ডেন",
    "নূরানী",
    "হিফজ",
    "কিতাব খানা",
    "তাকাসসুন",
];

export const useFilterStore = create((set, get) => ({
    selected: ["All"],

    toggle: (item) => {
        if (item === "All") {
            // Selecting “All” → deselect others
            set({
                selected: ["All"]
            });
        } else {
            const current = get().selected;
            let updated = [];

            if (current.includes(item)) {
                // Uncheck an item
                updated = current.filter((i) => i !== item);
            } else {
                // Add a new item (and remove “All”)
                updated = [...current.filter((i) => i !== "All"), item];
            }

            // If nothing left, fallback to “All”
            if (updated.length === 0) updated = ["All"];
            set({
                selected: updated
            });
        }
    },

    // Computed: if “All” selected, treat as all values
    getEffectiveSelection: () => {
        const selected = get().selected;
        return selected.includes("All") ? madrashaList : selected;
    },
}));

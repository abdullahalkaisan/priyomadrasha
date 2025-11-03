




// // store/searchStore.js
// import {
//     create
// } from "zustand";
// import axios from "axios";

// export const useSearchStore = create((set, get) => ({
//     madrashaList: [
//         "All",
//         "কিন্ডার গার্ডেন",
//         "নূরানী",
//         "হিফজ",
//         "কিতাব খানা",
//         "তাকাসসুন",
//     ],


//     residencyOptions: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],


//     searchValue: "",
//     searchResults: [],
//     loading: false,
//     error: null,
//     selectedCheckBox: ["All"],

//     checkBoxValue: null,

//     toggleCheckBox: (item) => {
//         const {
//             madrashaList
//         } = get();

//         if (item === "All") {
//             set({
//                 selectedCheckBox: ["All"],
//                 checkBoxValue: madrashaList.filter((i)=> i !== "All")
//             });
//         } else {
//             const current = get().selectedCheckBox;
//             let updated = [];

//             if (current.includes(item)) {
//                 updated = current.filter((i) => i !== item);
//             } else {
//                 updated = [...current.filter((i) => i !== "All"), item];
//             }

//             if (updated.length === 0) updated = ["All"];
//             set({
//                 selectedCheckBox: updated,
//                 checkBoxValue: updated
//             });
//         }
//     },

//     getEffectiveSelection: () => {
//         const {
//             selectedCheckBox,
//             madrashaList
//         } = get();
//         return selectedCheckBox.includes("All") ? madrashaList : selectedCheckBox;
//     },

//     setSearchValue: async (value) => {
//         set({
//             searchValue: value
//         });

//         if (value.trim() === "") {
//             set({
//                 searchResults: [],
//                 loading: false,
//                 error: null
//             });
//             return;
//         }

//         set({
//             loading: true,
//             error: null
//         });

//         try {
//             const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
//             set({
//                 searchResults: res.data,
//                 loading: false
//             });
//         } catch (error) {
//             console.error("Search error:", error);
//             set({
//                 loading: false,
//                 error: error.response?.data?.message || "Failed to fetch search results.",
//             });
//         }
//     },
// }));
















// // store/searchStore.js
// import {
//     create
// } from "zustand";
// import axios from "axios";

// export const useSearchStore = create((set, get) => ({
//     madrashaList: [
//         "All",
//         "কিন্ডার গার্ডেন",
//         "নূরানী",
//         "হিফজ",
//         "কিতাব খানা",
//         "তাকাসসুন",
//     ],

//     residencyOptions: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],

//     searchValue: "",
//     searchResults: [],
//     loading: false,
//     error: null,

//     selectedCheckBox: ["All"],
//     checkBoxValue: [],
//     selectedResidency: "আবাসিক ও অনাবাসিক", // default value

//     // ✅ Toggle Madrasha checkbox logic
//     toggleCheckBox: (item) => {
//         const {
//             madrashaList
//         } = get();

//         if (item === "All") {
//             set({
//                 selectedCheckBox: ["All"],
//                 checkBoxValue: madrashaList.filter((i) => i !== "All"),
//             });
//         } else {
//             const current = get().selectedCheckBox;
//             let updated = [];

//             if (current.includes(item)) {
//                 updated = current.filter((i) => i !== item);
//             } else {
//                 updated = [...current.filter((i) => i !== "All"), item];
//             }

//             if (updated.length === 0) updated = ["All"];

//             set({
//                 selectedCheckBox: updated,
//                 checkBoxValue: updated.includes("All") && updated.length === 1 ?
//                     madrashaList.filter((i) => i !== "All") :
//                     updated,
//             });
//         }
//     },

//     // ✅ Residency selector handler
//     setResidency: (value) => {
//         set({
//             selectedResidency: value
//         });
//     },

//     // ✅ Getter for current effective madrasha list
//     getEffectiveSelection: () => {
//         const {
//             selectedCheckBox,
//             madrashaList
//         } = get();
//         return selectedCheckBox.includes("All") ? madrashaList : selectedCheckBox;
//     },

//     // ✅ Search logic
//     setSearchValue: async (value) => {
//         set({
//             searchValue: value
//         });

//         if (value.trim() === "") {
//             set({
//                 searchResults: [],
//                 loading: false,
//                 error: null,
//             });
//             return;
//         }

//         set({
//             loading: true,
//             error: null
//         });

//         try {
//             const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
//             set({
//                 searchResults: res.data,
//                 loading: false,
//             });
//         } catch (error) {
//             console.error("Search error:", error);
//             set({
//                 loading: false,
//                 error: error.response?.data?.message || "Failed to fetch search results.",
//             });
//         }
//     },
// }));























// // store/searchStore.js
// import {
//     create
// } from "zustand";
// import axios from "axios";

// export const useSearchStore = create((set, get) => ({
//     // 🔹 Static filter options
//     madrashaList: [
//         "All",
//         "কিন্ডার গার্ডেন",
//         "নূরানী",
//         "হিফজ",
//         "কিতাব খানা",
//         "তাকাসসুন",
//     ],
//     residencyOptions: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],

//     // 🔹 Search states
//     searchValue: "",
//     searchResults: [],
//     loading: false,
//     error: null,

//     // 🔹 Checkbox filters
//     selectedCheckBox: ["All"],
//     checkBoxValue: [],
//     selectedResidency: "আবাসিক ও অনাবাসিক",

//     // 🔹 Location-related states
//     divisions: [],
//     districts: [],
//     selectedDivision: null,
//     selectedDistrict: null,

//     // ✅ Load districts from API
//     fetchDistricts: async () => {
//         try {
//             set({
//                 loading: true,
//                 error: null
//             });
//             const res = await fetch("https://bdapis.vercel.app/geo/v2.0/districts");
//             const data = await res.json();

//             if (Array.isArray(data.data)) {
//                 set({
//                     districts: data.data
//                 });
//             } else {
//                 set({
//                     error: "Invalid data format"
//                 });
//             }
//         } catch (error) {
//             console.error("Failed to load districts:", error);
//             set({
//                 error: "Failed to load districts"
//             });
//         } finally {
//             set({
//                 loading: false
//             });
//         }
//     },

//     // ✅ Select Division
//     setDivision: (division) => {
//         set({
//             selectedDivision: division,
//             selectedDistrict: null, // reset when division changes
//         });
//     },

//     // ✅ Select District
//     setDistrict: (district) => set({
//         selectedDistrict: district
//     }),

//     // ✅ Filter districts based on selected division
//     getFilteredDistricts: () => {
//         const {
//             districts,
//             selectedDivision
//         } = get();
//         if (!selectedDivision) return [];
//         return districts.filter((d) => d.division_id === selectedDivision.id);
//     },

//     // ✅ Toggle Madrasha checkbox logic
//     toggleCheckBox: (item) => {
//         const {
//             madrashaList
//         } = get();

//         if (item === "All") {
//             set({
//                 selectedCheckBox: ["All"],
//                 checkBoxValue: madrashaList.filter((i) => i !== "All"),
//             });
//         } else {
//             const current = get().selectedCheckBox;
//             let updated = [];

//             if (current.includes(item)) {
//                 updated = current.filter((i) => i !== item);
//             } else {
//                 updated = [...current.filter((i) => i !== "All"), item];
//             }

//             if (updated.length === 0) updated = ["All"];

//             set({
//                 selectedCheckBox: updated,
//                 checkBoxValue: updated.includes("All") && updated.length === 1 ?
//                     madrashaList.filter((i) => i !== "All") :
//                     updated,
//             });
//         }
//     },

//     // ✅ Residency selector
//     setResidency: (value) => set({
//         selectedResidency: value
//     }),

//     // ✅ Effective madrasha list
//     getEffectiveSelection: () => {
//         const {
//             selectedCheckBox,
//             madrashaList
//         } = get();
//         return selectedCheckBox.includes("All") ? madrashaList : selectedCheckBox;
//     },

//     // ✅ Search logic
//     setSearchValue: async (value) => {
//         set({
//             searchValue: value
//         });

//         if (value.trim() === "") {
//             set({
//                 searchResults: [],
//                 loading: false,
//                 error: null,
//             });
//             return;
//         }

//         set({
//             loading: true,
//             error: null
//         });

//         try {
//             const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
//             set({
//                 searchResults: res.data,
//                 loading: false,
//             });
//         } catch (error) {
//             console.error("Search error:", error);
//             set({
//                 loading: false,
//                 error: error.response?.data?.message ||
//                     "Failed to fetch search results.",
//             });
//         }
//     },
// }));






























// // store/searchStore.js
// import {
//     create
// } from "zustand";
// import axios from "axios";

// export const useSearchStore = create((set, get) => ({
//     // 🔹 Static filter options
//     madrashaList: [
//         "All",
//         "কিন্ডার গার্ডেন",
//         "নূরানী",
//         "হিফজ",
//         "কিতাব খানা",
//         "তাকাসসুন",
//     ],
//     residencyOptions: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],

//     // 🔹 Search states
//     searchValue: "",
//     searchResults: [],
//     loading: false,
//     error: null,

//     // 🔹 Checkbox filters
//     selectedCheckBox: ["All"],
//     checkBoxValue: [],
//     selectedResidency: "আবাসিক ও অনাবাসিক",

//     // 🔹 Location-related states
//     divisions: [],
//     districts: [],
//     selectedDivision: null,
//     selectedDistrict: null,

//     // ✅ Fetch Divisions
//     fetchDivisions: async () => {
//         try {
//             set({
//                 loading: true,
//                 error: null
//             });
//             const res = await fetch("https://bdapis.vercel.app/geo/v2.0/divisions");
//             const data = await res.json();
//             if (Array.isArray(data.data)) {
//                 set({
//                     divisions: data.data
//                 });
//             } else {
//                 set({
//                     error: "Invalid data format"
//                 });
//             }
//         } catch (error) {
//             console.error("Failed to load divisions:", error);
//             set({
//                 error: "Failed to load divisions"
//             });
//         } finally {
//             set({
//                 loading: false
//             });
//         }
//     },

//     // ✅ Fetch Districts
//     fetchDistricts: async () => {
//         try {
//             set({
//                 loading: true,
//                 error: null
//             });
//             const res = await fetch("https://bdapis.vercel.app/geo/v2.0/districts");
//             const data = await res.json();

//             if (Array.isArray(data.data)) {
//                 set({
//                     districts: data.data
//                 });
//             } else {
//                 set({
//                     error: "Invalid data format"
//                 });
//             }
//         } catch (error) {
//             console.error("Failed to load districts:", error);
//             set({
//                 error: "Failed to load districts"
//             });
//         } finally {
//             set({
//                 loading: false
//             });
//         }
//     },

//     // ✅ Select Division
//     setDivision: (division) => {
//         set({
//             selectedDivision: division,
//             selectedDistrict: null, // reset district when division changes
//         });
//     },

//     // ✅ Select District
//     setDistrict: (district) => set({
//         selectedDistrict: district
//     }),

//     // ✅ Filter districts based on selected division
//     getFilteredDistricts: () => {
//         const {
//             districts,
//             selectedDivision
//         } = get();
//         if (!selectedDivision) return [];
//         return districts.filter((d) => d.division_id === selectedDivision.id);
//     },

//     // ✅ Toggle Madrasha checkbox logic
//     toggleCheckBox: (item) => {
//         const {
//             madrashaList
//         } = get();

//         if (item === "All") {
//             set({
//                 selectedCheckBox: ["All"],
//                 checkBoxValue: madrashaList.filter((i) => i !== "All"),
//             });
//         } else {
//             const current = get().selectedCheckBox;
//             let updated = [];

//             if (current.includes(item)) {
//                 updated = current.filter((i) => i !== item);
//             } else {
//                 updated = [...current.filter((i) => i !== "All"), item];
//             }

//             if (updated.length === 0) updated = ["All"];

//             set({
//                 selectedCheckBox: updated,
//                 checkBoxValue: updated.includes("All") && updated.length === 1 ?
//                     madrashaList.filter((i) => i !== "All") :
//                     updated,
//             });
//         }
//     },

//     // ✅ Residency selector
//     setResidency: (value) => set({
//         selectedResidency: value
//     }),

//     // ✅ Effective madrasha list
//     getEffectiveSelection: () => {
//         const {
//             selectedCheckBox,
//             madrashaList
//         } = get();
//         return selectedCheckBox.includes("All") ? madrashaList : selectedCheckBox;
//     },

//     // ✅ Search logic
//     setSearchValue: async (value) => {
//         set({
//             searchValue: value
//         });

//         if (value.trim() === "") {
//             set({
//                 searchResults: [],
//                 loading: false,
//                 error: null,
//             });
//             return;
//         }

//         set({
//             loading: true,
//             error: null
//         });

//         try {
//             const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
//             set({
//                 searchResults: res.data,
//                 loading: false,
//             });
//         } catch (error) {
//             console.error("Search error:", error);
//             set({
//                 loading: false,
//                 error: error.response ?.data?.message ||
//                     "Failed to fetch search results.",
//             });
//         }
//     },
// }));





































// store/searchStore.js
import {
    create
} from "zustand";
import axios from "axios";

export const useSearchStore = create((set, get) => ({
    // 🔹 Static filter options
    madrashaList: [
        "All",
        "কিন্ডার গার্ডেন",
        "নূরানী",
        "হিফজ",
        "কিতাব খানা",
        "তাকাসসুন",
    ],

    residencyOptions: ["আবাসিক ও অনাবাসিক", "আবাসিক", "অনাবাসিক"],

    // 🔹 Search states
    searchValue: "",
    searchResults: [],
    loading: false,
    error: null,

    // 🔹 Checkbox filters
    selectedCheckBox: ["All"],
    
    checkBoxValue: [],
    selectedResidency: "আবাসিক ও অনাবাসিক",

    // 🔹 Location-related states
    divisions: [],
    districts: [],
    upazilas: [],
    selectedDivision: null,
    selectedDistrict: null,
    selectedUpazila: null,


    SearchFormData: {
        searchValue:"",
        residencyType:"",
        divisions:{},
        districts:{},
        upazilas:{},
        checkBoxValues: []
    },

    setSearchForm: (key, value) => {
        set((state) => ({
            SearchFormData: {
                ...state.SearchFormData,
                [key]: value,
            },
        }));
    },


    resetSearchForm: () =>
        set({
            SearchFormData: {
                searchValue: "",
                residencyType: "",
                divisions: {},
                districts: {},
                upazilas: {},
                checkBoxValues: [],
            },
        }),


    // ✅ Fetch Divisions
    fetchDivisions: async () => {
        try {
            set({
                loading: true,
                error: null
            });
            const res = await fetch("https://bdapis.vercel.app/geo/v2.0/divisions");
            const data = await res.json();
            if (Array.isArray(data.data)) {
                set({
                    divisions: data.data
                });

            } else {
                set({
                    error: "Invalid data format"
                });
            }
        } catch (error) {
            console.error("Failed to load divisions:", error);
            set({
                error: "Failed to load divisions"
            });
        } finally {
            set({
                loading: false
            });
        }
    },





    // ✅ Fetch Districts
    fetchDistricts: async () => {
        try {
            set({
                loading: true,
                error: null
            });
            const res = await fetch("https://bdapis.vercel.app/geo/v2.0/districts");
            const data = await res.json();

            if (Array.isArray(data.data)) {
                set({
                    districts: data.data
                });
            } else {
                set({
                    error: "Invalid data format"
                });
            }
        } catch (error) {
            console.error("Failed to load districts:", error);
            set({
                error: "Failed to load districts"
            });
        } finally {
            set({
                loading: false
            });
        }
    },

    // ✅ Fetch Upazilas
    fetchUpazilas: async () => {
        try {
            set({
                loading: true,
                error: null
            });
            const res = await fetch("https://bdapis.vercel.app/geo/v2.0/upazilas");
            const data = await res.json();

            if (Array.isArray(data.data)) {
                set({
                    upazilas: data.data
                });
            } else {
                set({
                    error: "Invalid data format"
                });
            }
        } catch (error) {
            console.error("Failed to load upazilas:", error);
            set({
                error: "Failed to load upazilas"
            });
        } finally {
            set({
                loading: false
            });
        }
    },

    // ✅ Selectors
    setDivision: (division) => {
        set({
            selectedDivision: division,
            selectedDistrict: null,
            selectedUpazila: null,
        });
    },

    setDistrict: (district) => {
        set({
            selectedDistrict: district,
            selectedUpazila: null,
        });
    },

    setUpazila: (upazila) => set({
        selectedUpazila: upazila
    }),

    // ✅ Filter functions
    getFilteredDistricts: () => {
        const {
            districts,
            selectedDivision
        } = get();
        if (!selectedDivision) return [];
        return districts.filter((d) => d.division_id === selectedDivision.id);
    },

    getFilteredUpazilas: () => {
        const {
            upazilas,
            selectedDistrict
        } = get();
        if (!selectedDistrict) return [];
        return upazilas.filter((u) => u.district_id === selectedDistrict.id);
    },

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
                    madrashaList.filter((i) => i !== "All") :
                    updated,
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



    // ✅ Search logic
    setSearchValue: async (value) => {
        set({
            searchValue: value
        });

        if (value.trim() === "") {
            set({
                searchResults: [],
                loading: false,
                error: null,
            });
            return;
        }

        set({
            loading: true,
            error: null
        });

        try {
            const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);
            set({
                searchResults: res.data,
                loading: false,
            });
        } catch (error) {
            console.error("Search error:", error);
            set({
                loading: false,
                error: error.response?.data?.message ||
                    "Failed to fetch search results.",
            });
        }
    },





        // ✅ Search logic
    fetchAllFilter: async (value) => {
        set({
        loading: true,
        error: null
        });



        console.log(value)

        try {
        // const res = await axios.get(`http://localhost:5000/api/search?q=${value}`);

        const res = await axios.post("http://localhost:5000/api/search", value);



        set({
            searchResults: res.data,
            loading: false,
        });
        } catch (error) {
        console.error("Search error:", error);
        set({
            loading: false,
            error: error.response?.data?.message ||
                "Failed to fetch search results.",
        });
        }
        },
        


}));














































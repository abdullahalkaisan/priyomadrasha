// import { useEffect, useState, useMemo } from "react";
// import { Autocomplete, TextField } from "@mui/material";
// import { useCreateOrgStore } from "../../store/useCreateOrgStore";
// import { useUpdateStore } from "../../store/useUpdateStore";

// export default function UpozilaFilterSelector({ update }) {
//   const [allUpazilas, setAllUpazilas] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const { formData, setFormData } = useCreateOrgStore();
//   const { formData: updateFormData, setFormData: setUpdateFormData } =
//     useUpdateStore();

//   const selectedDistrict = update ? updateFormData.district : formData.district;

//   useEffect(() => {
//     let cancelled = false;

//     const loadUpazilas = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("https://bdapis.vercel.app/geo/v2.0/upazilas");
//         const data = await res.json();

//         if (!cancelled && Array.isArray(data.data)) {
//           setAllUpazilas(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to load upazilas", error);
//         if (!cancelled) setAllUpazilas([]);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     loadUpazilas();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // ✅ Filter upazilas by selected district
//   const filteredUpazilas = useMemo(() => {
//     if (!selectedDistrict) return [];
//     return allUpazilas.filter((u) => u.district_id === selectedDistrict.id);
//   }, [selectedDistrict, allUpazilas]);

//   return (
//     <Autocomplete
//       size="small"
//       disablePortal
//       options={filteredUpazilas}
//       loading={loading}
//       disabled={!selectedDistrict}
//       value={update ? updateFormData.upazila || null : formData.upazila || null}
//       getOptionLabel={(u) => (u ? `${u.name} - ${u.bn_name}` : "")}
//       isOptionEqualToValue={(option, value) => option.id === value?.id}
//       onChange={
//         update
//           ? (e, value) =>
//               setUpdateFormData((prev) => ({
//                 ...prev,
//                 upazila: value || null,
//               }))
//           : (e, value) =>
//               setFormData((prev) => ({
//                 ...prev,
//                 upazila: value || null,
//               }))
//       }
//       fullWidth
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="উপজেলা"
//           placeholder={
//             selectedDistrict
//               ? "উপজেলা নির্বাচন করুন"
//               : "প্রথমে জেলা নির্বাচন করুন"
//           }
//         />
//       )}
//     />
//   );
// }











































// components/UpozilaFilterSelector.jsx
import { useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useSearchStore } from "../../store/useSearchStore";


export default function UpozilaFilterSelector() {
  const {
    selectedDistrict,
    selectedUpazila,
    setUpazila,
    loading,
    error,
    fetchUpazilas,
    getFilteredUpazilas,
    setSearchForm,
  } = useSearchStore();

  useEffect(() => {
    fetchUpazilas();
  }, [fetchUpazilas]);


  useEffect(() => {
    selectedUpazila && setSearchForm("upazilas", selectedUpazila.name || {});
  }, [setSearchForm, selectedUpazila]);




  const filteredUpazilas = getFilteredUpazilas();

  return (
    <Autocomplete
      size="small"
      disablePortal
      options={filteredUpazilas}
      loading={loading}
      disabled={!selectedDistrict}
      value={selectedUpazila || null}
      getOptionLabel={(u) => (u ? `${u.name} - ${u.bn_name}` : "")}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={(e, value) => setUpazila(value || null)}
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="উপজেলা"
          placeholder={
            selectedDistrict
              ? "উপজেলা নির্বাচন করুন"
              : "প্রথমে জেলা নির্বাচন করুন"
          }
          error={!!error}
          helperText={error || ""}
        />
      )}
    />
  );
}


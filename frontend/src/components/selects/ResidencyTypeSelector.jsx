// import { Autocomplete, TextField } from "@mui/material";
// import { useCreateOrgStore } from "../../store/useCreateOrgStore";
// import { useUpdateStore } from "../../store/useUpdateStore";

// export default function ResidencyTypeSelector({ update }) {
//   const { formData, setFormData, residencyOptions } = useCreateOrgStore();
//   const { formData: updateFormData, setFormData: setUpdateFormData } =
//     useUpdateStore();

//   const value = update
//     ? updateFormData.residencyType || null
//     : formData.residencyType || null;

//   const handleChange = (e, value) => {
//     const selectedValue = value || "";
//     if (update) {
//       setUpdateFormData((prev) => ({ ...prev, residencyType: selectedValue }));
//     } else {
//       setFormData((prev) => ({ ...prev, residencyType: selectedValue }));
//     }
//   };

//   return (
//     <Autocomplete
//       size="small"
//       disablePortal
//       fullWidth
//       options={residencyOptions}
//       value={value}
//       onChange={handleChange}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="আবাসিক ধরন"
//           placeholder="একটি নির্বাচন করুন"
//         />
//       )}
//     />
//   );
// }












import { Autocomplete, TextField } from "@mui/material";
import { useCreateOrgStore } from "../../store/useCreateOrgStore";
import { useUpdateStore } from "../../store/useUpdateStore";


export default function ResidencyTypeSelector({ update }) {
  const { formData, setFormData, residencyOptions } = useCreateOrgStore();
  const { formData: updateFormData, setFormData: setUpdateFormData } =
    useUpdateStore();

    

  console.log(formData.residencyType);

  const value = update
    ? updateFormData.residencyType || null
    : formData.residencyType || null;

  const handleChange = (e, value) => {
    const selectedValue = value || "";
    if (update) {
      setUpdateFormData((prev) => ({ ...prev, residencyType: selectedValue }));
    } else {
      setFormData((prev) => ({ ...prev, residencyType: selectedValue }));
    }
  };

  return (
    <Autocomplete
      size="small"
      disablePortal
      fullWidth
      options={residencyOptions}
      value={value}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="আবাসিক ধরন"
          placeholder="একটি নির্বাচন করুন"
          required
        />
      )}
    />
  );
}

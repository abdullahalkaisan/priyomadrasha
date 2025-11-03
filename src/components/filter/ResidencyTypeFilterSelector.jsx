// import { Autocomplete, TextField } from "@mui/material";


// export default function ResidencyTypeFilterSelector() {


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



























// components/ResidencyTypeFilterSelector.jsx
import { Autocomplete, TextField } from "@mui/material";
import { useSearchStore } from "../../store/useSearchStore";
import { useEffect } from "react";


export default function ResidencyTypeFilterSelector() {
  const { residencyOptions, selectedResidency, setResidency, setSearchForm } =
    useSearchStore();

  const handleChange = (event, newValue) => {
    if (newValue) {
      setResidency(newValue);
    }
  };

    useEffect(() => {
      selectedResidency &&
        setSearchForm("residencyType", selectedResidency || {});
    }, [setSearchForm, selectedResidency]);
  

  console.log(selectedResidency);

  return (
    <Autocomplete
      size="small"
      disablePortal
      fullWidth
      options={residencyOptions}
      value={selectedResidency}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="আবাসিক ধরন"
          placeholder="একটি নির্বাচন করুন"
        />
      )}
    />
  );
}

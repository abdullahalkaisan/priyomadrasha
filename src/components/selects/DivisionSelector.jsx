


import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useCreateOrgStore } from "../../store/useCreateOrgStore";
import { useUpdateStore } from "../../store/useUpdateStore";

export default function DivisionSelector({ update }) {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { formData, setFormData } = useCreateOrgStore();
  const { formData: updateFormData, setFormData: setUpdateFormData } = useUpdateStore();

  useEffect(() => {
    let cancelled = false;

    const loadDivisions = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://bdapis.vercel.app/geo/v2.0/divisions");
        const data = await res.json();
        if (!cancelled && Array.isArray(data.data)) {
          setDivisions(data.data);
        }
      } catch (error) {
        console.error("Failed to load divisions", error);
        if (!cancelled) setDivisions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDivisions();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Autocomplete
      size="small"
      disablePortal
      options={divisions}
      loading={loading}
      value={
        update ? updateFormData.division || null : formData.division || null
      }
      getOptionLabel={(d) => (d ? `${d.name} - ${d.bn_name}` : "")}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={
        update
          ? (e, value) =>
              setUpdateFormData((prev) => ({
                ...prev,
                division: value || null,
                district: null, // reset child when parent changes
                upazila: null,
              }))
          : (e, value) =>
              setFormData((prev) => ({
                ...prev,
                division: value || null,
                district: null, // reset child when parent changes
                upazila: null,
              }))
      }
      fullWidth
      renderInput={(params) => <TextField {...params} label="বিভাগ" />}
    />
  );
}

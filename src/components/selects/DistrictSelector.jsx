


import { useEffect, useState, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useCreateOrgStore } from "../../store/useCreateOrgStore";
import { useUpdateStore } from "../../store/useUpdateStore";

export default function DistrictSelector({update}) {
  const [allDistricts, setAllDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { formData, setFormData } = useCreateOrgStore();

    const { formData: updateFormData, setFormData: setUpdateFormData } = useUpdateStore();
  


  const selectedDivision = update ?  updateFormData.division : formData.division;

  useEffect(() => {
    let cancelled = false;

    const loadDistricts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://bdapis.vercel.app/geo/v2.0/districts");
        const data = await res.json();

        if (!cancelled && Array.isArray(data.data)) {
          setAllDistricts(data.data);
        }
      } catch (error) {
        console.error("Failed to load districts", error);
        if (!cancelled) setAllDistricts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadDistricts();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ Filter districts based on selected division
  const filteredDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    return allDistricts.filter((d) => d.division_id === selectedDivision.id);
  }, [selectedDivision, allDistricts]);

  return (
    <Autocomplete
      size="small"
      disablePortal
      options={filteredDistricts}
      loading={loading}
      disabled={!selectedDivision}
      value={
        update ? updateFormData.district || null : formData.district || null
      }
      getOptionLabel={(d) => (d ? `${d.name} - ${d.bn_name}` : "")}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onChange={
        update
          ? (e, value) =>
              setUpdateFormData((prev) => ({
                ...prev,
                district: value || null,
                upazila: null, // reset when district changes
              }))
          : (e, value) =>
              setFormData((prev) => ({
                ...prev,
                district: value || null,
                upazila: null, // reset when district changes
              }))
      }
      fullWidth
      renderInput={(params) => (
        <TextField
          {...params}
          label="জেলা"
          placeholder={
            selectedDivision
              ? "জেলা নির্বাচন করুন"
              : "প্রথমে বিভাগ নির্বাচন করুন"
          }
        />
      )}
    />
  );
}

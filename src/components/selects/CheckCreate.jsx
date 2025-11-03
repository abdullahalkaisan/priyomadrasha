


import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { useEffect } from "react";
import { useCreateOrgStore } from "../../store/useCreateOrgStore";
import { useUpdateStore } from "../../store/useUpdateStore";

const CheckCreate = ({update}) => {
  const {
    madrashaList,
    selectedCheckBox,
    toggleCheckBox,
    checkBoxValues,
    setFormData,
  } = useCreateOrgStore();

const { setFormData : setUpdateFormData} = useUpdateStore();

  // 🔹 Run whenever checkBoxValue changes
  useEffect(() => {
    if (update) {
      setUpdateFormData((prev) => ({
        ...prev,
        checkBoxValues: checkBoxValues || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        checkBoxValues: checkBoxValues || null,
      }));
    }
  }, [checkBoxValues, setFormData, setUpdateFormData, update]);

  

  return (
    <FormGroup className="text-gray-700">
      {madrashaList.map((item) => {
        const isChecked = selectedCheckBox.includes(item);

        return (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={isChecked}
                onChange={() => toggleCheckBox(item)}
                sx={{
                  color: "teal",
                  "&.Mui-checked": {
                    color: "teal",
                  },
                  "& .MuiTouchRipple-root": {
                    color: "teal",
                  },
                }}
              />
            }
            sx={{
              color: "rgba(0,0,0,0.6)", // default label color
              "& .Mui-checked + span": {
                color: "teal", // label turns teal when checked
              },
            }}
            label={item}
          />
        );
      })}
    </FormGroup>
  );
};

export default CheckCreate;

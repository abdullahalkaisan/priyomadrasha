

import { FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { useSearchStore } from "../../store/useSearchStore";
import { useEffect } from "react";

const CheckFilter = () => {
  const {
    madrashaList,
    selectedCheckBox,
    toggleCheckBox,
    checkBoxValue,
    setSearchForm,
  } = useSearchStore();


    useEffect(() => {
      checkBoxValue && setSearchForm("checkBoxValues", checkBoxValue || []);
    }, [setSearchForm, selectedCheckBox, checkBoxValue]);
  

    console.log(checkBoxValue);
  
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

export default CheckFilter;

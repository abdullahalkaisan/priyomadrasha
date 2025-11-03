import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useNavigate, useLocation } from "react-router-dom";
import { House, GraduationCapIcon } from "lucide-react";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabValue = (pathname) => {
    switch (pathname) {
      case "/":
        return 0;
      case "/madrasha":
        return 1;
      default:
        return false;
    }
  };

  const [value, setValue] = React.useState(getTabValue(location.pathname));

  React.useEffect(() => {
    setValue(getTabValue(location.pathname));
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="menu tabs"
      sx={{
        minHeight: "auto",
        "& .MuiTabs-flexContainer": {
          alignItems: "center",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#00bba7",
        },
        "& .MuiTab-root": {
          // minHeight: "auto",
          // minWidth: "auto",
          // padding: "4px 8px",
          color: "#00bba7",
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "0.95rem",
        },
        "& .Mui-selected": {
          color: "#00bba7 !important",
        },
      }}
    >
      <Tab
        // iconPosition="start"
        // icon={<House size={16} />}
        onClick={() => navigate("/")}
        label="হোম"
        {...a11yProps(0)}
      />
      <Tab
        // iconPosition="start"
        // icon={<GraduationCapIcon size={16} />}
        onClick={() => navigate("/madrasha")}
        label="মাদ্রাসা"
        {...a11yProps(1)}
      />
    </Tabs>
  );
}

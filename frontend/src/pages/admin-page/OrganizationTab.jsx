import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useOrganizationStore } from "../../store/useOrganizationStore";
import AdminOrgCard from "../../components/cards/AdminOrgCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            overflow: "auto",
            width: "100%",
            // if outside no padding then 50 else 75
            height: "calc(100vh - 50px)" 
            // height: "calc(100vh - 75px)"
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function OrganizationTab() {
  // const [value, setValue] = React.useState(0);

    const {
      organizations,
      loading,
      error,
      getAllOrganizations,
      value,
      setValue,
    } = useOrganizationStore();

      const pendingOrgs = organizations.filter((org) => org.isPending === true);
      const activeOrgs = organizations.filter((org) => org.isActive === true);
      const rejectedOrgs = organizations.filter((org) => org.isRejected === true);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          paddingX: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{ textTransform: "none" }}
            label={`Pending (${pendingOrgs.length})`}
            {...a11yProps(0)}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label={`Active (${activeOrgs.length})`}
            {...a11yProps(1)}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label={`Rejected (${rejectedOrgs.length})`}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="flex flex-wrap justify-center gap-8">
          {pendingOrgs.map((item, index) => {
            return <AdminOrgCard key={index} currentTab={value} organization={item} />;
          })}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-wrap justify-center gap-8">
          {activeOrgs.map((item, index) => {
            return <AdminOrgCard key={index}  organization={item} />;
          })}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="flex flex-wrap justify-center gap-8">
          {rejectedOrgs.map((item, index) => {
            return <AdminOrgCard key={index}  organization={item} />;
          })}
        </div>
      </CustomTabPanel>
    </Box>
  );
}

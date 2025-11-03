// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import OrganizationTab from "./OrganizationTab";
// import BackButton from "../../components/buttons/BackButton";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       className=""
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 0, backgroundColor:"#fff", color:"#333",}}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }


// const tabList = [
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
//   {
//     label: "Organizations",
//     serial: 0,
//   },
//   {
//     label: "Reports",
//     serial: 1,
//   },
// ];

// export default function AdminPage() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         // bgcolor: "background.paper",
//         backgroundColor: "#333",
//         display: "flex",
//         height: "100vh",
//         width: "100vw",
//         overflow: "hidden",
//       }}
//     >
//       <div className="flex h-full w-full">
//         <div>
//           {/* <div className="w-full flex justify-center mb-2">
//             <BackButton path={"/"} />
//           </div> */}

//           <Tabs
//             orientation="vertical"
//             variant="scrollable"
//             value={value}
//             onChange={handleChange}
//             aria-label="Vertical tabs example"
//             sx={{ borderRight: 1, borderColor: "divider" }}
//           >
//             {/* <Tab
//               sx={{
//                 textTransform: "none",
//                 color: "white",
//                 textAlign: "start",
//                 // borderRadius: 999,
//                 // margin: 1,
//                 "&.Mui-selected": {
//                   backgroundColor: "#000",
//                   color: "white", // optional — makes text readable
//                 },
//               }}
//               label="Organizations"
//               {...a11yProps(0)}
//             /> */}

//             {tabList.map((item) => {
//               return (
//                 <Tab
//                   key={item.serial}
//                   sx={{
//                     textTransform: "none",
//                     color: "white",
//                     textAlign: "start",
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "start",
//                     alignItems: "start",
//                     paddingX:3,
//                     minHeight: "auto",
//                     "&.Mui-selected": {
//                       backgroundColor: "#000",
//                       color: "white",
//                     },
//                   }}
//                   label={item.label}
//                   {...a11yProps(item.serial)}
//                 />
//               );
//             })}

//           </Tabs>
//         </div>
//         <div className="w-full h-full">
//           <TabPanel value={value} index={0}>
//             <OrganizationTab />
//           </TabPanel>
//         </div>
//       </div>
//     </Box>
//   );
// }



























// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import OrganizationTab from "./OrganizationTab";
// import { Button } from "@mui/material";
// // import BackButton from "../../components/buttons/BackButton";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 0, backgroundColor: "#fff", color: "#333" }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }
// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// // ✅ give each tab a unique id
// const tabList = Array.from({ length: 20 }, (_, i) => ({
//   label: i % 2 === 0 ? "Organizations" : "Reports",
//   id: `admin-left-${i}`,
// }));

// export default function AdminPage() {
//   const [value, setValue] = React.useState(0);
//   const handleChange = (_event, newValue) => setValue(newValue);

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         backgroundColor: "#333",
//         display: "flex",
//         height: "100vh",
//         width: "100vw",
//         overflow: "hidden",
//       }}
//     >
//       <div className="flex h-full w-full">
//         {/* LEFT: vertical nav */}
//         <div className="h-full">
//           {/* ← ensure this column has height */}
//           <Tabs
//             orientation="vertical"
//             variant="scrollable"
//             value={value}
//             onChange={handleChange}
//             aria-label="Admin nav"
//             scrollButtons="auto"
//             allowScrollButtonsMobile
//             sx={{
//               borderRight: 1,
//               borderColor: "divider",
//               height: "100%", // ← critical for showing scroll buttons
//               minWidth: 220,
//             }}
//           >
//             {tabList.map((item, i) => (
//               <Tab
//                 key={item.id} // ← unique key
//                 label={item.label}
//                 {...a11yProps(i)} // ← ids unique per index
//                 sx={{
//                   textTransform: "none",
//                   color: "white",
//                   textAlign: "start",
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "flex-start", // ← correct value
//                   alignItems: "flex-start", // ← correct value
//                   px: 3, // ← use 'px', not 'paddingX'
//                   minHeight: 40,
//                   "&.Mui-selected": {
//                     backgroundColor: "#000",
//                     color: "white",
//                   },
//                 }}
//               />
//             ))}
//           </Tabs>
//         </div>

//         {/* RIGHT: content */}
//         <div className="w-full h-full">
//           <TabPanel value={value} index={0}>
//             <OrganizationTab />
//           </TabPanel>
//           {/* Add other TabPanels as needed:
//           <TabPanel value={value} index={1}>Reports</TabPanel>
//           ... */}
//         </div>
//       </div>
//     </Box>
//   );
// }




























import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; // if using React Router
import OrganizationTab from "./OrganizationTab";
import { ArrowLeft, BriefcaseBusiness, Bug, BugIcon } from "lucide-react";
import { useOrganizationStore } from "../../store/useOrganizationStore";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0, backgroundColor: "#fff", color: "#333" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const tabList = [
  {
    label: "Organization",
    serial: 0,
    icon: <BriefcaseBusiness size={16} />,
  },
  // {
  //   label: "Reports",
  //   serial: 1,
  //   icon: <BugIcon size={16} />,
  // },
];



export default function AdminPage() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate(); // for React Router

    const {
      organizations,
      loading,
      error,
      getAllOrganizations,
    } = useOrganizationStore();

    React.useEffect(() => {
      getAllOrganizations();
    }, [getAllOrganizations]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;


  const handleChange = (_event, newValue) => setValue(newValue);

  const handleBack = () => {
    navigate("/"); // goes back one page in history
    // OR navigate to a specific route:
    // navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#333",
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div className="flex h-full w-full">
        {/* LEFT: vertical nav with back button */}
        <div className="h-full flex flex-col" style={{ minWidth: 220 }}>
          {/* Back Button - Fixed at top */}
          <Box
            sx={{
              p: 2,
              borderRight: 1,
              // borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#333",
            }}
          >
            <Button
              startIcon={<ArrowLeft />}
              onClick={handleBack}
              sx={{
                color: "white",
                textTransform: "none",
                borderRadius: 999,
                paddingX: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Back
            </Button>
          </Box>

          {/* Tabs - Scrollable area */}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Admin nav"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              borderRight: 1,
              borderColor: "divider",
              flex: 1, // Takes remaining space
              minWidth: 220,
            }}
          >
            {tabList.map((item) => (
              <Tab
                key={item.serial}
                label={item.label}
                icon={item.icon}
                iconPosition="start"
                {...a11yProps(item.serial)}
                sx={{
                  textTransform: "none",
                  color: "white",
                  textAlign: "start",
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  px: 3,
                  minHeight: 40,
                  "&.Mui-selected": {
                    backgroundColor: "#000",
                    color: "white",
                  },
                }}
              />
            ))}
          </Tabs>
        </div>

        {/* RIGHT: content */}
        <div className="w-full h-full overflow-auto">
          <TabPanel value={value} index={0}>
            <OrganizationTab />
          </TabPanel>
          {/* Add other TabPanels as needed */}
        </div>
      </div>
    </Box>
  );
}












































// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import { Button, IconButton } from "@mui/material";
// import { useNavigate } from "react-router-dom"; // if using React Router
// import OrganizationTab from "./OrganizationTab";
// import { ArrowLeft, Backpack } from "lucide-react";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 0, backgroundColor: "#fff", color: "#333" }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// const tabList = Array.from({ length: 20 }, (_, i) => ({
//   label: i % 2 === 0 ? "Organizations" : "Reports",
//   id: `admin-left-${i}`,
// }));

// export default function AdminPage() {
//   const [value, setValue] = React.useState(0);
//   const navigate = useNavigate(); // for React Router

//   const handleChange = (_event, newValue) => setValue(newValue);

//   const handleBack = () => {
//     navigate(-1); // goes back one page in history
//     // OR navigate to a specific route:
//     // navigate('/dashboard');
//   };

//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         backgroundColor: "#333",
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         width: "100vw",
//         overflow: "hidden",
//       }}
//     >
//       {/* Back Button Header */}
//       <Box
//         sx={{
//           p: 2,
//           borderBottom: 1,
//           borderColor: "divider",
//           backgroundColor: "#333",
//         }}
//       >
//         {/* <IconButton
//           onClick={handleBack}
//           sx={{
//             color: "white",
//             "&:hover": {
//               backgroundColor: "rgba(255, 255, 255, 0.1)",
//             },
//           }}
//           aria-label="go back"
//         >
//           <ArrowLeft />
//         </IconButton> */}
//         {/* Or use a Button instead: */}
//         <Button
//           startIcon={<ArrowLeft />}
//           onClick={handleBack}
//           sx={{
//             color: "white",
//             textTransform: "none",
//             borderRadius: 999,
//             paddingX: 2,
//             backgroundColor: "rgba(255, 255, 255, 0.1)",
//             "&:hover": {
//               backgroundColor: "rgba(255, 255, 255, 0.2)",
//             },
//           }}
//         >
//           Back
//         </Button>
//       </Box>

//       {/* Main Content */}
//       <div className="flex h-full w-full overflow-hidden">
//         {/* LEFT: vertical nav */}
//         <div className="h-full">
//           <Tabs
//             orientation="vertical"
//             variant="scrollable"
//             value={value}
//             onChange={handleChange}
//             aria-label="Admin nav"
//             scrollButtons="auto"
//             allowScrollButtonsMobile
//             sx={{
//               borderRight: 1,
//               borderColor: "divider",
//               height: "100%",
//               minWidth: 220,
//             }}
//           >
//             {tabList.map((item, i) => (
//               <Tab
//                 key={item.id}
//                 label={item.label}
//                 {...a11yProps(i)}
//                 sx={{
//                   textTransform: "none",
//                   color: "white",
//                   textAlign: "start",
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "flex-start",
//                   alignItems: "flex-start",
//                   px: 3,
//                   minHeight: 40,
//                   "&.Mui-selected": {
//                     backgroundColor: "#000",
//                     color: "white",
//                   },
//                 }}
//               />
//             ))}
//           </Tabs>
//         </div>

//         {/* RIGHT: content */}
//         <div className="w-full h-full overflow-auto">
//           <TabPanel value={value} index={0}>
//             <OrganizationTab />
//           </TabPanel>
//           {/* Add other TabPanels as needed */}
//         </div>
//       </div>
//     </Box>
//   );
// }
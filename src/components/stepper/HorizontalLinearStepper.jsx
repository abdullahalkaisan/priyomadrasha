









// import { useState } from "react";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import {
//   Stack,
//   Stepper,
//   Step,
//   StepLabel,
//   StepConnector,
//   Button,
//   Typography,
// } from "@mui/material";
// import { stepConnectorClasses } from "@mui/material/StepConnector";
// import { Check } from "@mui/icons-material";
// import { BadgeInfoIcon, Images, MapPin } from "lucide-react";

// // ---------- Styled Connector ----------
// const TealConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 1,
//   },
// }));

// // ---------- Step Icon ----------
// const TealStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   backgroundColor:
//     ownerState.active || ownerState.completed ? "#009688" : "#ccc",
//   zIndex: 1,
//   color: "#fff",
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
//   boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0, 150, 136, .3)" : "none",
// }));

// function TealStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: <BadgeInfoIcon />,
//     2: <MapPin />,
//     3: <Images />,
//   };

//   return (
//     <TealStepIconRoot ownerState={{ completed, active }} className={className}>
//       {completed ? <Check /> : icons[String(props.icon)]}
//     </TealStepIconRoot>
//   );
// }

// TealStepIcon.propTypes = {
//   active: PropTypes.bool,
//   completed: PropTypes.bool,
//   className: PropTypes.string,
//   icon: PropTypes.node,
// };

// // ---------- Main Component ----------
// const steps = ["প্রতিষ্ঠানের তথ্য", "ঠিকানা", "গ্যালারি"];

// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Stack sx={{ width: "70%", margin: "auto" }} spacing={4}>
//       <Stepper
//         alternativeLabel
//         activeStep={activeStep}
//         connector={<TealConnector />}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel StepIconComponent={TealStepIcon}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === steps.length ? (
//         <>
//           <Typography sx={{ mt: 2, mb: 1 }}>
//             🎉 সব ধাপ সম্পন্ন হয়েছে!
//           </Typography>
//           <Button onClick={handleReset} variant="outlined" color="primary">
//             আবার শুরু করুন
//           </Button>
//         </>
//       ) : (
//         <Stack direction="row" spacing={2} justifyContent="center">
//           <Button
//             sx={{
//               color: "teal",
//               borderColor: "teal",
//               borderRadius: 999,
//               "&:hover": {
//                 backgroundColor: "rgba(0, 128, 128, 0.1)", // light teal on hover
//                 borderColor: "teal",
//               },
//             }}
//             disabled={activeStep === 0}
//             onClick={handleBack}
//             variant="outlined"
//           >
//             ফিরে যান
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleNext}
//             color="primary"
//             sx={{ backgroundColor: "teal", borderRadius: 999 }}
//             // sx={{
//             //   backgroundImage:
//             //     "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
//             // }}
//           >
//             {activeStep === steps.length - 1 ? "তৈরি করুন" : "পরবর্তী"}
//           </Button>
//         </Stack>
//       )}
//     </Stack>
//   );
// }










































// import { useState } from "react";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import {
//   Stack,
//   Stepper,
//   Step,
//   StepLabel,
//   StepConnector,
//   Button,
//   Typography,
//   Box,
// } from "@mui/material";
// import { stepConnectorClasses } from "@mui/material/StepConnector";
// import { Check } from "@mui/icons-material";
// import { BadgeInfoIcon, Images, MapPin } from "lucide-react";

// // ---------- Styled Connector ----------
// const TealConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundImage:
//         "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 1,
//   },
// }));

// // ---------- Step Icon ----------
// const TealStepIconRoot = styled("div")(({ ownerState }) => ({
//   backgroundColor:
//     ownerState.active || ownerState.completed ? "#009688" : "#ccc",
//   zIndex: 1,
//   color: "#fff",
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
//   boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0, 150, 136, .3)" : "none",
// }));

// function TealStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: <BadgeInfoIcon />,
//     2: <MapPin />,
//     3: <Images />,
//   };

//   return (
//     <TealStepIconRoot ownerState={{ completed, active }} className={className}>
//       {completed ? <Check /> : icons[String(props.icon)]}
//     </TealStepIconRoot>
//   );
// }

// TealStepIcon.propTypes = {
//   active: PropTypes.bool,
//   completed: PropTypes.bool,
//   className: PropTypes.string,
//   icon: PropTypes.node,
// };

// // ---------- Step Content ----------
// function getStepContent(stepIndex) {
//   switch (stepIndex) {
//     case 0:
//       return (
//         <Box sx={{ textAlign: "center" }}>
//           <Typography variant="h6">🏢 প্রতিষ্ঠানের তথ্য</Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>
//             এখানে প্রতিষ্ঠানের নাম, ধরন, এবং মালিকের তথ্য দিন।
//           </Typography>
//           {/* Example form inputs */}
//           <Box sx={{ mt: 2 }}>
//             <input
//               placeholder="প্রতিষ্ঠানের নাম"
//               style={{
//                 padding: "10px",
//                 width: "60%",
//                 borderRadius: 8,
//                 border: "1px solid #ccc",
//               }}
//             />
//           </Box>
//         </Box>
//       );

//     case 1:
//       return (
//         <Box sx={{ textAlign: "center" }}>
//           <Typography variant="h6">📍 ঠিকানা</Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>
//             প্রতিষ্ঠানের বর্তমান ঠিকানা লিখুন।
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <input
//               placeholder="ঠিকানা লিখুন"
//               style={{
//                 padding: "10px",
//                 width: "60%",
//                 borderRadius: 8,
//                 border: "1px solid #ccc",
//               }}
//             />
//           </Box>
//         </Box>
//       );

//     case 2:
//       return (
//         <Box sx={{ textAlign: "center" }}>
//           <Typography variant="h6">🖼️ গ্যালারি</Typography>
//           <Typography variant="body1" sx={{ mt: 1 }}>
//             এখানে আপনার প্রতিষ্ঠানের ছবি আপলোড করুন।
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <input type="file" multiple />
//           </Box>
//         </Box>
//       );

//     default:
//       return "অজানা ধাপ";
//   }
// }

// // ---------- Main Component ----------
// const steps = ["প্রতিষ্ঠানের তথ্য", "ঠিকানা", "গ্যালারি"];

// export default function HorizontalLinearStepper() {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => setActiveStep((prev) => prev + 1);
//   const handleBack = () => setActiveStep((prev) => prev - 1);
//   const handleReset = () => setActiveStep(0);

//   return (
//     <Stack sx={{ width: "70%", margin: "auto" }} spacing={4}>
//       {/* Stepper Header */}
//       <Stepper
//         alternativeLabel
//         activeStep={activeStep}
//         connector={<TealConnector />}
//       >
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel StepIconComponent={TealStepIcon}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* Step Content */}
//       <Box sx={{ minHeight: 200, p: 3, borderRadius: 2, bgcolor: "#f9f9f9" }}>
//         {activeStep === steps.length ? (
//           <Typography variant="h6" align="center">
//             🎉 সব ধাপ সম্পন্ন হয়েছে!
//           </Typography>
//         ) : (
//           getStepContent(activeStep)
//         )}
//       </Box>

//       {/* Navigation Buttons */}
//       <Stack direction="row" spacing={2} justifyContent="center">
//         {activeStep < steps.length && (
//           <>
//             <Button
//               sx={{
//                 color: "teal",
//                 borderColor: "teal",
//                 borderRadius: 999,
//                 "&:hover": {
//                   backgroundColor: "rgba(0, 128, 128, 0.1)",
//                   borderColor: "teal",
//                 },
//               }}
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//             >
//               ফিরে যান
//             </Button>

//             <Button
//               variant="contained"
//               onClick={handleNext}
//               color="primary"
//               sx={{
//                 backgroundImage:
//                   "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
//                 borderRadius: 999,
//               }}
//             >
//               {activeStep === steps.length - 1 ? "তৈরি করুন" : "পরবর্তী"}
//             </Button>
//           </>
//         )}

//         {activeStep === steps.length && (
//           <Button
//             onClick={handleReset}
//             variant="outlined"
//             sx={{ color: "teal", borderColor: "teal", borderRadius: 999 }}
//           >
//             আবার শুরু করুন
//           </Button>
//         )}
//       </Stack>
//     </Stack>
//   );
// }






































import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { stepConnectorClasses } from "@mui/material/StepConnector";
import { Check } from "@mui/icons-material";
import { BadgeInfoIcon, Images, MapPin } from "lucide-react";
import StepperInfo from "./StepperInfo";

// ---------- Styled Connector ----------
const TealConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 1,
  },
}));

// ---------- Step Icon ----------
const TealStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor:
    ownerState.active || ownerState.completed ? "#009688" : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: ownerState.active ? "0 4px 10px 0 rgba(0, 150, 136, .3)" : "none",
}));

function TealStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <BadgeInfoIcon />,
    2: <MapPin />,
    3: <Images />,
  };

  return (
    <TealStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <Check /> : icons[String(props.icon)]}
    </TealStepIconRoot>
  );
}

TealStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

// ---------- Step Components ----------
function CompanyInfoStep() {
  return (
    <Box>
      <Typography variant="h6">🏢 প্রতিষ্ঠানের তথ্য</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        এখানে প্রতিষ্ঠানের নাম, ধরন, এবং মালিকের তথ্য দিন।
      </Typography>
      <Box sx={{ mt: 2 }}>
        <input
          placeholder="প্রতিষ্ঠানের নাম"
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
      </Box>
    </Box>
  );
}

function AddressStep() {
  return (
    <Box>
      <Typography variant="h6">📍 ঠিকানা</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        প্রতিষ্ঠানের বর্তমান ঠিকানা লিখুন।
      </Typography>
      <Box sx={{ mt: 2 }}>
        <input
          placeholder="ঠিকানা লিখুন"
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
      </Box>
    </Box>
  );
}

function GalleryStep() {
  return (
    <Box>
      <Typography variant="h6">🖼️ গ্যালারি</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        এখানে আপনার প্রতিষ্ঠানের ছবি আপলোড করুন।
      </Typography>
      <Box sx={{ mt: 2 }}>
        <input type="file" multiple />
      </Box>
    </Box>
  );
}

// ---------- Step Config ----------
const steps = [
  { label: "প্রতিষ্ঠানের তথ্য", component: <StepperInfo /> },
  { label: "ঠিকানা", component: <AddressStep /> },
  { label: "গ্যালারি", component: <GalleryStep /> },
];

// ---------- Main Stepper ----------
export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Stack sx={{ width: "70%", margin: "auto" }} spacing={4}>
      {/* Stepper Header */}
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<TealConnector />}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={TealStepIcon}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ minHeight: 220, p: 3, borderRadius: 2 }}>
        {activeStep === steps.length ? (
          <Typography variant="h6" align="center">
            🎉 সব ধাপ সম্পন্ন হয়েছে!
          </Typography>
        ) : (
          steps[activeStep].component
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box direction="row" sx={{display:"flex", justifyContent:"center", gap:6}} spacing={2}>
        {activeStep < steps.length && (
          <>
            <Button
              sx={{
                color: "teal",
                borderColor: "teal",
                borderRadius: 999,
                "&:hover": {
                  backgroundColor: "rgba(0, 128, 128, 0.1)",
                  borderColor: "teal",
                },
              }}
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              ফিরে যান
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              color="primary"
              sx={{
                backgroundColor:"teal",
                // backgroundImage:
                //   "linear-gradient(95deg, #009688 0%, #26a69a 50%, #4db6ac 100%)",
                borderRadius: 999,
              }}
            >
              {activeStep === steps.length - 1 ? "তৈরি করুন" : "পরবর্তী"}
            </Button>
          </>
        )}

        {activeStep === steps.length && (
          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{ color: "teal", borderColor: "teal", borderRadius: 999 }}
          >
            আবার শুরু করুন
          </Button>
        )}
      </Box>
    </Stack>
  );
}

import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Slider,
  LinearProgress,
  Button,
} from "@mui/material";
import CustomConnector from "src/app/components/custom-stepper";
import Check from "@mui/icons-material/Check";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { isEmptyObject } from "src/app/utils/helper";
import api from "../../../../app/api";
import { enqueueSnackbar } from "notistack";
const apiData = {
  steps: [
    {
      topText: ".",
      bottomText: "Idle",
    },
    {
      topText: "Step 1",
      bottomText: "Record",
    },
    {
      topText: "Step 2",
      bottomText: "Analyse",
    },
    {
      topText: "Step 3",
      bottomText: "Report",
    },
  ],
  currentMode: "Auto",
};

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "white",
      backgroundColor: "#02B271",
      borderRadius: "12px",
      zIndex: 1,
      fontSize: 22,
    },
    "& .QontoStepIcon-circle": {
      color: "#02B271",
      border: "1px solid #02B271",
      padding: "1px",
      borderRadius: "12px",
      zIndex: 1,
      fontSize: 24,
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <HourglassEmptyIcon className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 20,
  width: "100%",
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const LiveStatus = ({
  liveStatus,
  processName,
  currentMode,
  setCurrentMode,
}: any) => {
  if (currentMode === "Manual" && liveStatus?.currentStep === 4) {
    setCurrentMode("Auto");
  }
  const restartVbox = () => {
    api
      .get(`/vbox/reset.php/${processName}`)
      .then((res) => {
        enqueueSnackbar({
          message: "success",
          variant: "success",
        });
        setCurrentMode("Manual");
      })
      .catch((error) => {
        enqueueSnackbar({
          message: "Something went wrong",
          variant: "error",
        });
      });
  };
  return (
    <>
      {isEmptyObject(liveStatus) ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            height: "200px",
          }}
        >
          {apiData.steps && apiData.steps.length > 0 && (
            <Stepper
              activeStep={liveStatus?.currentStep}
              alternativeLabel
              connector={<CustomConnector top="38" />}
            >
              {apiData.steps.map((label, index) => (
                <Step
                  key={`${label.topText}-${label.bottomText}`}
                  // completed={completed[index]}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontWeight={
                      liveStatus?.currentStep === index + 1 ? 700 : ""
                    }
                    variant="body1"
                    component={"span"}
                    sx={{ mb: 1 }}
                  >
                    {label.topText}
                  </Typography>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    {label.bottomText}
                  </StepLabel>
                </Step>
                //   <Step key={label}>
                //     <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                //   </Step>
              ))}
            </Stepper>
          )}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PrettoSlider
              min={0}
              max={100}
              value={liveStatus?.stepProgress || 0}
              aria-label="Default"
              valueLabelDisplay="auto"
              //disabled
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" component={"span"}>
              Current Mode :{" "}
              {currentMode ? currentMode : liveStatus?.currentMode}
            </Typography>
            <Box
              onClick={restartVbox}
              sx={{
                backgroundColor: "#1D4580",
                width: "60%",
                px: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Check sx={{ color: "white" }} />
              <Button sx={{ color: "white" }}>
                {liveStatus?.currentMessage}
              </Button>
              {/* <Typography variant="body1" component={"span"} color="white">
                {liveStatus?.currentMessage}
              </Typography> */}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ my: 1 }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
};

export default LiveStatus;

import React from "react";
import { WarningAmber, WarningAmberOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const AlertsAndInstructions = ({
  moduleData,
  isModalOpen = false,
  alertData,
}: any) => {
  const renderInstruction = (
    instructionIndex: any,
    instruction: any,
    isModalOpen: any,
    isTorque: any
  ) => {
    return (
      <>
        {isModalOpen || instructionIndex < 2 ? (
          <Box
            key={`instruction${instructionIndex}`}
            sx={{
              color: "#4d4e4e",
              letterSpacing: "0.07px",
              pl: isTorque ? 0 : 3,
            }}
          >
            <Box
              sx={{
                "&:before": {
                  content: '"-"',
                  float: "left",
                  mr: 1,
                },
                mb: 1,
              }}
            >
              {!isTorque && (
                <Typography component={"span"} variant={"body2"}>
                  {instruction}
                </Typography>
              )}
              {isTorque && (
                <>
                  <Typography component={"span"} variant={"body2"} sx={{}}>
                    {instruction?.message}
                  </Typography>
                  <Typography
                    component={"span"}
                    variant={"body2"}
                    sx={{ marginLeft: 1, fontWeight: 300 }}
                  >
                    [{instruction?.time}]
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        ) : null}
      </>
    );
  };
  return (
    <Box sx={{ height: isModalOpen ? "" : "", overflowX: "auto" }}>
      <Grid
        container
        spacing={moduleData?.isAlert ? 2 : 0}
        // maxHeight="240px"
        overflow={"auto"}
      >
        {alertData &&
          alertData.map((val: any, index: any) => (
            <Grid
              key={`alertData${index}`}
              item
              xs={12}
              md={12}
              lg={isModalOpen ? 4 : !val?.isTorque ? 6 : 12}
            >
              <Box
                sx={
                  val?.isTorque ? { display: "flex", flexDirection: "row" } : {}
                }
              >
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ mr: 1, color: "#4d4e4e" }}>
                    {val?.instructionType === "success" ? (
                      <ThumbUpIcon color={val?.instructionType} />
                    ) : (
                      <WarningAmberOutlined color={val?.instructionType} />
                    )}
                  </Box>
                  {!val?.isTorque && (
                    <Box>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        sx={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#4d4e4e",
                          letterSpacing: "0.36px",
                        }}
                      >
                        {val?.instructionName}
                      </Typography>
                    </Box>
                  )}
                </Box>
                {val.instructions &&
                  val.instructions.map(
                    (instruction: string, instructionIndex: any) => (
                      <Box key={`ins${instructionIndex}`}>
                        {renderInstruction(
                          instructionIndex,
                          instruction,
                          isModalOpen,
                          val?.isTorque
                        )}
                      </Box>
                    )
                  )}
              </Box>
            </Grid>
          ))}
          {alertData.length === 0 && 
        <Grid item lg={12} md={12} sm={12} sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography textAlign={"center"} sx={{width: '100%'}}>No Data found</Typography>
          </Grid>}
      </Grid>
    </Box>
  );
};
export default AlertsAndInstructions;

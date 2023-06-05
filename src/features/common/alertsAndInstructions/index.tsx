import React from "react";
import { WarningAmber, WarningAmberOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const AlertsAndInstructions = ({ moduleData, isModalOpen = false }: any) => {
  const renderInstruction = (
    instructionIndex: any,
    instruction: any,
    isModalOpen: any
  ) => {
    return (
      <>
        {isModalOpen || instructionIndex < 2 ? (
          <Box
            key={`instruction${instructionIndex}`}
            sx={{
              color: "#4d4e4e",
              letterSpacing: "0.07px",
              pl: 3,
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
              <Typography component={"span"} variant={"body2"}>
                {instruction}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </>
    );
  };
  return (
    <Box 
      sx={{height: isModalOpen ? "" : "225px", overflowX:"auto"}}
    >
      <Grid
        container
        spacing={moduleData.isAlert ? 2 : 0}
        // maxHeight="240px"
        overflow={"auto"}
      >
        {moduleData.isAlert &&
          moduleData?.alertData &&
          moduleData.alertData.map((val: any, index: any) => (
            <Grid
              key={`alertData${index}`}
              item
              xs={12}
              md={12}
              lg={isModalOpen ? 4 : 6}
            >
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ mr: 1, color: "#4d4e4e" }}>
                    {val?.instructionType === "success" ? (
                      <ThumbUpIcon color={val?.instructionType} />
                    ) : (
                      <WarningAmberOutlined color={val?.instructionType} />
                    )}
                  </Box>
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
                </Box>
                {val.instructions &&
                  val.instructions.map(
                    (instruction: string, instructionIndex: any) => (
                      <Box key={`ins${instructionIndex}`}>
                        {renderInstruction(
                          instructionIndex,
                          instruction,
                          isModalOpen
                        )}
                      </Box>
                    )
                    //   {isModalOpen ?
                    //     (renderInstruction(instructionIndex, instruction ))
                    //   : ( (instructionIndex > 2) ? renderInstruction(instructionIndex, instruction ) : null)
                    // }
                  )}
              </Box>
            </Grid>
          ))}
        {!moduleData.isAlert &&
          moduleData?.alertData &&
          moduleData.alertData.map((val: any, index: any) => (
            <Grid
              key={`alertData${index}`}
              direction={"column"}
              item
              xs={12}
              md={12}
            >
              <Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {val.instructions &&
                    val.instructions.map(
                      (instruction: string, instructionIndex: any) => (
                        <>
                          <Box
                            sx={{ mr: 1, color: "#4d4e4e", display: "flex" }}
                          >
                            {val?.instructionType === "success" ? (
                              <ThumbUpIcon color={val?.instructionType} />
                            ) : (
                              <WarningAmberOutlined
                                color={val?.instructionType}
                              />
                            )}

                            <Box
                              key={`instruction${instructionIndex}`}
                              sx={{
                                color: "#4d4e4e",
                                letterSpacing: "0.07px",
                                width: "100%",
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
                                <Typography
                                  component={"span"}
                                  variant={"body2"}
                                >
                                  {instruction}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      )
                    )}
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
export default AlertsAndInstructions;

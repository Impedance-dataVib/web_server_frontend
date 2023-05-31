import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import LineGradient from "src/features/common/graph/line-gradient";
import CircleIcon from "@mui/icons-material/Circle";
import { BarChart } from "src/features/common/graph/bar-chart";
import { useGetAllTrends, useGetAllModules } from "../hooks";
import FullScreenLoader from "../../app/components/fullscreen-loader";

const TrendsPage = () => {
  const { data: allModules } = useGetAllModules();

  const [moduleId, setModuleId] = useState<string>("");
  const { data, isLoading, getAllTrends, isError } = useGetAllTrends(moduleId);
  const assetHandler = (e: any) => {
    setModuleId(e.target.value);
  };
  useEffect(() => {
    if (allModules.length > 0 && allModules) {
      setModuleId(allModules[0].id);
    }
  }, [allModules]);

  useEffect(() => {
    if (moduleId && moduleId !== "") {
      getAllTrends(moduleId);
    }
  }, [moduleId]);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            padding={2}
            sx={{ fontWeight: 600, fontSize: "24px" }}
          >
            Trends
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            p: 1,
            justifyContent: "flex-start",
            marginRight: 5,
          }}
        >
          <FormControl sx={{ py: 0, width: "110px" }}>
            <Select
              value={moduleId}
              sx={{
                height: "2.5rem",
                color: "#1D4580",
                width: "8rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1D4580",
                },
                "& .MuiSvgIcon-root": {
                  color: "#1D4580",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1D4580",
                  borderWidth: "0.15rem",
                },
              }}
              name="asset"
              onChange={assetHandler}
              autoWidth
              size="small"
            >
              {allModules?.map(({ id, name }: any) => (
                <MenuItem value={id}>
                  <Typography variant="body2" color="#1D4580">
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box m={2} sx={{ bgcolor: "white" }}>
        {isLoading && <FullScreenLoader></FullScreenLoader>}
        <Grid container spacing={3}>
          {data.map((val: any, index: number) => (
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              key={`trends${index}`}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "5px",
              }}
            >
              <Typography
                variant="body1"
                component={"span"}
                textAlign={"center"}
              >
                {val?.trendsName}
              </Typography>
              <Box sx={{ height: "80%", width: "100%" }}>
                {val?.chartType === "LineGradient" ? (
                  <LineGradient
                    minValue={val?.min}
                    maxValue={val?.max}
                    avgValue={val?.avg}
                    datapoints={val?.datapoints}
                    labels={val?.labels}
                  />
                ) : (
                  <BarChart datapoints={val?.datapoints} labels={val?.labels} />
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography
                  component="span"
                  textAlign={"left"}
                  alignItems="center"
                  display={"flex"}
                >
                  <CircleIcon color="primary" />
                  {val?.trendsName}
                </Typography>
                <Typography
                  component="span"
                  textAlign={"left"}
                  alignItems="center"
                  display={"flex"}
                >
                  Min.
                </Typography>
                <Typography
                  component="span"
                  textAlign={"left"}
                  alignItems="center"
                  display={"flex"}
                >
                  Max.
                </Typography>
                <Typography
                  component="span"
                  textAlign={"left"}
                  alignItems="center"
                  display={"flex"}
                >
                  Avg.
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default TrendsPage;

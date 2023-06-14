import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import DatePickerModal from "./modals/DatePickerModal";
const TrendsPage = () => {
  const { data: allModules } = useGetAllModules();

  const [moduleId, setModuleId] = useState<string>("");
  const { data, isLoading, getAllTrends, isError } = useGetAllTrends(moduleId);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [dateRangeValues, setDateRangeValues] = useState<Object>({
    startDate: "",
    endDate: "",
    key: "selection",
  });
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
          <Box>
            <Typography></Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => setToggleDatePicker(true)}
            >
              Select Date Range
            </Button>
          </Box>
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
              <Box sx={{ height: "60vh", width: "100%" }}>
                {val?.chartType === "LineGradient" ? (
                  <LineGradient
                    minValue={val?.min}
                    maxValue={val?.yMax}
                    dataPointsY1={val?.dataPointsY1}
                    avgValue={val?.avg}
                    trendsName={val?.trendsName}
                    datapoints={val?.datapoints}
                    labels={val?.labels}
                    isGradientOpposite={val?.isGradientOpposite}
                  />
                ) : (
                  <BarChart datapoints={val?.datapoints} labels={val?.labels} />
                )}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                {val?.chartType === "LineGradient" && (
                  <Typography
                    component="span"
                    textAlign={"left"}
                    alignItems="center"
                    display={"flex"}
                  >
                    <CircleIcon color="primary" />
                    {val?.trendsName}
                  </Typography>
                )}
                {val?.min && (
                  <Typography
                    component="span"
                    textAlign={"left"}
                    alignItems="center"
                    display={"flex"}
                  >
                    Min. {val.min}
                  </Typography>
                )}
                {val?.max && (
                  <Typography
                    component="span"
                    textAlign={"left"}
                    alignItems="center"
                    display={"flex"}
                  >
                    Max. {val.max}
                  </Typography>
                )}
                {val?.avg && (
                  <Typography
                    component="span"
                    textAlign={"left"}
                    alignItems="center"
                    display={"flex"}
                  >
                    Avg. {val?.avg}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <DatePickerModal
        open={toggleDatePicker}
        onClose={() => setToggleDatePicker(false)}
        dateRangeValues={dateRangeValues}
        setDateRangeValues={setDateRangeValues}
      ></DatePickerModal>
    </Box>
  );
};
export default TrendsPage;

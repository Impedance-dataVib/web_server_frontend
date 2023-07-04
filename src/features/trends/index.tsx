import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import LineGradientTrends from "src/features/common/graph/line-gradient-trends";
import { useGetAllTrends, useGetAllModules } from "../hooks";
import FullScreenLoader from "../../app/components/fullscreen-loader";
import DatePickerModal from "./modals/DatePickerModal";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SpeedIcon from "@mui/icons-material/Speed";
import dateFormat from "../../app/utils/dateFormat";
import RPMRangeModal from "./modals/RPMRangeModal";
import IndicatorsModal from "./modals/Indicators";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import HelpIcon from "@mui/icons-material/Help";
const TrendsPage = () => {
  const [options, setOption] = useState([]);
  const [value, setValue] = React.useState<string[]>([]);
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  const { data: allModules } = useGetAllModules();
  const [dateRangeValues, setDateRangeValues] = useState<any>({
    endDate: new Date(),
    startDate: new Date(),
    key: "selection",
  });
  const [moduleId, setModuleId] = useState<string>("");
  const [rpmRange, setRPMRange] = useState<any>({ rpm_min: 0, rpm_max: 0 });
  const [openRpmModal, setOpenRpmModal] = useState(false);
  const [toggleDatePicker, setToggleDatePicker] = useState(false);
  const [moduleType, setModuleType] = useState("");
  const [openIndicatorsModal, setIndicatorsModal] = useState(false);
  const { data, isLoading, getAllTrends, errorMessage, isError, setIsError } =
    useGetAllTrends(moduleId, dateRangeValues, rpmRange, allModules);

  const assetHandler = (e: any) => {
    setModuleId(e.target.value);
  };

  const calculatedButtonDate = useMemo(() => {
    if (dateRangeValues?.startDate && dateRangeValues?.endDate) {
      return `${dateFormat(dateRangeValues?.startDate)}-${dateFormat(
        dateRangeValues?.endDate
      )}`;
    }
    return "StartDate-EndDate";
  }, [dateRangeValues]);

  const calculateButtonRPM = useMemo(() => {
    const min = rpmRange.rpm_min > 0 ? `${rpmRange.rpm_min}RPM` : "Min RPM";
    const max = rpmRange.rpm_max > 0 ? `${rpmRange.rpm_max}RPM` : "Max RPM";
    return `${min}-${max}`;
  }, [rpmRange]);

  useEffect(() => {
    if (allModules.length > 0 && allModules) {
      setModuleId(allModules[0].id);
    }
  }, [allModules]);

  useEffect(() => {
    if (moduleId && moduleId !== "") {
      getAllTrends(moduleId, dateRangeValues, rpmRange, allModules);
    }
  }, [moduleId, dateRangeValues, rpmRange, allModules]);

  useEffect(() => {
    const moduleType = allModules.find((val: any) => val?.id === moduleId);
    setModuleType(moduleType?.module_type || "");
  }, [moduleId]);

  useEffect(() => {
    if (data?.dataSet && data?.dataSet.length > 0) {
      const titles = data?.dataSet.map((val: any) => val?.title);
      setOption(titles);
      setValue([titles[0]]);
    }
  }, [data]);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flex: 1, flexDirection: "row" }}>
          <Typography
            variant="h5"
            padding={2}
            sx={{ fontWeight: 600, fontSize: "24px" }}
          >
            Trends
          </Typography>
          <Box sx={{ marginTop: "10px" }}>
            <Tooltip
              title={
                <div>
                  To apply the RPM filter, Please note that the RPM range has to
                  be inserted before selecting any indicator.
                </div>
              }
            >
              <IconButton>
                <HelpIcon></HelpIcon>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Grid
          sx={{
            display: "flex",
            p: 2,
            justifyContent: "flex-end",
            marginRight: 1,
          }}
          container
          spacing={1}
        >
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setToggleDatePicker(true)}
              sx={{
                height: "3.32rem",
              }}
              startIcon={<DateRangeIcon />}
            >
              {calculatedButtonDate}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setOpenRpmModal(true)}
              sx={{
                height: "3.32rem",
              }}
              startIcon={<SpeedIcon />}
            >
              {calculateButtonRPM}
            </Button>
          </Grid>
          <Grid item>
            <FormControl sx={{ py: 0 }}>
              <Select
                value={moduleId}
                sx={{
                  height: "3.32rem",
                  color: "#1D4580",
                  minWidth: "15rem",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(29, 69, 128, 0.5)",
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
                size="medium"
              >
                {allModules?.map(({ id, from_data }: any) => (
                  <MenuItem value={id} key={`allModules_${id}`}>
                    <Typography variant="body2" color="#1D4580">
                      {JSON.parse(from_data).asset_name} -{" "}
                      {JSON.parse(from_data).equipment_name}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIndicatorsModal(true)}
              sx={{
                height: "3.32rem",
              }}
              startIcon={<DragIndicatorIcon />}
            >
              Add Indicators +{value?.length || 0}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginRight: 3 }}
      ></Box>
      {isError && errorMessage && (
        <Box sx={{ my: 1 }}>
          <Alert
            sx={{ display: "flex" }}
            severity="error"
            onClose={() => {
              setIsError(false);
            }}
          >
            <AlertTitle>{errorMessage}</AlertTitle>
            <Typography variant="caption" component={"span"}>
              {errorMessage}
            </Typography>
          </Alert>
        </Box>
      )}
      <Box m={2} sx={{ bgcolor: "white" }}>
        {isLoading && <FullScreenLoader></FullScreenLoader>}
        <Grid container spacing={3} justifyContent="center">
          {data?.dataSet && data?.dataSet.length > 0 && (
            <LineGradientTrends
              dataPoints={data?.dataSet}
              labels={data?.labels}
              maxRpm={data?.maxRpm}
              yLabel={moduleType !== "Torque" ? "Percentage (%)" : "Power"}
              selectedValue={value}
            />
          )}
        </Grid>
      </Box>
      <DatePickerModal
        open={toggleDatePicker}
        onClose={() => setToggleDatePicker(false)}
        dateRangeValues={dateRangeValues}
        setDateRangeValues={setDateRangeValues}
      ></DatePickerModal>
      <RPMRangeModal
        open={openRpmModal}
        onClose={() => setOpenRpmModal(false)}
        rpmRange={rpmRange}
        setRPMRange={setRPMRange}
      ></RPMRangeModal>
      <IndicatorsModal
        open={openIndicatorsModal}
        onClose={() => setIndicatorsModal(false)}
        indicators={value}
        setIndicators={setValue}
        options={options}
      ></IndicatorsModal>
    </Box>
  );
};
export default TrendsPage;

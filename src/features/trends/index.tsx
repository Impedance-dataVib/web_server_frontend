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
import LineGradientTrends from "src/features/common/graph/line-gradient-trends";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

import { useGetAllTrends, useGetAllModules } from "../hooks";
import FullScreenLoader from "../../app/components/fullscreen-loader";
import DatePickerModal from "./modals/DatePickerModal";

const TrendsPage = () => {
  const [options, setOption] = useState([]);
  const [value, setValue] = React.useState<string[]>([]);
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  const endDate = new Date();
  const { data: allModules } = useGetAllModules();
  const [dateRangeValues, setDateRangeValues] = useState<any>({
    endDate: new Date(),
    startDate: new Date(),
    key: "selection",
  });
  console.log(dateRangeValues);

  const [moduleId, setModuleId] = useState<string>("");
  const { data, isLoading, getAllTrends, isError } = useGetAllTrends(
    moduleId,
    dateRangeValues,
    allModules
  );
  const [toggleDatePicker, setToggleDatePicker] = useState(false);

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
          <Box sx={{ ml: 2 }}>
            <Autocomplete
              multiple
              disableClearable
              value={value}
              onChange={(event, newValue) => {
                setValue((val: any) => {
                  return [...newValue];
                });
              }}
              options={options}
              getOptionLabel={(option: string) => option}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option: string, index: number) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    disabled={index === 0}
                  />
                ))
              }
              sx={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Indicators"
                  placeholder="Indicators"
                />
              )}
            />
          </Box>
          <FormControl sx={{ py: 0, width: "110px", ml: 2 }}>
            <Select
              value={moduleId}
              sx={{
                height: "3.0rem",
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
              size="medium"
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginRight: 3 }}>
        <Box sx={{ ml: 2, display: "flex", flexDirection: "row" }}>
          <Typography component={"div"} sx={{ p: 1, fontSize: "16px" }}>
            <span>
              Start Date:
              {dateRangeValues?.startDate.toISOString().split("T")[0]}
            </span>
          </Typography>
          <Typography component={"div"} sx={{ p: 1, fontSize: "16px" }}>
            <span>
              End Date: {dateRangeValues?.endDate.toISOString().split("T")[0]}
            </span>
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setToggleDatePicker(true)}
            sx={{
              height: "3.0rem",
            }}
          >
            Select Date Range
          </Button>
        </Box>
      </Box>

      <Box m={2} sx={{ bgcolor: "white" }}>
        {isLoading && <FullScreenLoader></FullScreenLoader>}
        <Grid container spacing={3} justifyContent="center">
          {data?.dataSet && data?.dataSet.length > 0 && (
            <LineGradientTrends
              dataPoints={data?.dataSet}
              labels={data?.labels}
              maxRpm={data?.maxRpm}
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
    </Box>
  );
};
export default TrendsPage;

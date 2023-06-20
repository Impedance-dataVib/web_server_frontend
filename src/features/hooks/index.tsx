import React, { useEffect, useState } from "react";
import { getAllTrendsData, getModules } from "../../app/services";
import { buildTrendData, convertDate } from "src/app/utils/helper";

export const useGetAllTrends = (
  id: string,
  dateRangeValues: any,
  allModules: any
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isError, setIsError] = useState(false);

  const getAllTrends = async (id: string) => {
    try {
      // const payload  = {
      //   "start_date":"2023-05-26 02:59:33",
      //   "end_date":"2023-06-26 02:59:33",
      //   "module_id": 15
      // };
      const payload = {
        start_date: convertDate(dateRangeValues?.startDate), //"2023-05-26 02:59:33",
        end_date: convertDate(dateRangeValues?.endDate),
        module_id: id,
      };
      const moduleType = allModules.find((val: any) => val?.id === id);
      setIsLoading(true);
      const result = await getAllTrendsData(payload);
      setData(buildTrendData(result.data.data, moduleType?.module_type));
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id && id !== "") {
      getAllTrends(id);
    }
  }, [id.length, dateRangeValues.endDate]);
  return { isLoading, data, isError, getAllTrends };
};

export const useGetAllModules = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isError, setIsError] = useState(false);
  const getAllModules = async () => {
    try {
      setIsLoading(true);
      const { data } = await getModules();

      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllModules();
  }, []);
  return { isLoading, data, isError, getAllModules };
};

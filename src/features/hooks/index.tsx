import { useEffect, useState } from "react";
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
  const [errorMessage,  setErrorMessage] = useState('');

  const getAllTrends = async (id: string) => {
    try {
      const payload = {
        start_date: convertDate(dateRangeValues?.startDate),
        end_date: convertDate(dateRangeValues?.endDate),
        module_id: id,
      };
      const moduleType = allModules.find((val: any) => val?.id === id);
      setIsLoading(true);
      const result = await getAllTrendsData(payload);
      setData(buildTrendData(result.data.data, moduleType?.module_type));
      setIsLoading(false);
    } catch (e:any) {
      
      setErrorMessage(e?.Message);
      setIsError(true);
      setData([]);
      setIsLoading(false);
      console.error(e);
    }
  };

  useEffect(() => {
    if (id && id !== "") {
      getAllTrends(id);
    }
  }, [id.length, dateRangeValues.endDate]);
  return { isLoading, data, isError, getAllTrends, errorMessage, setIsError };
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

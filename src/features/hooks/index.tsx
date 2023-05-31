import React, { useEffect, useState } from "react";
import { getAllTrendsService, getModules } from "../../app/services";
import { buildData } from "src/app/utils/helper";
export const useGetAllTrends = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isError, setIsError] = useState(false);

  const getAllTrends = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await getAllTrendsService(id);

      setData(buildData(result.data).trends);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id && id !== "") {
      getAllTrends(id);
    }
  }, [id.length]);
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
